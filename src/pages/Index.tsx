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
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [formData, setFormData] = useState({ fullName: "", role: "", responsibilities: "" });

  const handleTranslate = (data: { fullName: string; role: string; responsibilities: string }) => {
    setFormData(data);
    setIsLoading(true);
    
    // אופטימיזציה: 600ms של עיבוד נתונים
    setTimeout(() => {
      const mockResult: TranslationResult = {
        title: "Operations & Project Lead",
        summary: "מומחה בניהול אופרטיבי מורכב, בעל יכולת הובלת צוותים תחת לחץ וקבלת החלטות מבוססת נתונים בזמן אמת.",
        skills: ["ניהול פרויקטים", "לוגיסטיקה", "מנהיגות", "ניתוח סיכונים", "בקרת איכות"],
        experience: [
          "הובלת מערכים לוגיסטיים בהיקף נרחב תוך עמידה ביעדים מבצעיים.",
          "ניהול והכשרת כוח אדם מקצועי בסביבה דינמית.",
          "אופטימיזציה של תהליכי עבודה לשיפור יעילות המערכת."
        ]
      };
      setResult(mockResult);
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-black text-white antialiased overflow-x-hidden">
      <HeroSection />
      
      <main className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div key="form" exit={{ opacity: 0, y: -20 }}>
              <MilitaryForm onSubmit={handleTranslate} isLoading={isLoading} />
            </motion.div>
          ) : (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <ResultsSection result={result} formData={formData} />
              <button 
                onClick={() => setResult(null)}
                className="mt-12 block mx-auto text-white/20 hover:text-white font-mono text-[10px] uppercase tracking-widest transition-colors"
              >
                // RESET_SYSTEM_FOR_NEW_TASK
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-40 py-10 border-t border-white/5 text-center">
        <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em]">
           VALOR-CORE / UNIT 8200 INSPIRED / {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};

export default Index;
