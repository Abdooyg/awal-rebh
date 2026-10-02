import { ArrowRight, Sparkles } from 'lucide-react';
import DashboardMockup from './DashboardMockup';
import { useLanguage } from '../i18n/useLanguage';

export default function Hero({ onStart }: { onStart: () => void }) {
  const { t } = useLanguage();

  const stats = [
    { value: '$2.4M+', label: t.hero.statPaid },
    { value: '120K+', label: t.hero.statUsers },
    { value: '$1.00', label: t.hero.statPayout },
  ];

  return (
    <section id="home" className="relative overflow-hidden pb-24 pt-32 sm:pt-40">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-40 start-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-neon-violet/20 blur-[120px] rtl:translate-x-1/2" />
      <div className="pointer-events-none absolute -bottom-40 end-0 h-80 w-80 rounded-full bg-neon-cyan/15 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="text-center lg:text-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-1.5 text-xs font-semibold text-neon-cyan">
            <Sparkles className="h-3.5 w-3.5" />
            {t.hero.badge}
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight text-white sm:text-5xl xl:text-6xl">
            {t.hero.titleStart} <span className="text-gradient block sm:inline">{t.hero.titleHighlight}</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg lg:mx-0">{t.hero.subtitle}</p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <button type="button" onClick={onStart} className="btn-neon w-full px-8 py-4 text-base sm:w-auto">
              {t.hero.cta}
              <ArrowRight className="h-5 w-5 rtl:-scale-x-100" />
            </button>
            <a href="#features" className="btn-ghost w-full px-8 py-4 text-base sm:w-auto">
              {t.hero.secondary}
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-xl font-bold text-white sm:text-2xl" dir="ltr">{s.value}</dd>
                <dd className="mt-1 text-xs text-slate-400 sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <DashboardMockup />
      </div>
    </section>
  );
}
