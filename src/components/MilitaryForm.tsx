import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SubmitButton from "./SubmitButton";

const MilitaryForm = ({ onSubmit, isLoading }: any) => {
  const [formData, setFormData] = useState({ fullName: "", role: "", responsibilities: "" });

  return (
    <Card className="bg-white border-none shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12),0_30px_60px_-30px_rgba(0,0,0,0.15)] rounded-3xl overflow-hidden">
      <CardHeader className="space-y-1 pb-10 text-right bg-gray-50/50 border-b border-gray-100">
        <CardTitle className="text-3xl font-black tracking-tight text-black uppercase italic">דו"ח ניסיון שדה</CardTitle>
        <CardDescription className="text-gray-400 font-bold">יש למלא את כלל השדות בכדי להתחיל</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3 text-right">
            <Label className="text-[10px] font-mono uppercase text-gray-400 tracking-[0.2em]">שם מלא</Label>
            <Input 
                className="bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/5 text-black h-14 rounded-xl" 
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            />
          </div>
          <div className="space-y-3 text-right">
            <Label className="text-[10px] font-mono uppercase text-gray-400 tracking-[0.2em]">תפקיד / דרגה</Label>
            <Input 
                className="bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/5 text-black h-14 rounded-xl" 
                onChange={(e) => setFormData({...formData, role: e.target.value})}
            />
          </div>
        </div>
        <div className="space-y-3 text-right">
          <Label className="text-[10px] font-mono uppercase text-gray-400 tracking-[0.2em]">פירוט עשייה ואחריות</Label>
          <Textarea 
            className="bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-black/5 text-black min-h-[180px] rounded-xl resize-none" 
            onChange={(e) => setFormData({...formData, responsibilities: e.target.value})}
          />
        </div>
        <div className="flex justify-center pt-4">
          <SubmitButton onClick={() => onSubmit(formData)} isLoading={isLoading} />
        </div>
      </CardContent>
    </Card>
  );
};
