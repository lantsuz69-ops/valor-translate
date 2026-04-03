import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import SlideToSubmit from "@/components/SlideToSubmit";
import { toast } from "sonner";
import type { TranslationResult } from "@/pages/Index";

interface MilitaryFormProps {
  onResult: (data: TranslationResult, formData: { fullName: string; role: string; responsibilities: string }) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  initialData?: { fullName: string; role: string; responsibilities: string } | null;
}

const MilitaryForm = ({ onResult, isLoading, setIsLoading, initialData }: MilitaryFormProps) => {
  const [fullName, setFullName] = useState(initialData?.fullName ?? "");
  const [role, setRole] = useState(initialData?.role ?? "");
  const [responsibilities, setResponsibilities] = useState(initialData?.responsibilities ?? "");

  useEffect(() => {
    if (initialData) {
      setFullName(initialData.fullName);
      setRole(initialData.role);
      setResponsibilities(initialData.responsibilities);
    }
  }, [initialData]);

  const handleSubmit = async () => {
    if (!role.trim() || !responsibilities.trim() || !fullName.trim()) {
      toast.error("נא למלא את כל השדות כדי שנוכל להתחיל בניתוח");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("translate-military", {
        body: { role, responsibilities },
      });

      if (error) {
        console.error("Function error:", error);
        toast.error("זיהינו תקלה בתקשורת. נסה שוב.");
        return;
      }

      onResult(data as TranslationResult, { fullName, role, responsibilities });
      toast.success("הנתונים עובדו בהצלחה. הנה הניסיון האזרחי שלך.");
    } catch (err) {
      console.error("Error:", err);
      toast.error("שגיאה בלתי צפויה.");
    } finally {
      // אנחנו לא מכבים את ה-Loading כאן, כי ה-Index.tsx מנהל את מסך הטעינה הפסיכולוגי
    }
  };

  return (
    <section id="form" className="container mx-auto -mt-12 px-4 pb-16 relative z-10">
      <Card className="mx-auto max-w-2xl shadow-2xl border-0 bg-[#1A1A1A] text-white">
        <CardHeader className="text-right border-b border-white/5 mb-4">
          <CardTitle className="text-2xl font-bold tracking-tight">פירוט הניסיון המבצעי</CardTitle>
          <CardDescription className="text-gray-400">
            תאר את העשייה שלך בשפה חופשית. המערכת תזהה את הערך העסקי המסתתר מאחורי הפעילות.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-gray-300">שם מלא</Label>
              <Input
                id="fullName"
                placeholder='ישראל ישראלי'
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-[#222] border-white/10 text-white placeholder:text-gray-600 focus:border-white/20 transition-all"
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-gray-300">תפקיד אחרון בשירות</Label>
              <Input
                id="role"
                placeholder='למשל: סמ"פ, קצין לוגיסטיקה, מפקד צוות ביחידה טכנולוגית'
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-[#222] border-white/10 text-white placeholder:text-gray-600"
                dir="rtl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsibilities" className="text-gray-300">מה עשית בפועל? (ניסיון שדה)</Label>
              <Textarea
                id="responsibilities"
                placeholder="אל תחסוך בפרטים: ניהול כח אדם, תכנון מבצעי, אחריות על ציוד במיליוני שקלים, עבודה תחת לחץ, קבלת החלטות מהירות..."
                value={responsibilities}
                onChange={(e) => setResponsibilities(e.target.value)}
                className="min-h-[150px] bg-[#222] border-white/10 text-white placeholder:text-gray-600 leading-relaxed"
                dir="rtl"
              />
            </div>

            <div className="pt-4 flex justify-center">
               <SlideToSubmit onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
};

export default MilitaryForm;
