import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Download, ShieldCheck, Star, Trophy } from "lucide-react";

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

// מילות מפתח לצביעה אוטומטית (Highlighter)
const keyPhrases = [
  "ניהול", "הובלת צוותים", "תכנון אסטרטגי", "אופטימיזציה", "מבצעיים", "משברים",
  "תקציבים", "לוחות זמנים", "כוח אדם", "ייזום", "מערכים מורכבים"
];

const HighlightText = ({ text }: { text: string }) => {
  if (!text) return null;
  const regex = new RegExp(`(${keyPhrases.join('|')})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) => 
        keyPhrases.some(phrase => phrase === part) ? (
          <span key={index} className="text-emerald-600 font-bold bg-emerald-50 px-1 rounded print:text-emerald-700">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
};

const ResultsSection = ({ result, formData }: ResultsSectionProps) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `CV_${formData.fullName}`,
  });

  return (
    <>
      {/* הגדרות הדפסה קריטיות - מוודא שהצבעים וה-Watermark יעברו ל-PDF */}
      <style>{`
        @media print {
          @page { margin: 15mm; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          #cv-card-print { box-shadow: none !important; border: none !important; width: 100% !important; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div dir="rtl" className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-right">
        
        {/* Sidebar - לא מודפס */}
        <div className="lg:col-span-4 space-y-6 no-print">
          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem] backdrop-blur-xl">
            <h2 className="text-2xl font-black text-white mb-2">{formData.fullName}</h2>
            <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">{formData.role}</p>
            
            <button 
              onClick={handlePrint}
              className="w-full mt-8 flex items-center justify-center gap-3 bg-white text-black h-14 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-lg"
            >
              <Download className="h-5 w-5" />
              הורד קובץ PDF מושלם
            </button>
          </div>
        </div>

        {/* Main Content - החלק שייכנס ל-PDF */}
        <div className="lg:col-span-8 relative">
          
          {/* 💧 ה-WATERMARK הדיגיטלי - מופיע גם ב-PDF */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none z-0 overflow-hidden print:opacity-[0.02]">
            <span className="font-black text-[15vw] text-slate-900 leading-none whitespace-nowrap tracking-tighter rotate-[-12deg]">
              SKILL BRIDGE / AI
            </span>
          </div>

          <div 
            ref={componentRef}
            id="cv-card-print" 
            className="bg-white p-12 md:p-16 rounded-[2.5rem] shadow-2xl border border-slate-100 relative z-10"
          >
            <div className="flex justify-between items-start mb-12 border-b border-slate-100 pb-10">
              <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2 font-mono">הגדרת תפקיד יעד</span>
                  <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">{result.title}</h1>
                  <p className="text-xl text-slate-500 font-bold mt-2">{formData.fullName}</p>
              </div>
            </div>

            <div className="mb-14">
              <h3 className="text-slate-400 font-mono text-[10px] uppercase tracking-[0.2em] mb-6">תמצית מקצועית</h3>
              <p className="text-xl md:text-2xl text-slate-800 font-medium leading-relaxed italic pr-4 border-r-4 border-slate-900">
                "<HighlightText text={result.summary} />"
              </p>
            </div>

            <div className="space-y-10">
              <h3 className="text-slate-400 font-mono text-[10px] uppercase tracking-[0.2em]">ניסיון מקצועי ויכולות ליבה</h3>
              {result.experience.map((exp, i) => (
                <div key={i} className="flex gap-8 items-start group">
                  <div className="mt-1 h-8 w-8 rounded-xl bg-slate-900 flex items-center justify-center shrink-0 text-white font-mono text-xs font-bold print:bg-black">
                    0{i + 1}
                  </div>
                  <p className="text-lg md:text-xl text-slate-700 font-semibold leading-relaxed">
                    <HighlightText text={exp} />
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-20 pt-10 border-t border-slate-100 flex items-center justify-between">
               <div className="flex items-center gap-3 text-emerald-600 font-bold text-sm print:text-black">
                  <ShieldCheck className="h-6 w-6" />
                  <span>מאושר ע"י מערכת Skill-Bridge / גרסה 2026</span>
               </div>
               <p className="text-slate-300 font-mono text-[9px] uppercase tracking-tighter print:text-slate-400">
                 מזהה מערכת: SB-ALPHA-V1
               </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultsSection;
