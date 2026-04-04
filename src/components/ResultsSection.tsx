import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Download, TrendingUp, Cpu, Users } from "lucide-react";

interface ResultsSectionProps {
  result: {
    title: string;
    summary: string;
    skills: string[]; // נשתמש בזה ל-Core Competencies
    experience: {
      title: string;
      company: string;
      years: string;
      results: string[];
    }[];
  };
  formData: {
    fullName: string;
    role: string;
  };
}

// פונקציית עזר להמרת אייקון Competency באופן דינמי
const getCompetencyIcon = (index: number) => {
  switch (index % 3) {
    case 0: return <TrendingUp className="h-10 w-10 text-slate-500" />;
    case 1: return <Cpu className="h-10 w-10 text-slate-500" />;
    case 2: return <Users className="h-10 w-10 text-slate-500" />;
    default: return <TrendingUp className="h-10 w-10 text-slate-500" />;
  }
};

const ResultsSection = ({ result, formData }: ResultsSectionProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: contentRef,
    documentTitle: `CV_${formData.fullName}_${new Date().toLocaleDateString('he-IL')}`,
  });

  return (
    <div dir="rtl" className="max-w-5xl mx-auto p-4 text-right font-sans">
      {/* כפתור הורדה - נוח ללקוח */}
      <div className="flex justify-center mb-10 no-print">
        <button 
          onClick={() => handlePrint()}
          className="flex items-center gap-4 bg-[#141F32] text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-[#324564] transition-all shadow-lg"
        >
          <Download className="h-6 w-6" />
          שמור קורות חיים מעוצבים כ-PDF
        </button>
      </div>

      {/* דף קורות החיים המעוצב בדיוק כמו בתמונה */}
      <div className="bg-white shadow-2xl border border-slate-100 rounded-lg overflow-hidden relative">
        <div ref={contentRef} className="p-16 relative z-10 bg-white min-h-[1100px] text-right">
          
          {/* Header Section: כחול כהה, אותיות גדולות */}
          <header className="border-b-[3px] border-[#324564] pb-6 mb-10 text-center">
            <h1 className="text-5xl font-extrabold text-[#141F32] uppercase tracking-wider mb-2">{formData.fullName}</h1>
            <p className="text-xl text-slate-600 font-bold uppercase tracking-widest">{result.title}</p>
          </header>

          {/* Summary Section: רקע אפור בהיר */}
          <section className="mb-12">
            <div className="bg-[#F2F4F8] p-8 rounded-lg border border-slate-100">
              <p className="text-xl text-slate-800 leading-relaxed font-medium">
                {result.summary}
              </p>
            </div>
          </section>

          {/* Core Competencies: עיצוב איקונים דינמי */}
          <section className="mb-14">
            <h2 className="text-2xl font-bold text-[#141F32] uppercase tracking-widest mb-8 text-center">Core Competencies</h2>
            <div className="grid grid-cols-3 gap-6 text-center">
              {result.skills.slice(0, 3)?.map((skillGroup, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="mb-4">{getCompetencyIcon(i)}</div>
                  <h4 className="text-lg font-bold text-[#141F32] leading-snug">{skillGroup}</h4>
                </div>
              ))}
            </div>
          </section>

          {/* שתי עמודות לניסיון וחינוך */}
          <div className="grid grid-cols-3 gap-10">
            {/* עמודה רחבה (2/3): Professional Experience */}
            <div className="col-span-2 space-y-10">
              <h2 className="text-2xl font-bold text-[#141F32] uppercase tracking-widest mb-6 border-b border-slate-200 pb-2">Professional Experience</h2>
              {result.experience?.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-3">
                    <h3 className="text-xl font-bold text-slate-900">{exp.title}</h3>
                    <p className="text-sm font-bold text-slate-600 italic">{exp.company}, {exp.years}</p>
                  </div>
                  <div className="space-y-1.5">
                    {exp.results?.map((bullet, j) => (
                      <p key={j} className="text-base text-slate-800 leading-relaxed font-medium relative pr-4">• {bullet}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* עמודה צרה (1/3): Education, Certifications */}
            <div className="space-y-10 border-r border-slate-100 pr-10">
              {/* Education */}
              <div>
                <h2 className="text-2xl font-bold text-[#141F32] uppercase tracking-widest mb-6">Education</h2>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900">MBA, Operations Management</h3>
                  <p className="text-base font-medium text-slate-800">State University</p>
                  <h3 className="text-xl font-bold text-slate-900 mt-4">BS, Business Admin</h3>
                  <p className="text-base font-medium text-slate-800">Tech Institute</p>
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h2 className="text-2xl font-bold text-[#141F32] uppercase tracking-widest mb-6">Certifications</h2>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-900">PMP</h3>
                  <p className="text-base font-medium text-slate-800">Six Sigma Black Belt</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* הגדרות הדפסה */}
      <style>{`
        @media print {
          @page { size: auto; margin: 0mm; }
          .no-print { display: none !important; }
          .rounded-lg { border-radius: 0 !important; }
          .shadow-2xl { box-shadow: none !important; }
          .bg-[#F2F4F8] { background-color: #F2F4F8 !important; -webkit-print-color-adjust: exact; }
          body { background: white !important; -webkit-print-color-adjust: exact !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>
    </div>
  );
};

export default ResultsSection;