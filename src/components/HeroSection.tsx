import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-[50vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-white text-black pt-10 border-b border-gray-100">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-10 left-10 text-[10px] font-mono tracking-widest">SYSTEM_ACTIVE</div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6 text-black">
          הפוך ניסיון קרבי <br />
          <span className="text-gray-300 italic">לניסיון אזרחי</span>
        </h1>

        <motion.p className="mt-6 max-w-xl mx-auto text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
          המערכת מנגישה את שפת ההייטק משפת השטח, בצורה הטובה ביותר.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
