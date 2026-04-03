import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const returnData = (location.state as any)?.returnData as {
    result: TranslationResult;
    formData: { fullName: string; role: string; responsibilities: string };
  } | undefined;

  const [result, setResult] = useState<TranslationResult | null>(returnData?.result ?? null);
  const [isLoading, setIsLoading] = useState(false);
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
    <div className="min-h-screen bg-[#121212]">
      <HeroSection />
      <MilitaryForm
        onResult={(data, form) => {
          setResult(data);
          setFormData(form);
        }}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        initialData={formData}
      />
      {result && formData && (
        <div ref={resultsRef}>
          <ResultsSection result={result} formData={formData} />
        </div>
      )}
    </div>
  );
};

export default Index;
