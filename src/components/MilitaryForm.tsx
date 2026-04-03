import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SlideToSubmit from "./SlideToSubmit";

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
    <Card className="bg-[#111111] border-white/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] backdrop-blur-xl">
      <CardHeader className="space-y-1 pb-8">
        <CardTitle className="text-2xl font-bold tracking-tight text-white uppercase italic">דו"ח ניסיון שדה</CardTitle>
        <CardDescription className="text-gray-500 font-medium">
          יש למלא את כלל השדות בכדי להתחיל
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 text-right">
            <Label htmlFor="name" className="text-xs font-mono uppercase text-white/50 tracking-widest">שם מלא</Label>
            <Input
              id="name"
              placeholder="ישראל ישראלי"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-black/50 border-white/10 focus:border-white/40 text-white h-12 transition-all"
            />
          </div>
          <div className="space-y-2 text-right">
            <Label htmlFor="role" className="text-xs font-mono uppercase text-white/50 tracking-widest">תפקיד / דרגה</Label>
            <Input
              id="role"
              placeholder="מפקד צוות / קצין מבצעים"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-black/50 border-white/10 focus:border-white/40 text-white h-12 transition-all"
            />
          </div>
        </div>
        <div className="space-y-2 text-right">
          <Label htmlFor="desc" className="text-xs font-mono uppercase text-white/50 tracking-widest">פירוט עשייה ואחריות</Label>
          <Textarea
            id="desc"
            placeholder="תאר את הפעילות שלך בשפה חופשית..."
            value={responsibilities}
            onChange={(e) => setResponsibilities(e.target.value)}
            className="bg-black/50 border-white/10 focus:border-white/40 text-white min-h-[150px] resize-none transition-all"
          />
        </div>
        
        <div className="flex justify-center pt-6">
          <SlideToSubmit onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </CardContent>
    </Card>
  );
};

export default MilitaryForm;
