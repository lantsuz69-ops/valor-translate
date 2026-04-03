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

export default Index;
