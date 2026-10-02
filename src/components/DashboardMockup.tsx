import { Flame, Gamepad2, ClipboardList, PlayCircle, Trophy, Wallet, TrendingUp } from 'lucide-react';
import { useLanguage } from '../i18n/useLanguage';

const BARS = [38, 55, 42, 70, 62, 88, 76];

export default function DashboardMockup() {
  const { t } = useLanguage();

  const tasks = [
    { icon: Gamepad2, label: t.mockup.task1, reward: '+$4.20', color: 'text-neon-violet', progress: 70 },
    { icon: ClipboardList, label: t.mockup.task2, reward: '+$0.85', color: 'text-neon-cyan', progress: 40 },
    { icon: PlayCircle, label: t.mockup.task3, reward: '+$0.30', color: 'text-neon-pink', progress: 90 },
  ];

  return (
    <div className="relative mx-auto w-full max-w-lg [perspective:1600px]" aria-hidden="true">
      <div className="absolute -inset-10 rounded-full bg-gradient-to-tr from-neon-cyan/25 via-neon-violet/25 to-neon-pink/20 blur-3xl" />

      <div className="relative transition-transform duration-700 [transform:rotateY(-14deg)_rotateX(8deg)] hover:[transform:rotateY(0deg)_rotateX(0deg)] rtl:[transform:rotateY(14deg)_rotateX(8deg)]">
        <div className="glass relative overflow-hidden rounded-3xl p-5 shadow-[0_30px_80px_-20px_rgba(168,85,247,0.45)] sm:p-6">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent" />

          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400">{t.mockup.balance}</p>
              <p className="mt-1 font-display text-3xl font-bold text-white sm:text-4xl" dir="ltr">
                $1,284.<span className="text-slate-400">60</span>
              </p>
              <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-neon-lime">
                <TrendingUp className="h-3.5 w-3.5" /> +$32.40 {t.mockup.today}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-violet px-3 py-2 text-xs font-bold text-ink-950">
              <Wallet className="h-4 w-4" /> {t.mockup.withdraw}
            </span>
          </div>

          <div className="mt-6 rounded-2xl border border-white/5 bg-ink-800/60 p-4">
            <p className="text-xs font-medium text-slate-400">{t.mockup.weeklyEarnings}</p>
            <div className="mt-3 flex h-24 items-end gap-2" dir="ltr">
              {BARS.map((h, i) => (
                <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-neon-violet/40 to-neon-cyan" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          <div className="mt-4 space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{t.mockup.tasks}</p>
            {tasks.map(({ icon: Icon, label, reward, color, progress }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3">
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-ink-700 ${color}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{label}</p>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-ink-700">
                    <div className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-violet" style={{ width: `${progress}%` }} />
                  </div>
                </div>
                <span className="text-sm font-bold text-neon-lime" dir="ltr">{reward}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass absolute -top-12 end-[-1.5rem] hidden animate-float items-center gap-2 rounded-2xl px-4 py-3 shadow-neon-violet sm:flex">
          <Trophy className="h-5 w-5 text-yellow-400" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400">{t.mockup.level}</p>
            <p className="font-display text-sm font-bold text-white">27</p>
          </div>
        </div>

        <div className="glass absolute -bottom-6 start-[-1.5rem] hidden animate-float items-center gap-2 rounded-2xl px-4 py-3 shadow-neon-cyan [animation-delay:1.5s] sm:flex">
          <Flame className="h-5 w-5 text-orange-400" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-400">{t.mockup.dailyStreak}</p>
            <p className="font-display text-sm font-bold text-white">14 {t.mockup.days}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
