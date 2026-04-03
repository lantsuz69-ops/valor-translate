import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
// וודא שהקובץ SubmitButton.tsx נמצא באותה תיקייה בדיוק
import SubmitButton from "./SubmitButton"; 

interface MilitaryFormProps {
  onSubmit: (data: { fullName: string; role: string; responsibilities: string }) => void;
  isLoading: boolean;
}

const MilitaryForm = ({ onSubmit, isLoading }: MilitaryFormProps) => {
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");
  const [responsibilities, setResponsibilities] = useState("");

  const handleSubmit = () => {
    onSubmit({ fullName, role, responsibilities });
  };

  return (
    <Card className="bg-white border-none shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08),0_20px_40px_-20px_rgba(0,0,0,0.1)] rounded-[2rem] overflow-hidden">
      <CardHeader className="space-y-1 pb-10 text-right bg-slate-50/50 border-b border-slate-100 px-10 pt-10">
        <CardTitle className="text-3xl font-black tracking-tight text-slate-900 uppercase italic">
          דו"ח ניסיון שדה
        </CardTitle>
        <CardDescription className="text-slate-400 font-bold text-base mt-2">
          יש למלא את כלל השדות בכדי להתחיל
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-8 p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3 text-right">
            <Label className="text-[10px] font-mono uppercase text-slate-400 tracking-[0.2em] pr-1">שם מלא</Label>
            <Input 
                placeholder="ישראל ישראלי"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-slate-50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-slate-100 text-slate-900 h-14 rounded-2xl transition-all placeholder:text-slate-300" 
            />
          </div>
          <div className="space-y-3 text-right">
            <Label className="text-[10px] font-mono uppercase text-slate-400 tracking-[0.2em] pr-1">תפקיד / דרגה</Label>
            <Input 
                placeholder="מפקד צוות"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-slate-50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-slate-100 text-slate-900 h-14 rounded-2xl transition-all placeholder:text-slate-300" 
            />
          </div>
        </div>
        <div className="space-y-3 text-right">
          <Label className="text-[10px] font-mono uppercase text-slate-400 tracking-[0.2em] pr-1">פירוט עשייה ואחריות</Label>
          <Textarea 
            placeholder="תאר את הפעילות שלך בשפה חופשית..."
            value={responsibilities}
            onChange={(e) => setResponsibilities(e.target.value)}
            className="bg-slate-50 border-slate-200 focus:bg-white focus:ring-4 focus:ring-slate-100 text-slate-900 min-h-[180px] rounded-2xl resize-none transition-all placeholder:text-slate-300 p-4 leading-relaxed" 
          />
        </div>
        <div className="flex justify-center pt-4 max-w-sm mx-auto">
          <SubmitButton onClick={handleSubmit} isLoading={isLoading} />
        </div>
      </CardContent>
    </Card>
  );
};

export default MilitaryForm;
