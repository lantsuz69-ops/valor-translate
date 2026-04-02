import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { TranslationResult } from "@/pages/Index";

interface MilitaryFormProps {
  onResult: (data: TranslationResult, formData: { fullName: string; role: string; responsibilities: string }) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const MilitaryForm = ({ onResult, isLoading, setIsLoading }: MilitaryFormProps) => {
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [responsibilities, setResponsibilities] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!role.trim() || !responsibilities.trim() || !fullName.trim()) {
      toast.error("נא למלא את כל השדות");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("translate-military", {
        body: { role, responsibilities },
      });

      if (error) {
        console.error("Function error:", error);
        toast.error("שגיאה בתרגום. נסה שנית.");
        return;
      }

      onResult(data as TranslationResult, { fullName, role, responsibilities });
      toast.success("התרגום הושלם בהצלחה!");
    } catch (err) {
      console.error("Error:", err);
      toast.error("שגיאה בלתי צפויה. נסה שנית.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="form" className="container mx-auto -mt-12 px-4 pb-16 relative z-10">
      <Card className="mx-auto max-w-2xl shadow-xl border-0">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground">הזן את הניסיון הצבאי שלך</CardTitle>
          <CardDescription className="text-muted-foreground">
            ספר לנו על התפקיד והאחריות שלך בשפה חופשית — הבינה המלאכותית תעשה את השאר
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-foreground">שם מלא</Label>
              <Input
                id="fullName"
                placeholder='למשל: ישראל ישראלי'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="text-right"
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-foreground">תפקיד צבאי</Label>
              <Input
                id="role"
                placeholder='למשל: מ"פ בחטיבה מרחבית, קצין תכנון בחיל האוויר'
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="text-right"
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsibilities" className="text-foreground">תחומי אחריות ומשימות</Label>
              <Textarea
                id="responsibilities"
                placeholder="תאר את מה שעשית: ניהלתי צוות של 30 חיילים, תכננתי לוחות זמנים לפעילויות, הכנתי תדריכים, טיפלתי בבעיות לוגיסטיות..."
                value={responsibilities}
                onChange={(e) => setResponsibilities(e.target.value)}
                className="min-h-[150px] text-right"
                dir="rtl"
              />
            </div>

            <Button
              type="submit"
              className="w-full gap-2"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  מתרגם...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  תרגם לשפה מקצועית
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default MilitaryForm;
