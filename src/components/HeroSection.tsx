import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-black text-white pt-10 pb-20">
      
      {/* אפקט רקע טכנולוגי-מבצעי */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div className="absolute top-10 left-10 text-[10px] font-mono text-white/50 uppercase tracking-widest">
          // LYRA-V2 / FIELD_EXP / AZ_01 //
        </div>
        <div className="absolute bottom-10 right-10 text-[10px] font-mono text-white/50 uppercase tracking-widest">
          STATUS: OPERATIONAL
        </div>
      </div>

      {/* אנימציית הכותרת המוחצת */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-5xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight md:leading-tight">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.05 }}
            className="text-white/40 font-light"
          >
            מבצע לירה / הפוך
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="relative"
          >
            <span className="text-white">ניסיון קרבי</span>
            <span className="text-white/40"> לניסיון אזרחי</span>
          </motion.span>
          <br />
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5, type: "spring", stiffness: 100 }}
            className="inline-block mt-2 bg-white text-black px-4 py-1.5 rounded-lg text-3xl md:text-4xl lg:text-5xl font-extrabold shadow-[0_0_25px_rgba(255,255,255,0.4)]"
          >
            עם תוצאות מוכחות בשטח.
          </motion.span>
        </h1>

        {/* פסקת חיבור */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-10 max-w-2xl mx-auto text-lg md:text-xl text-gray-500 font-light leading-relaxed"
        >
          המערכת מנתחת את מה שביצעת ב-BOOTS ON THE GROUND, והופכת את זה לשפה העסקית שמעסיקים אזרחיים מחפשים. ב-15 שניות.
        </motion.p>
      </motion.div>

      {/* דחיפה ויזואלית לטופס */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 pointer-events-none"
      >
        <div className="flex flex-col items-center gap-2">
           <div className="w-0.5 h-16 bg-white/20 rounded-full"/>
           <span className="text-xs font-mono uppercase text-white/30 tracking-widest">הזנת נתונים</span>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
