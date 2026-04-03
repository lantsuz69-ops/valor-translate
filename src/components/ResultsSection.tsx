import { motion } from "framer-motion";
import { CheckCircle2, Award, Target, Download } from "lucide-react";

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
  
  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <>
      {/* הזרקת סטייל להדפסה נקייה ללא תאריך ושעה */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { margin: 0; }
          body { 
            padding: 2cm; 
            background: white !important; 
            -webkit-print-color-adjust: exact;
          }
          .no-print { display: none !important; }
        }
      `}} />

      <div dir="rtl" className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-right print:block">
        
        {/* Sidebar - נעלם בהדפסה */}
        <div className="lg:col-span-4 space-y-6 print:hidden">
          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem] backdrop-blur-xl">
            <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Award className="h-8 w-8 text-black" />
            </div>
            <h2 className="text-2xl font-black text-white mb-2">{formData.fullName}</h2>
            <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">{formData.role}</p>
            
            <button 
              onClick={handleDownloadPDF}
              className="w-full mt-8 flex items-center justify-center gap-3 bg-white text-black h-14 rounded-xl font-bold hover:bg-slate-200 transition-all shadow-lg"
            >
              <Download className="h-5 w-5" />
              ייצא לקובץ PDF מוכן
            </button>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem]">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <Target className="h-4 w-4 text-slate-400" />
              מיומנויות ליבה
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.skills.map((skill) => (
                <span key={skill} className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs font-bold border border-slate-700">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content - החלק שיודפס */}
        <div className="lg:col-span-8 print:w-full">
          <div className="bg-white p-10 md:p-14 rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] print:shadow-none print:p-0">
            <div className="flex justify-between items-start mb-10 border-b border-slate-100 pb-8">
              <div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-2 print:text-slate-500">Target Role</span>
                  <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">{result.title}</h1>
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-slate-400 font-mono text-[10px] uppercase tracking-[0.2em] mb-4 print:text-slate-500">Executive Summary</h3>
              <p className="text-xl md:text-2xl text-slate-800 font-medium leading-relaxed italic">
                "{result.summary}"
              </p>
            </div>

            <div className="space-y-8">
              <h3 className="text-slate-400 font-mono text-[10px] uppercase tracking-[0.2em] print:text-slate-500">Professional Experience</h3>
              {result.experience.map((exp, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="mt-1 h-6 w-6 rounded-full bg-slate-900 flex items-center justify-center shrink-0 text-white font-mono text-[10px] font-bold print:bg-black">
                    0{i + 1}
                  </div>
                  <p className="text-lg text-slate-700 font-semibold leading-snug">
                    {exp}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-between print:mt-10">
               <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm print:text-black">
                  <CheckCircle2 className="h-5 w-5" />
                  Skill-Bridge Certified Profile
               </div>
               <p className="text-slate-300 font-mono text-[9px] print:text-slate-400 uppercase">System ID: SB-2026</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultsSection;
