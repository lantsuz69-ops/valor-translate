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
        title: "Strategic Operations Lead",
        summary: "מומחה בניהול אופרטיבי מורכב משלב השטח ועד לשלב האסטרטגי.",
        skills: ["ניהול פרויקטים", "לוגיסטיקה", "מנהיגות"],
        experience: ["ניהול מערכים לוגיסטיים", "הכשרת כוח אדם"]
      });
      setIsLoading(false);
    }, 600);
  };

  return (
    // שינוי הרקע ללבן/אפור בהיר מאוד
    <div className="min-h-screen bg-[#F3F4F6] text-[#111827] antialiased">
      <HeroSection />
      
      <main className="max-w-4xl mx-auto px-6 -mt-20 relative z-30 pb-20">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div key="form" exit={{ opacity: 0, y: -20 }}>
              <MilitaryForm onSubmit={handleTranslate} isLoading={isLoading} />
            </motion.div>
          ) : (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <ResultsSection result={result} formData={formData} />
              <button onClick={() => setResult(null)} className="mt-10 mx-auto block text-gray-400 hover:text-black font-mono text-[10px] uppercase tracking-widest">
                // REBOOT_SYSTEM
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 border-t border-gray-200 text-center bg-white">
         <p className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.5em]">
           VALOR-CORE / TECH-DRIVEN TRANSITION / 2026
         </p>
      </footer>
    </div>
  );
};

export default Index;
