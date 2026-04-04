import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Download, ShieldCheck, Star, Briefcase, Award } from "lucide-react";

interface ResultsSectionProps {
  result: { title: string; summary: string; skills: string[]; experience: string[]; };
  formData: { fullName: string; role: string; };
}

const ResultsSection = ({ result, formData }: ResultsSectionProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // הגדרה נכונה לגרסה 3.0.2 של react-to-print
  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: `CV_${formData.fullName}_SkillBridge`,
  });

  return (
    <div dir="rtl" className="max-w-5xl mx-auto p-4 text-right font-sans">
      {/* כפתור הורדה */}
      <div className="flex justify-center mb-12 no-print">
        <button 
          onClick={() => handlePrint()}
          className="flex items-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-emerald-600 transition-all shadow-2xl"
        >
          <Download className="h-6 w-6" />
          שמור קורות חיים כ-PDF
        </button>
      </div>

      {/* דף קורות החיים */}
      <div className="bg-white shadow-2xl border border-slate-100 rounded-[2.5rem] overflow-hidden relative">
        
        {/* Watermark עדין */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
          <span className="text-[12vw] font-black rotate-[-25deg] text-slate-900">SKILL BRIDGE AI</span>
        </div>

        <div ref={contentRef} className="p-12 md:p-20 relative z-10 bg-white min-h-[1100px] flex flex-col">
          
          <header className="border-b-8 border-slate-900 pb-10 mb-12">
            <h1 className="text-6xl font-black text-slate-900 mb-2">{formData.fullName}</h1>
            <p className="text-2xl text-emerald-600 font-bold uppercase tracking-widest">{result.title}</p>
          </header>

          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6 text-slate-400">
              <Briefcase className="h-5 w-5" />
              <h3 className="text-sm font-black uppercase tracking-widest">תקציר מקצועי</h3>
            </div>
            <p className="text-2xl text-slate-800 leading-[1.6] font-medium text-justify">
              {result.summary}
            </p>
          </section>

          <section className="flex-grow space-y-12">
            <div className="flex items-center gap-3 mb-4 text-slate-400">
              <Star className="h-5 w-5" />
              <h3 className="text-sm font-black uppercase tracking-widest">ניסיון והישגים</h3>
            </div>
            {result.experience.map((exp, i) => (
              <div key={i} className="relative pr-16 group">
                <div className="absolute right-0 top-0 text-slate-100 font-black text-6xl">0{i+1}</div>
                <div className="relative z-10 pt-4">
                  <p className="text-xl text-slate-700 leading-relaxed font-medium">{exp}</p>
                </div>
              </div>
            ))}
          </section>

          <footer className="mt-20 pt-10 border-t border-slate-100 flex justify-between items-center opacity-30">
            <div className="flex items-center gap-3 font-bold text-slate-900">
              <ShieldCheck className="h-6 w-6" />
              <span>CERTIFIED BY SKILL-BRIDGE</span>
            </div>
            <div className="text-[10px] font-mono">2026 © PRO-BUILD</div>
          </footer>
        </div>
      </div>

      <style>{`
        @media print {
          @page { size: A4; margin: 0mm; }
          .no-print { display: none !important; }
          .rounded-[2.5rem] { border-radius: 0 !important; }
          .shadow-2xl { box-shadow: none !important; }
          body { background: white !important; -webkit-print-color-adjust: exact !important; }
          * { text-align: right !important; }
        }
      `}</style>
    </div>
  );
};

export default ResultsSection;