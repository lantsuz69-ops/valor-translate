import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Send, Loader2, ChevronLeft } from "lucide-react";

const SlideToSubmit = ({ onSubmit, isLoading }: { onSubmit: () => void; isLoading: boolean }) => {
  const [isComplete, setIsComplete] = useState(false);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [0, -100], [1, 0]);

  useEffect(() => {
    if (!isLoading && isComplete) {
      setIsComplete(false);
      animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
    }
  }, [isLoading, isComplete, x]);

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.x < -180) {
      setIsComplete(true);
      onSubmit();
    } else {
      animate(x, 0, { type: "spring", stiffness: 500, damping: 30 });
    }
  };

  return (
    <div className="relative h-20 w-full max-w-[400px] rounded-full bg-[#1A1A1A] border border-white/10 p-2 overflow-hidden flex items-center shadow-2xl">
      <motion.div style={{ opacity }} className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="flex items-center gap-3 text-white/30 font-bold uppercase tracking-widest text-sm">
          <ChevronLeft className="h-5 w-5 animate-pulse" />
          <span>החלק לניתוח יכולות</span>
        </div>
      </motion.div>

      {!isLoading && !isComplete && (
        <motion.div
          drag="x" dragConstraints={{ left: -300, right: 0 }} dragElastic={0.05}
          style={{ x }} onDragEnd={handleDragEnd}
          className="z-10 h-16 w-16 rounded-full bg-white text-black flex items-center justify-center cursor-grab active:cursor-grabbing shadow-white/20 shadow-xl"
        >
          <Send className="h-6 w-6" />
        </motion.div>
      )}

      {(isLoading || isComplete) && (
        <div className="w-full flex justify-center items-center gap-3 text-white">
          <Loader2 className="h-6 w-6 animate-spin text-white" />
          <span className="text-sm font-bold tracking-widest uppercase italic">Processing...</span>
        </div>
      )}
    </div>
  );
};

export default SlideToSubmit;
