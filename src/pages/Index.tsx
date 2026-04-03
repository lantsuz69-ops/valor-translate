import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import HeroSection from "@/components/HeroSection";
import MilitaryForm from "@/components/MilitaryForm";
import ResultsSection from "@/components/ResultsSection";
import { motion, AnimatePresence } from "framer-motion";

export interface TranslationResult {
  title: string;
  summary: string;
  skills: string[];
  experience: string[];
}

const Index = () => {
  const location = useLocation();
  const returnData = (location.state as any)?.returnData as {
    result: TranslationResult;
    formData: { fullName: string; role: string; responsibilities: string };
  } | undefined;

  const [result, setResult] = useState<TranslationResult | null>(returnData?.result ?? null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false); // מצב סליידר פעיל
  const [formData, setFormData] = useState<{ fullName: string; role: string; responsibilities: string } | null>(
    returnData?.formData ?? null
  );
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (result && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* מסך טעינה אימפקט - סעיף 4 */}
      <AnimatePresence>
        {(isLoading || isTranslating) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md"
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-16 h-16 border-4 border-white/10 border-t-white rounded-full mb-8"
            />
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold tracking-tight text-center"
            >
              ניסיון שדה = ניסיון באזרחות
            </motion.h2>
            <p className="mt-2 text-gray-500">מנתח יכולות מבצעיות...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <HeroSection />
      
      <div className="max-w-4xl mx-auto px-4 pb-20">
        <MilitaryForm
          onResult={(data, form) => {
            // השהיה קלה לאימפקט פסיכולוגי
            setTimeout(() => {
              setResult(data);
              setFormData(form);
              setIsLoading(false);
              setIsTranslating(false);
            }, 1500);
          }}
          isLoading={isLoading}
          setIsLoading={(val) => {
            setIsLoading(val);
            if(val) setIsTranslating(true);
          }}
          initialData={formData}
        />
        
        {result && formData && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            ref={resultsRef}
            className="mt-12"
          >
            <ResultsSection result={result} formData={formData} />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
