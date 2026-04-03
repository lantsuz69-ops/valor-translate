import { motion } from "framer-motion";

const HeroSection = () => {
  // הגדרות אנימציה לשלבים השונים
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4, // פער של 0.4 שניות בין אלמנט לאלמנט
        delayChildren: 0.3,   // המתנה ראשונית לפני הכל
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8, // האנימציה עצמה לוקחת כמעט שנייה
        ease: [0.21, 0.47, 0.32, 0.98] // תנועה חלקה ויוקרתית
      }
    },
  };

  return (
    <section className="relative min-h-[55vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-white text-black pt-16 border-b border-slate-100">
      {/* רקע דקורטיבי עדין שמופיע לאט */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.03 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 pointer-events-none select-none"
      >
        <div className="absolute top-10 left-10 text-[10px] font-mono tracking-widest uppercase">
          Valor_Operational_v2.0
        </div>
        <div className="absolute bottom-10 right-10 text-[10px] font-mono tracking-widest uppercase">
          Status: Ready_to_Analyze
        </div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto"
      >
        {/* שלב 1: תג מערכת */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="px-3 py-1 rounded-full border border-slate-200 text-[10px] font-mono font-bold tracking-[0.2em] text-slate-400 uppercase">
            Military-to-Tech Interface
          </span>
        </motion.div>

        {/* שלב 2: כותרת ראשית */}
        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] mb-6"
        >
          הפוך ניסיון קרבי <br />
          <span className="text-slate-300 italic font-light">לניסיון אזרחי</span>
        </motion.h1>

        {/* שלב 3: תיאור המערכת */}
        <motion.p 
          variants={itemVariants}
          className="mt-8 max-w-xl mx-auto text-lg md:text-xl text-slate-500 font-medium leading-relaxed"
        >
          המערכת מנגישה את שפת ההייטק משפת השטח, בצורה הטובה ביותר.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default HeroSection;
