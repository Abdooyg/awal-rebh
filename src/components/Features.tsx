import { ClipboardCheck, Gamepad2, MessageSquareText, ShieldCheck, Users, Zap } from 'lucide-react';
import { useLanguage } from '../i18n/useLanguage';

export default function Features() {
  const { t } = useLanguage();
  const f = t.features;

  const items = [
    { icon: ClipboardCheck, title: f.f1Title, desc: f.f1Desc, accent: 'text-neon-cyan bg-neon-cyan/10' },
    { icon: Gamepad2, title: f.f2Title, desc: f.f2Desc, accent: 'text-neon-violet bg-neon-violet/10' },
    { icon: MessageSquareText, title: f.f3Title, desc: f.f3Desc, accent: 'text-neon-pink bg-neon-pink/10' },
    { icon: Zap, title: f.f4Title, desc: f.f4Desc, accent: 'text-neon-lime bg-neon-lime/10' },
    { icon: ShieldCheck, title: f.f5Title, desc: f.f5Desc, accent: 'text-sky-400 bg-sky-400/10' },
    { icon: Users, title: f.f6Title, desc: f.f6Desc, accent: 'text-amber-400 bg-amber-400/10' },
  ];

  return (
    <section id="features" className="relative scroll-mt-20 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{f.title}</h2>
          <p className="mt-4 text-slate-400">{f.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, desc, accent }) => (
            <article
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-neon-cyan/40 hover:shadow-neon-cyan"
            >
              <div className="pointer-events-none absolute -end-16 -top-16 h-40 w-40 rounded-full bg-neon-violet/10 opacity-0 blur-2xl transition group-hover:opacity-100" />
              <span className={`grid h-12 w-12 place-items-center rounded-xl ${accent}`}>
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
