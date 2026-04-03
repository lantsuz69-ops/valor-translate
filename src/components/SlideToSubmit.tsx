import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Send, Loader2, ChevronLeft } from "lucide-react";

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
  
  // באזור ה-RTL גרירה שמאלה היא ערך שלילי
  const opacity = useTransform(x, [0, -100], [1, 0]);

  // מנגנון ריסט אוטומטי
  useEffect(() => {
    if (!isLoading && isComplete) {
      setIsComplete(false);
      animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
    }
  }, [isLoading, isComplete, x]);

  const handleDragEnd = (_: any, info: any) => {
    // אם המשתמש גרר מספיק שמאלה (RTL)
    if (info.offset.x < -150) {
      setIsComplete(true);
      onSubmit();
      
      // הגנה למקרה שהשדות ריקים והטעינה לא התחילה
      setTimeout(() => {
        // בודקים אם הסטטוס עדיין לא בטעינה אחרי חצי שנייה
        if (!isLoading) {
          setIsComplete(false);
          animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
        }
      }, 500);
    } else {
      // אם לא גרר מספיק - קפוץ חזרה
      animate(x, 0, { type: "spring", stiffness: 500, damping: 30 });
    }
  };

  return (
    <div className="relative h-16 w-full max-w-[350px] rounded-full bg-[#1A1A1A] border border-white/10 p-2 overflow-hidden flex items-center shadow-inner">
      
      {/* טקסט רקע */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="flex items-center gap-2 text-white/30 font-medium">
          <ChevronLeft className="h-4 w-4 animate-pulse" />
          <span className="text-sm tracking-wide">{label}</span>
        </div>
      </motion.div>

      {/* העיגול הנגרר */}
      {!isLoading && !isComplete && (
        <motion.div
          drag="x"
          dragConstraints={{ left: -245, right: 0 }}
          dragElastic={0.05}
          style={{ x }}
          onDragEnd={handleDragEnd}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="z-10 h-12 w-12 rounded-full bg-white text-black flex items-center justify-center cursor-grab active:cursor-grabbing shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          <Send className="h-5 w-5" />
        </motion.div>
      )}

      {/* מצב טעינה/עיבוד */}
      {(isLoading || isComplete) && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full flex justify-center items-center gap-3 text-white"
        >
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-bold tracking-widest uppercase italic">מעבד נתונים...</span>
        </motion.div>
      )}

      {/* אפקט מילוי ויזואלי */}
      <motion.div 
        style={{ width: useTransform(x, [0, -245], ["0%", "100%"]) }}
        className="absolute right-0 top-0 bottom-0 bg-white/5 pointer-events-none"
      />
    </div>
  );
};

export default SlideToSubmit;
