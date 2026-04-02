import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { role, responsibilities } = await req.json();

    if (!role || !responsibilities) {
      return new Response(
        JSON.stringify({ error: "role and responsibilities are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert career consultant specializing in translating military experience into professional Project Management language. 
You MUST respond ONLY in Hebrew.
Given a military role and responsibilities in Hebrew, produce a JSON object with:
- "title": A professional PM job title in Hebrew
- "summary": A 2-3 sentence professional summary in Hebrew  
- "skills": An array of 6-8 professional skills in Hebrew (e.g., ניהול פרויקטים, ניהול סיכונים, תקשורת בין-ארגונית)
- "experience": An array of 4-6 bullet points describing professional experience in Hebrew, using PM terminology

Translate military jargon into corporate/PM language. For example:
- "ניהלתי חיילים" → "ניהול צוותים רב-תחומיים"
- "תכנון פעילות" → "תכנון אסטרטגי וניהול לוחות זמנים"
- "תדריך" → "הובלת ישיבות סטטוס והצגת דוחות ביצוע"

Return ONLY valid JSON, no markdown, no extra text.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: `תפקיד צבאי: ${role}\n\nתחומי אחריות ומשימות: ${responsibilities}`,
            },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "translate_military_experience",
                description: "Translate military experience to professional PM language in Hebrew",
                parameters: {
                  type: "object",
                  properties: {
                    title: { type: "string", description: "Professional PM job title in Hebrew" },
                    summary: { type: "string", description: "Professional summary in Hebrew" },
                    skills: {
                      type: "array",
                      items: { type: "string" },
                      description: "Professional skills in Hebrew",
                    },
                    experience: {
                      type: "array",
                      items: { type: "string" },
                      description: "Professional experience bullet points in Hebrew",
                    },
                  },
                  required: ["title", "summary", "skills", "experience"],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: {
            type: "function",
            function: { name: "translate_military_experience" },
          },
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "יותר מדי בקשות, נסה שנית בעוד רגע" }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "נגמרו הקרדיטים, יש להוסיף קרדיטים" }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI Gateway error:", response.status, text);
      throw new Error("AI gateway error");
    }

    const aiResponse = await response.json();
    const toolCall = aiResponse.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall?.function?.arguments) {
      throw new Error("No tool call response from AI");
    }

    const result = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("translate-military error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
