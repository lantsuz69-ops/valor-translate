import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-[55vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-black text-white pt-20">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 text-[10px] font-mono tracking-widest">LYRA_OS_V2</div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6">
          הפוך ניסיון קרבי <br />
          <span className="text-white/40">לניסיון אזרחי</span>
        </h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="mt-6 max-w-xl mx-auto text-lg md:text-xl text-gray-400 font-medium leading-relaxed"
        >
          המערכת מנגישה את שפת ההייטק משפת השטח, בצורה הטובה ביותר.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
