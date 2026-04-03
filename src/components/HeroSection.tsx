import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-[50vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-[#020617] text-white pt-10 border-b border-slate-800/50">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">
          הפוך ניסיון קרבי <br />
          <span className="text-slate-500 italic font-light italic">לניסיון אזרחי</span>
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-lg md:text-xl text-slate-400 font-medium">
          המערכת מתרגמת את שפת ההייטק משפת השטח, בצורה הטובה ביותר.
        </p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
