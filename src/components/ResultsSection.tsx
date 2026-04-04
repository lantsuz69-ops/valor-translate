import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
<<<<<<< Updated upstream
import { Download, ShieldCheck, Star, Trophy } from "lucide-react";
=======
import { Download, ShieldCheck, Star, Trophy, FileText } from "lucide-react";
>>>>>>> Stashed changes

interface ResultsSectionProps {
  result: {
    title: string;
    summary: string;
    skills: string[];
    experience: string[];
  };
  formData: {
    fullName: string;
    role: string;
  };
}

const keyPhrases = ["ניהול", "אסטרטגי", "אופטימיזציה", "הובלת", "ייזום", "מערכים", "ביצועים", "פיתוח", "חדשנות"];

const HighlightText = ({ text }: { text: string }) => {
  if (!text) return null;
  const regex = new RegExp(`(${keyPhrases.join('|')})`, 'gi');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) => 
        keyPhrases.includes(part) ? 
        <span key={i} className="text-emerald-700 font-bold bg-emerald-50/50 px-1 rounded border-b-2 border-emerald-200">{part}</span> : part
      )}
    </span>
  );
};

const ResultsSection = ({ result, formData }: ResultsSectionProps) => {
  // שימוש ב-contentRef עבור גרסה 3.0+
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: `CV_${formData.fullName}_SkillBridge`,
  });

  return (
    <div dir="rtl" className="max-w-5xl mx-auto p-4 font-sans text-right">
      
      {/* כפתור הורדה - מוסתר בהדפסה */}
      <div className="flex justify-center mb-10 no-print">
        <button 
          onClick={() => handlePrint()} 
          className="flex items-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-emerald-600 transition-all shadow-xl hover:-translate-y-1"
        >
          <Download className="h-6 w-6" />
          הורד קורות חיים מעוצבים (PDF)
        </button>
      </div>

      {/* אזור ה-PDF */}
      <div className="relative bg-white shadow-2xl border border-slate-100 rounded-[2.5rem] overflow-hidden">
        
        {/* Watermark (סימן מים) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0 select-none">
          <span className="text-[15vw] font-black rotate-[-20deg] text-slate-900">
            SKILL BRIDGE
          </span>
        </div>

        {/* התוכן שיוצא להדפסה */}
        <div ref={contentRef} className="p-12 md:p-20 relative z-10 bg-white min-h-[1120px] flex flex-col w-full text-right">
          
          <header className="border-b-8 border-slate-900 pb-10 mb-12 flex justify-between items-end">
            <div className="text-right w-full">
              <h1 className="text-6xl font-black text-slate-900 mb-3 tracking-tight">{formData.fullName}</h1>
              <p className="text-2xl text-emerald-600 font-bold uppercase tracking-widest">{result.title}</p>
            </div>
          </header>

          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 bg-slate-200"></div>
              <h3 className="text-slate-400 font-black text-sm uppercase tracking-[0.2em]">Summary</h3>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>
            <p className="text-2xl text-slate-800 leading-[1.6] font-medium text-justify">
              <HighlightText text={result.summary} />
            </p>
          </section>

          <section className="flex-grow">
            <h3 className="text-slate-400 font-black text-sm uppercase tracking-[0.2em] mb-10 flex items-center gap-4">
              <Star className="h-4 w-4 fill-slate-400" />
              Key Experience & Achievements
            </h3>
            <div className="space-y-10">
              {result.experience.map((exp, i) => (
                <div key={i} className="relative pr-12">
                  <div className="absolute right-0 top-1 text-slate-200 font-black text-4xl select-none">
                    0{i + 1}
                  </div>
                  <p className="text-xl text-slate-700 leading-relaxed border-r-2 border-slate-100 pr-6">
                    <HighlightText text={exp} />
                  </p>
                </div>
              ))}
            </div>
          </section>

          <footer className="mt-20 pt-8 border-t border-slate-100 flex justify-between items-center opacity-40">
             <div className="flex items-center gap-2 text-slate-900 font-bold italic">
                <ShieldCheck className="h-5 w-5" />
                <span>Verified by Skill-Bridge AI</span>
             </div>
             <span className="font-mono text-[10px] tracking-widest uppercase text-left">System Auth: PRO-2026</span>
          </footer>

        </div>
      </div>

      <style>{`
        @media print {
          @page { size: auto; margin: 0mm; }
          body { background: white !important; }
          .no-print { display: none !important; }
          .rounded-[2.5rem] { border-radius: 0 !important; border: none !important; }
          .shadow-2xl { box-shadow: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; text-align: right !important; }
        }
      `}</style>
    </div>
  );
};

export default ResultsSection;