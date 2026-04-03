import { motion } from "framer-motion";
import { CheckCircle2, Target, Download } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
  
  const handleDownloadPDF = async () => {
    const element = document.getElementById("cv-card");
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff"
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`קורות_חיים_${formData.fullName}.pdf`);
  };

  return (
    <div dir="rtl" className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-right">
      
      {/* Sidebar - ללא הריבוע הלבן */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem] backdrop-blur-xl">
          <h2 className="text-2xl font-black text-white mb-2">{formData.fullName}</h2>
          <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">{formData.role}</p>
          
          <button 
            onClick={handleDownloadPDF}
            className="w-full mt-8 flex items-center justify-center gap-3 bg-white text-black h-14 rounded-xl font-bold hover:bg-slate-100 transition-all shadow-lg"
          >
            <Download className="h-5 w-5" />
            הורד קובץ PDF
          </button>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem]">
          <h3 className="text-white font-bold mb-6 flex items-center gap-2">
            <Target className="h-4 w-4 text-slate-400" />
            מיומנויות וכישורים
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

      {/* Main Content - עברית מלאה */}
      <div className="lg:col-span-8">
        <div 
          id="cv-card" 
          className="bg-white p-12 md:p-16 rounded-[2.5rem] shadow-2xl border border-slate-100"
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
              "{result.summary}"
            </p>
          </div>

          <div className="space-y-10">
            <h3 className="text-slate-400 font-mono text-[10px] uppercase tracking-[0.2em]">ניסיון מקצועי ויכולות ליבה</h3>
            {result.experience.map((exp, i) => (
              <div key={i} className="flex gap-8 items-start group">
                <div className="mt-1 h-8 w-8 rounded-xl bg-slate-900 flex items-center justify-center shrink-0 text-white font-mono text-xs font-bold">
                  0{i + 1}
                </div>
                <p className="text-lg md:text-xl text-slate-700 font-semibold leading-relaxed">
                  {exp}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-20 pt-10 border-t border-slate-100 flex items-center justify-between">
             <div className="flex items-center gap-3 text-emerald-600 font-bold text-sm">
                <CheckCircle2 className="h-6 w-6" />
                <span>Skill-Bridge / מערכת ניתוח יכולות 2026</span>
             </div>
             <p className="text-slate-300 font-mono text-[9px] uppercase tracking-tighter">מזהה מערכת: SB-ALPHA-V1</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;
