import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SubmitButton from "./SubmitButton";

const MilitaryForm = ({ onSubmit, isLoading }: any) => {
  const [formData, setFormData] = useState({ fullName: "", role: "", responsibilities: "" });

  return (
    <Card dir="rtl" className="bg-[#0F172A] border border-slate-800 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] rounded-[2rem] overflow-hidden text-right">
      <CardHeader className="space-y-1 pb-10 bg-slate-900/50 border-b border-slate-800 px-10 pt-10">
        <CardTitle className="text-3xl font-black tracking-tight text-white uppercase italic">דו"ח ניסיון שדה</CardTitle>
        <CardDescription className="text-slate-500 font-bold">יש למלא את כלל השדות בכדי להתחיל</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-8 p-10 bg-[#0F172A]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Label className="text-[10px] font-mono uppercase text-slate-500 tracking-[0.2em]">שם מלא</Label>
            <Input 
                placeholder="ישראל ישראלי"
                className="bg-[#1E293B] border-slate-700 text-white h-14 rounded-2xl focus:ring-slate-500" 
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>
          <div className="space-y-3">
            <Label className="text-[10px] font-mono uppercase text-slate-500 tracking-[0.2em]">תפקיד / דרגה</Label>
            <Input 
                placeholder="מפקד חטיבה 7 \ מפקד צוות"
                className="bg-[#1E293B] border-slate-700 text-white h-14 rounded-2xl focus:ring-slate-500" 
                onChange={(e) => setFormData({...formData, role: e.target.value})}
            />
          </div>
        </div>
        <div className="space-y-3">
          <Label className="text-[10px] font-mono uppercase text-slate-500 tracking-[0.2em]">פירוט עשייה ואחריות</Label>
          <Textarea 
            placeholder="תאר את הפעילות שלך בשפה חופשית..."
            className="bg-[#1E293B] border-slate-700 text-white min-h-[180px] rounded-2xl resize-none p-4" 
            onChange={(e) => setFormData({...formData, responsibilities: e.target.value})}
          />
        </div>
        <div className="flex justify-center pt-4 max-w-sm mx-auto">
          <SubmitButton onClick={() => onSubmit(formData)} isLoading={isLoading} />
        </div>
      </CardContent>
    </Card>
  );
};

export default MilitaryForm;
