import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import MilitaryForm from "@/components/MilitaryForm";
import ResultsSection from "@/components/ResultsSection";
import { toast } from "sonner";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [formData, setFormData] = useState({ fullName: "", role: "", responsibilities: "" });

  const handleTranslate = (data: any) => {
    if (!data.fullName || !data.role || !data.responsibilities) {
      toast.error("יש למלא את כלל השדות בכדי להתחיל");
      // חשוב: אנחנו לא עוברים ל-isLoading אם חסר מידע
      return;
    }

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
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black text-white antialiased">
      <HeroSection />
      <main className="max-w-4xl mx-auto px-6 -mt-16 relative z-30 pb-20">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div key="form-container" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0, y: -20}}>
              <MilitaryForm onSubmit={handleTranslate} isLoading={isLoading} />
            </motion.div>
          ) : (
            <motion.div key="results-container" initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}>
              <ResultsSection result={result} formData={formData} />
              <button onClick={() => setResult(null)} className="mt-10 mx-auto block text-white/20 hover:text-white font-mono text-[10px]">
                // REBOOT_SYSTEM
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <footer className="py-12 border-t border-white/5 text-center bg-black">
         <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.5em]">
           VALOR-CORE / TECH-DRIVEN TRANSITION / 2026
         </p>
      </footer>
    </div>
  );
};

export default Index;
