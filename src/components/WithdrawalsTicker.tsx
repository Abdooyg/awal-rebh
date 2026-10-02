import { Banknote } from 'lucide-react';
import { useLanguage } from '../i18n/useLanguage';

interface Withdrawal {
  user: string;
  amount: string;
  method: string;
  time: string;
  color: string;
}

const WITHDRAWALS: Withdrawal[] = [
  { user: 'Ahmed_K', amount: '$25.00', method: 'PayPal', time: '2m', color: 'from-sky-400 to-blue-600' },
  { user: 'Sofia.R', amount: '$12.50', method: 'USDT', time: '4m', color: 'from-emerald-400 to-teal-600' },
  { user: 'Dmitry_V', amount: '$50.00', method: 'Bitcoin', time: '5m', color: 'from-amber-400 to-orange-600' },
  { user: 'Lena_M', amount: '$8.00', method: 'Amazon', time: '7m', color: 'from-yellow-300 to-amber-500' },
  { user: 'Omar99', amount: '$100.00', method: 'PayPal', time: '9m', color: 'from-sky-400 to-blue-600' },
  { user: 'Jonas_B', amount: '$15.75', method: 'Steam', time: '11m', color: 'from-slate-400 to-slate-700' },
  { user: 'Fatima_A', amount: '$32.00', method: 'USDT', time: '13m', color: 'from-emerald-400 to-teal-600' },
  { user: 'Ivan_P', amount: '$5.00', method: 'Google Play', time: '16m', color: 'from-lime-400 to-green-600' },
  { user: 'Mia.S', amount: '$64.20', method: 'Bitcoin', time: '18m', color: 'from-amber-400 to-orange-600' },
  { user: 'Youssef', amount: '$20.00', method: 'PayPal', time: '21m', color: 'from-sky-400 to-blue-600' },
];

export default function WithdrawalsTicker() {
  const { t } = useLanguage();
  const items = [...WITHDRAWALS, ...WITHDRAWALS];

  return (
    <section aria-label={t.ticker.title} className="relative border-y border-white/5 bg-ink-900/80">
      <div className="mx-auto flex max-w-7xl items-stretch">
        <div className="relative z-10 flex shrink-0 items-center gap-2 bg-ink-900 px-4 py-4 sm:px-6">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-lime opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-neon-lime" />
          </span>
          <span className="whitespace-nowrap font-display text-xs font-bold uppercase tracking-widest text-white sm:text-sm">
            {t.ticker.title}
          </span>
        </div>

        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]" dir="ltr">
          <ul className="pause-on-hover flex w-max animate-marquee items-center gap-4 py-3">
            {items.map((w, i) => (
              <li
                key={`${w.user}-${i}`}
                aria-hidden={i >= WITHDRAWALS.length}
                className="flex items-center gap-3 rounded-full border border-white/5 bg-white/[0.03] py-1.5 pe-4 ps-1.5"
              >
                <span className={`grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br ${w.color} text-[11px] font-bold text-white`}>
                  {w.user.charAt(0)}
                </span>
                <span className="text-sm font-medium text-slate-200">{w.user}</span>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-neon-lime">
                  <Banknote className="h-4 w-4" />
                  {w.amount}
                </span>
                <span className="text-xs text-slate-500">
                  {t.ticker.via} {w.method} · {w.time} {t.ticker.ago}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
