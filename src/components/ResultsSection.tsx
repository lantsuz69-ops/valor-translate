import { motion } from "framer-motion";
import { CheckCircle2, Briefcase, Target, Award } from "lucide-react";

const ResultsSection = ({ result, formData }: any) => {
  return (
    <div dir="rtl" className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-right">
      {/* Sidebar - Personal Info */}
      <div className="lg:col-span-4 space-y-6">
        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem] backdrop-blur-xl">
          <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <Award className="h-8 w-8 text-black" />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">{formData.fullName}</h2>
          <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">{formData.role}</p>
          
          <div className="mt-8 space-y-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <p className="text-[10px] text-slate-500 uppercase font-mono mb-1">Top Capability</p>
                <p className="text-sm font-bold text-slate-200">Leadership & Command</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2rem]">
          <h3 className="text-white font-bold mb-6 flex items-center gap-2">
            <Target className="h-4 w-4 text-slate-400" />
            מיומנויות ליבה
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.skills.map((skill: string) => (
              <span key={skill} className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs font-bold border border-slate-700">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content - Professional Profile */}
      <div className="lg:col-span-8 space-y-8">
        <div className="bg-white p-10 md:p-14 rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
          <div className="flex justify-between items-start mb-10 border-b border-slate-100 pb-8">
            <div>
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-2">Target Role</span>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">{result.title}</h1>
            </div>
            <div className="hidden md:block bg-slate-100 px-4 py-2 rounded-full text-[10px] font-mono font-bold text-slate-500 uppercase tracking-tighter">
                Verified Skills Audit
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-slate-400 font-mono text-[10px] uppercase tracking-[0.2em] mb-4">Executive Summary</h3>
            <p className="text-xl md:text-2xl text-slate-800 font-medium leading-relaxed italic">
              "{result.summary}"
            </p>
          </div>

          <div className="space-y-8">
            <h3 className="text-slate-400 font-mono text-[10px] uppercase tracking-[0.2em]">Professional Experience</h3>
            {result.experience.map((exp: string, i: number) => (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="flex gap-6 items-start group"
              >
                <div className="mt-1 h-6 w-6 rounded-full bg-slate-900 flex items-center justify-center shrink-0 text-white font-mono text-[10px] font-bold">
                  0{i + 1}
                </div>
                <p className="text-lg text-slate-700 font-semibold leading-snug group-hover:text-black transition-colors">
                  {exp}
                </p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 pt-8 border-t border-slate-100 flex items-center justify-between">
             <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                <CheckCircle2 className="h-5 w-5" />
                מוכן להגשה למעסיקים
             </div>
             <p className="text-slate-300 font-mono text-[9px]">DOC_ID: SB-2026-X82</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;
