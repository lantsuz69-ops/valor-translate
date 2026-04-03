import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import MilitaryForm from "@/components/MilitaryForm";
import ResultsSection from "@/components/ResultsSection";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState({ fullName: "", role: "", responsibilities: "" });

  const handleTranslate = (data: any) => {
    setFormData(data);
    setIsLoading(true);
    setTimeout(() => {
      setResult({
        title: "Operations & Strategic Project Manager",
        summary: "מומחה בניהול אופרטיבי רחב היקף, בעל יכולת מוכחת בהובלת פרויקטים טכנולוגיים ולוגיסטיים תחת תנאי אי-ודאות. מומחיות באופטימיזציה של תהליכים וניהול הון אנושי להשגת יעדים אסטרטגיים.",
        skills: ["Project Management", "Strategic Planning", "Operational Excellence", "Resource Allocation", "Crisis Management", "Stakeholder Relations"],
        experience: [
          "הובלת מערכים מורכבים תוך ניהול תקציבים ולוחות זמנים קשיחים בסביבה דינמית.",
          "ייזום והטמעת תהליכי עבודה מתקדמים לשיפור אפקטיביות המערך ב-30%.",
          "פיקוד וניהול ישיר של צוותים רב-תחומיים והכשרתם למשימות קצה."
        ]
      });
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 antialiased font-sans">
      <HeroSection />
      
      {/* הרחבנו את ה-Container ל-5xl עבור התוצאות */}
      <main className="max-w-5xl mx-auto px-6 -mt-20 relative z-30 pb-20">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div key="form" className="max-w-4xl mx-auto" exit={{ opacity: 0, y: -20 }}>
              <MilitaryForm onSubmit={handleTranslate} isLoading={isLoading} />
            </motion.div>
          ) : (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <ResultsSection result={result} formData={formData} />
              <button onClick={() => setResult(null)} className="mt-12 mx-auto block text-slate-500 hover:text-white font-mono text-[8px] uppercase tracking-[0.3em]">
               \\ לחץ כאן כדי ליצור מחדש //
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 border-t border-slate-800/50 text-center bg-[#020617]">
         {/* פונט מוקטן ב-25% וטקסט מעודכן */}
         <p className="text-[7.5px] md:text-[8px] font-mono text-slate-500 uppercase tracking-[0.5em]">
           Skill-Bridge / AI POWERED SYSTEM
         </p>
      </footer>
    </div>
  );
};
{/* Footer של המסמך - הגדלנו נוכחות כדי שייקלט בצילום ה-PDF */}
<div className="mt-20 pt-10 border-t-2 border-slate-100 flex items-center justify-between">
   <div className="flex items-center gap-3 text-emerald-600">
      <CheckCircle2 className="h-6 w-6" />
      <span className="font-bold text-sm">Skill-Bridge / מערכת ניתוח יכולות 2026</span>
   </div>
   
   {/* הוספתי כאן Class של 'block' וצבע כהה יותר כדי שהקנבס יזהה את הטקסט בוודאות */}
   <div className="text-right">
     <p className="text-slate-900 font-mono text-[10px] font-bold uppercase tracking-wider block">
       מזהה מערכת: SB-ALPHA-V1
     </p>
   </div>
</div>
export default Index;
