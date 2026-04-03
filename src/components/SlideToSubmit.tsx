import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Send, Loader2, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface SlideToSubmitProps {
  onSubmit: () => void;
  isLoading: boolean;
  label?: string;
}

const SlideToSubmit = ({
  onSubmit,
  isLoading,
  label = "החלק לניתוח הניסיון",
}: SlideToSubmitProps) => {
  const [isComplete, setIsComplete] = useState(false);
  const x = useMotionValue(0);
  
  // באזור ה-RTL שלנו, אנחנו גוררים ימינה לשמאל (מספרים שליליים ב-framer)
  // אנחנו מודדים את התקדמות הגרירה מ-0 עד -240 פיקסלים בערך
  const opacity = useTransform(x, [0, -150], [1, 0]);
  const colorTransform = useTransform(x, [0, -200], ["#ffffff", "#22c55e"]);

  const handleDragEnd = (_: any, info: any) => {
    // אם הגרירה עברה את ה-200 פיקסלים לכיוון שמאל (RTL)
    if (info.offset.x < -180) {
      setIsComplete(true);
      onSubmit();
    }
  };

  return (
    <div className="relative h-16 w-full max-w-[350px] rounded-full bg-[#1A1A1A] border border-white/10 p-2 overflow-hidden flex items-center shadow-inner">
      
      {/* טקסט רקע שנעלם בגרירה */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="flex items-center gap-2 text-white/40 font-medium">
          <ChevronLeft className="h-4 w-4 animate-pulse" />
          <span className="text-sm tracking-wide">{label}</span>
        </div>
      </motion.div>

      {/* העיגול הנגרר (The Thumb) */}
      {!isLoading && !isComplete && (
        <motion.div
          drag="x"
          dragConstraints={{ left: -245, right: 0 }}
          dragElastic={0.1}
          dragSnapToOrigin={false}
          style={{ x }}
          onDragEnd={handleDragEnd}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="z-10 h-12 w-12 rounded-full bg-white text-black flex items-center justify-center cursor-grab active:cursor-grabbing shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        >
          <Send className="h-5 w-5" />
        </motion.div>
      )}

      {/* מצב טעינה */}
      {(isLoading || isComplete) && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full flex justify-center items-center gap-3 text-white"
        >
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-bold tracking-widest uppercase italic">מנתח יכולות...</span>
        </motion.div>
      )}

      {/* אפקט מילוי בזמן גרירה */}
      <motion.div 
        style={{ width: useTransform(x, [0, -245], ["0%", "100%"]) }}
        className="absolute right-0 top-0 bottom-0 bg-white/5 pointer-events-none"
      />
    </div>
  );
};

export default SlideToSubmit;
