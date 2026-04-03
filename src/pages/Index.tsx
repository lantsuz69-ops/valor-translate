import { useState, useEffect, useRef } from "react";
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
  const [result, setResult] = useState<TranslationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<{ fullName: string; role: string; responsibilities: string } | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <MilitaryForm
        onResult={(data, form) => {
          setResult(data);
          setFormData(form);
        }}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      {result && formData && (
        <ResultsSection result={result} formData={formData} />
      )}
    </div>
  );
};

export default Index;
