import { Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-primary py-20 md:py-32">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 h-64 w-64 rounded-full bg-primary-foreground blur-3xl" />
        <div className="absolute bottom-10 left-10 h-48 w-48 rounded-full bg-primary-foreground blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-primary-foreground">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-medium">מונע בינה מלאכותית</span>
        </div>

        <h1 className="mb-6 text-4xl font-extrabold leading-tight text-primary-foreground md:text-6xl">
          Skill-Bridge
        </h1>
        <p className="mb-4 text-2xl font-bold text-primary-foreground/90 md:text-3xl">
          גשר המיומנויות
        </p>
        <p className="mx-auto max-w-2xl text-lg text-primary-foreground/75 md:text-xl">
          המרת הניסיון הצבאי שלך לשפה מקצועית של ניהול פרויקטים —
          <br className="hidden md:block" />
          קורות חיים מוכנים בלחיצת כפתור
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
