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
        skills: ["Management", "Operational Excellence", "Leadership"],
        experience: ["הובלת מערכים לוגיסטיים", "ניהול כוח אדם מקצועי"]
      });
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 antialiased font-sans transition-colors duration-500">
      <HeroSection />
      
      <main className="max-w-4xl mx-auto px-6 -mt-20 relative z-30 pb-20">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}>
              <MilitaryForm onSubmit={handleTranslate} isLoading={isLoading} />
            </motion.div>
          ) : (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <ResultsSection result={result} formData={formData} />
              <button onClick={() => setResult(null)} className="mt-12 mx-auto block text-slate-500 hover:text-white font-mono text-[10px] uppercase tracking-[0.3em]">
                // REBOOT_SYSTEM
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 border-t border-slate-800/50 text-center bg-[#020617]">
         <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.5em]">
           VALOR-CORE / TECH-DRIVEN TRANSITION / 2026
         </p>
      </footer>
    </div>
  );
};

export default Index;
