import { Button } from "@/components/ui/button";
import { generateResumePDF } from "@/lib/generatePdf";
import { Download, Printer } from "lucide-react";

// הגדרת ה-Props כדי ש-TypeScript לא יצעק על 'data'
interface ResultsSectionProps {
  data: {
    fullName: string;
    title: string;
    summary: string;
    skills: string[];
    experience: string[];
  };
}

export const ResultsSection = ({ data }: ResultsSectionProps) => {
  // אם אין נתונים, לא מציגים כלום (מונע שגיאות map)
  if (!data) return null;

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">הקורות חיים שלך מוכנים</h2>
        <div className="flex gap-3">
          {/* כפתור ה-PDF החדש שקורא לפונקציית ה-Screenshot שלנו */}
          <Button 
            onClick={() => generateResumePDF("resume-preview", data.fullName || "Resume")}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90"
          >
            <Download className="w-4 h-4" />
            שמור כ-PDF
          </Button>
        </div>
      </div>

      {/* ה-ID הקריטי כאן! כל מה שבתוך ה-div הזה יצולם ל-PDF בדיוק כפי שהוא נראה */}
      <div 
        id="resume-preview" 
        className="bg-white shadow-xl rounded-xl overflow-hidden border border-slate-200 p-8 md:p-12 text-right"
        style={{ direction: 'rtl' }}
      >
        {/* כותרת ופרטים אישיים */}
        <header className="border-b-2 border-primary/20 pb-6 mb-8">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-2">{data.fullName}</h1>
          <p className="text-xl text-primary font-medium">{data.title}</p>
        </header>

        {/* תקציר מקצועי */}
        <section className="mb-8">
          <h3 className="text-lg font-bold text-slate-800 mb-3 border-r-4 border-primary pr-3">תקציר מקצועי</h3>
          <p className="text-slate-600 leading-relaxed">{data.summary}</p>
        </section>

        {/* כישורים */}
        <section className="mb-8">
          <h3 className="text-lg font-bold text-slate-800 mb-4 border-r-4 border-primary pr-3">כישורים ומיומנויות</h3>
          <div className="flex flex-wrap gap-2">
            {data.skills?.map((skill, index) => (
              <span 
                key={index}
                className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium border border-slate-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* ניסיון תעסוקתי */}
        <section>
          <h3 className="text-lg font-bold text-slate-800 mb-4 border-r-4 border-primary pr-3">ניסיון מקצועי</h3>
          <div className="space-y-4">
            {data.experience?.map((item, index) => (
              <div key={index} className="flex gap-3">
                <div className="mt-2 w-2 h-2 rounded-full bg-primary shrink-0" />
                <p className="text-slate-600 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-12 pt-6 border-t border-slate-100 text-center text-slate-400 text-xs">
          נבנה באמצעות Skill-Bridge | {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
};