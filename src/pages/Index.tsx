import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import MilitaryForm from "@/components/MilitaryForm";
import ResultsSection from "@/components/ResultsSection";
import { toast } from "sonner";

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
    // בדיקת תקינות שדות
    if (!data.fullName || !data.role || !data.responsibilities) {
      toast.error("יש למלא את כלל השדות בכדי להתחיל");
      return;
    }

    setFormData(data);
    setIsLoading(true);
    
    // אופטימיזציית זמן טעינה: 600ms בלבד לחוויה מהירה וחדה
    setTimeout(() => {
      const mockResult: TranslationResult = {
        title: "Strategic Operations Manager",
        summary: "מומחה בניהול אופרטיבי מורכב, בעל יכולת הובלת צוותים תחת לחץ וקבלת החלטות מבוססת נתונים בזמן אמת.",
        skills: ["ניהול פרויקטים", "לוגיסטיקה מתקדמת", "מנהיגות", "ניתוח סיכונים", "בקרת איכות"],
        experience: [
          "הובלת מערכים לוגיסטיים בהיקף נרחב תוך עמידה ביעדים מבצעיים קשיחים.",
          "ניהול והכשרת כוח אדם מקצועי בסביבה דינמית ומשתנה.",
          "אופטימיזציה של תהליכי עבודה להפחתת זמני תגובה ושיפור יעילות המערכת."
        ]
      };
      setResult(mockResult);
      setIsLoading(false);
      window.scrollTo({ top: 600, behavior: 'smooth' });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black antialiased">
      <HeroSection />
      
      <main className="max-w-6xl mx-auto px-6 -mt-10 relative z-20">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <MilitaryForm onSubmit={handleTranslate} isLoading={isLoading} />
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <ResultsSection result={result} formData={formData} />
              <div className="flex justify-center mt-12">
                <button 
                  onClick={() => setResult(null)}
                  className="text-white/40 hover:text-white text-xs font-mono uppercase tracking-widest border-b border-white/10 pb-1 transition-all"
                >
                  ניתוח משימה חדשה // Reset
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-40 py-10 border-t border-white/5 text-center">
        <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em]">
          Lyra Strategic Systems © 2026 / Secure Deployment
        </p>
      </footer>
    </div>
  );
};

export default Index;
