import { Clock, ShieldCheck, Compass } from "lucide-react";

const FEATURES = [
  {
    icon: Clock,
    title: "Exceptional Customer Service",
    desc: "We're with you every step of the way — offering support before, during and after your purchase.",
  },
  {
    icon: ShieldCheck,
    title: "Premium Quality Materials",
    desc: "We use only top-tier solid timber to ensure durability, functionality and beauty that lasts a lifetime.",
  },
  {
    icon: Compass,
    title: "Personalized Design Solutions",
    desc: "Your home, your style — from modern to classic, we bring your vision to life with custom finishes.",
  },
];

export function WhyWoodrix() {
  return (
    <section className="py-20 lg:py-28 bg-surface">
      <div className="container">
        <div className="text-center mb-14">
          <p className="text-[11px] uppercase tracking-[0.32em] text-gold mb-4">The Woodrix Difference</p>
          <h2 className="font-display italic text-4xl sm:text-5xl lg:text-6xl tracking-tight text-warm">
            Why Choose
            <br />
            <span className="text-gold">Woodrix?</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7 max-w-5xl mx-auto">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="border border-walnut/15 rounded-sm p-7 lg:p-8 bg-background/60 hover:bg-background hover:border-gold/50 transition"
            >
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-sm border border-gold/30 bg-surface mb-5">
                <Icon className="h-5 w-5 text-gold" />
              </div>
              <h3 className="font-display text-[18px] tracking-tight text-warm mb-3 leading-snug">
                {title}
              </h3>
              <p className="text-[13px] leading-relaxed text-warm/60">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
