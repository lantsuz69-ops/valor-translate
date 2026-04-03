import { motion } from "framer-motion";
import { TranslationResult } from "@/pages/Index";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Award, Briefcase, User } from "lucide-react";

interface ResultsSectionProps {
  result: TranslationResult;
  formData: { fullName: string; role: string; responsibilities: string };
}

const ResultsSection = ({ result, formData }: ResultsSectionProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-20"
    >
      {/* כותרת התוצאה */}
      <div className="flex items-center gap-4 border-r-4 border-white pr-6 py-2">
        <div>
          <h2 className="text-sm font-mono uppercase tracking-[0.3em] text-white/40">Analysis Complete</h2>
          <h3 className="text-3xl font-bold text-white uppercase italic">{result.title}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* עמודה שמאלית - פרטים וכישורים */}
        <div className="md:col-span-1 space-y-6">
          <Card className="bg-[#141414] border-white/5 shadow-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-mono text-white/50 flex items-center gap-2 uppercase tracking-widest">
                <User size={14} /> Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white font-bold text-xl">
              {formData.fullName}
            </CardContent>
          </Card>

          <Card className="bg-[#141414] border-white/5 shadow-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-mono text-white/50 flex items-center gap-2 uppercase tracking-widest">
                <Award size={14} /> Key Competencies
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {result.skills.map((skill, index) => (
                <Badge key={index} className="bg-white/10 hover:bg-white/20 text-white border-0 py-1 px-3 rounded-sm font-medium">
                  {skill}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* עמודה ימנית - ניסיון ותקציר */}
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-[#141414] border-white/5 shadow-2xl overflow-hidden relative">
             <div className="absolute top-0 left-0 w-1 h-full bg-white/20" />
            <CardHeader>
              <CardTitle className="text-xs font-mono text-white/50 flex items-center gap-2 uppercase tracking-widest">
                <FileText size={14} /> Professional Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 leading-relaxed text-lg italic">
              "{result.summary}"
            </CardContent>
          </Card>

          <Card className="bg-[#141414] border-white/5 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-xs font-mono text-white/50 flex items-center gap-2 uppercase tracking-widest">
                <Briefcase size={14} /> Transferable Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {result.experience.map((item, index) => (
                <div key={index} className="flex gap-4 group">
                  <span className="text-white/20 font-mono text-sm mt-1">0{index + 1}</span>
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-300 pb-4 border-b border-white/5 w-full">
                    {item}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultsSection;
