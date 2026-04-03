import { useState, useEffect } from "react";
import { Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";

interface SlideToSubmitProps {
  onSubmit: () => void;
  isLoading: boolean;
}

const SlideToSubmit = ({ onSubmit, isLoading }: SlideToSubmitProps) => {
  const [value, setValue] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // החזרת הסליידר להתחלה אם הטעינה נכשלה או הסתיימה
  useEffect(() => {
    if (!isLoading && isComplete) {
      const timeout = setTimeout(() => {
        setIsComplete(false);
        setValue(0);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isLoading, isComplete]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLoading || isComplete) return;
    const val = parseInt(e.target.value);
    setValue(val);
    
    if (val >= 90) {
      setValue(100);
      setIsComplete(true);
      onSubmit();
      
      // בטיחות: אם תוך שנייה אין טעינה, תחזיר את הכפתור
      setTimeout(() => {
        if (!isLoading) {
          setIsComplete(false);
          setValue(0);
        }
      }, 1000);
    }
  };

  return (
    <div className="relative w-full max-w-[450px] h-24 flex items-center group">
      {/* Background Track */}
      <div className="absolute inset-0 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md overflow-hidden">
        {/* Progress Fill */}
        <div 
          className="absolute inset-y-0 right-0 bg-white/10 transition-all duration-150"
          style={{ width: `${value}%` }}
        />
        
        {/* Label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className={cn(
            "text-sm font-bold uppercase tracking-[0.2em] transition-opacity duration-300",
            value > 50 || isLoading ? "opacity-0" : "opacity-40 text-white"
          )}>
            {isLoading ? "" : "החלק לניתוח יכולות >>>"}
          </span>
        </div>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/60">
            <Loader2 className="h-6 w-6 animate-spin text-white" />
            <span className="text-sm font-bold tracking-widest text-white italic uppercase">Analysing...</span>
          </div>
        )}
      </div>

      {/* The Actual Slider Input */}
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        disabled={isLoading || isComplete}
        className={cn(
          "absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 disabled:cursor-not-allowed",
          "rtl-slider" // מבטיח כיווניות נכונה
        )}
      />

      {/* The Visual Thumb */}
      {!isLoading && (
        <div 
          className="absolute top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-75 z-10"
          style={{ right: `calc(${value}% - ${value > 90 ? '60px' : '0px'})`, marginRight: '8px' }}
        >
          <div className="h-16 w-16 bg-white rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            <Send className="h-6 w-6 text-black" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SlideToSubmit;
