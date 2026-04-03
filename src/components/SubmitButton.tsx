import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";

interface SubmitButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

const SubmitButton = ({ onClick, isLoading }: SubmitButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={isLoading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative w-full h-16 rounded-2xl flex items-center justify-center gap-3 bg-slate-900 text-white font-bold text-sm uppercase tracking-widest shadow-xl hover:bg-black transition-all disabled:opacity-50"
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <>
          <Send className="h-4 w-4" />
          <span>התחל ניתוח יכולות // EXECUTE</span>
        </>
      )}
    </motion.button>
  );
};

export default SubmitButton;
