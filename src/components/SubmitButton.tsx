import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";

const SubmitButton = ({ onClick, isLoading }: any) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={isLoading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative w-full h-16 rounded-2xl flex items-center justify-center gap-3 bg-white text-black font-bold text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all"
    >
      {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Send className="h-4 w-4" /> <span>התחל ניתוח יכולות</span></>}
    </motion.button>
  );
};

export default SubmitButton;
