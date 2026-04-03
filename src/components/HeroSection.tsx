import { Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-[#121212] py-20 md:py-32">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-10 left-10 h-48 w-48 rounded-full bg-white/20 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-medium">מונע בינה מלאכותית</span>
        </div>

        <h1 className="mb-6 text-3xl font-extrabold leading-tight text-white md:text-5xl">
          מהשטח לניהול: תרגם את השירות הקרבי שלך לקריירה בהייטק
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-white/70 md:text-xl">
          הפיכת ניסיון קרבי לניסיון אזרחי עם תוצאות מוכחות בשטח.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
