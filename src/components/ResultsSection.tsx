import { Download, ShieldCheck, Star } from "lucide-react";

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

const ResultsSection = ({ result, formData }: ResultsSectionProps) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div dir="rtl" className="max-w-4xl mx-auto p-6 text-right font-sans">
      {/* כפתור הורדה */}
      <div className="flex justify-center mb-8 no-print">
        <button 
          onClick={() => handlePrint()}
          className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg"
        >
          <Download className="h-5 w-5" />
          הורד קורות חיים (PDF)
        </button>
      </div>

      {/* דף קורות החיים */}
      <div className="bg-white shadow-xl border border-slate-200 rounded-2xl overflow-hidden relative">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <span className="text-9xl font-black rotate-[-20deg]">SKILL BRIDGE</span>
        </div>

        <div ref={contentRef} className="p-12 relative z-10 bg-white min-h-[1000px]">
          <header className="border-b-4 border-slate-900 pb-6 mb-8">
            <h1 className="text-4xl font-black text-slate-900">{formData.fullName}</h1>
            <p className="text-xl text-emerald-600 font-bold">{result.title}</p>
          </header>

          <section className="mb-10">
            <h3 className="text-lg font-bold text-slate-400 mb-2 uppercase tracking-wider">תקציר מקצועי</h3>
            <p className="text-lg text-slate-800 leading-relaxed">{result.summary}</p>
          </section>

          <section className="mb-10">
            <h3 className="text-lg font-bold text-slate-400 mb-4 uppercase tracking-wider">ניסיון ומטלות מרכזיות</h3>
            <div className="space-y-4">
              {result.experience.map((exp, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="mt-1.5"><Star className="h-4 w-4 text-emerald-500" /></div>
                  <p className="text-slate-700">{exp}</p>
                </div>
              ))}
            </div>
          </section>

          <footer className="mt-auto pt-10 border-t border-slate-100 flex justify-between items-center opacity-50 text-sm">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span>Verified AI Resume</span>
            </div>
            <span>2026 © SkillBridge</span>
          </footer>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .shadow-xl { shadow: none !important; border: none !important; }
        }
      `}</style>
    </div>
  );
};

export default ResultsSection;