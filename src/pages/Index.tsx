import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import MilitaryForm from "@/components/MilitaryForm";
import ResultsSection from "@/components/ResultsSection";

export interface TranslationResult {
  title: string;
  summary: string;
  skills: string[];
  experience: string[];
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState({ fullName: "", role: "", responsibilities: "" });

  const handleTranslate = (data: any) => {
    setFormData(data);
    setIsLoading(true);
    
    // סימולציה של ניתוח ה-AI
    setTimeout(() => {
      setResult({
        title: "מנהל אופרציה ופרויקטים אסטרטגיים",
        summary: "מומחה בניהול מערכים מורכבים, בעל יכולת מוכחת בהובלת צוותים רב-תחומיים ותהליכים לוגיסטיים תחת תנאי אי-ודאות. מומחיות באופטימיזציה של משאבים והשגת יעדים מבצעיים בסביבה דינמית.",
        skills: ["ניהול פרויקטים", "תכנון אסטרטגי", "מצוינות תפעולית", "ניהול משברים", "הובלת צוותים"],
        experience: [
          "הובלת מערכים מורכבים תוך ניהול תקציבים ולוחות זמנים קשיחים.",
          "ייזום והטמעת תהליכי עבודה מתקדמים לשיפור אפקטיביות המערך.",
          "פיקוד וניהול ישיר של כוח אדם מקצועי והכשרתם למשימות קצה."
        ]
      });
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 antialiased font-sans">
      <HeroSection />
      
      <main className="max-w-5xl mx-auto px-6 -mt-20 relative z-30 pb-20">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div 
              key="form" 
              className="max-w-4xl mx-auto" 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <MilitaryForm onSubmit={handleTranslate} isLoading={isLoading} />
            </motion.div>
          ) : (
            <motion.div 
              key="results" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
            >
              <ResultsSection result={result} formData={formData} />
              
              {/* כפתור איפוס מעודכן לעברית */}
              <button 
                onClick={() => setResult(null)} 
                className="mt-12 mx-auto block text-slate-500 hover:text-white font-mono text-[8px] uppercase tracking-[0.3em] transition-colors"
              >
                // לחץ כאן ליצירת קורות חיים חדש \\
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 border-t border-slate-800/50 text-center bg-[#020617]">
         <p className="text-[8px] font-mono text-slate-500 uppercase tracking-[0.5em]">
           Skill-Bridge / AI POWERED SYSTEM
         </p>
      </footer>
    </div>
  );
};

export default Index;
