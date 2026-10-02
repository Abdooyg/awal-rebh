import { useEffect, useState } from 'react'

const Icon = ({ children, className = 'h-5 w-5', viewBox = '0 0 24 24' }) => (
  <svg
    aria-hidden="true"
    className={className}
    fill="none"
    viewBox={viewBox}
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
)

const ArrowUpLeft = () => (
  <Icon className="h-5 w-5 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-1">
    <path d="M17 17 7 7M7 7v8M7 7h8" />
  </Icon>
)

const BoltIcon = () => (
  <Icon>
    <path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z" />
  </Icon>
)

const WalletIcon = ({ className }) => (
  <Icon className={className}>
    <path d="M4 6.5h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2h12" />
    <path d="M15 11h5v4h-5a2 2 0 0 1 0-4Z" />
  </Icon>
)

const GameIcon = () => (
  <Icon>
    <path d="M8 12h4M10 10v4M15.5 12h.01M18 10.5h.01" />
    <path d="M6.5 6h11a4.5 4.5 0 0 1 4.2 6.1l-1.5 4A3 3 0 0 1 15.4 17l-1.2-1H9.8l-1.2 1a3 3 0 0 1-4.8-.9l-1.5-4A4.5 4.5 0 0 1 6.5 6Z" />
  </Icon>
)

const CheckIcon = () => (
  <Icon className="h-4 w-4">
    <path d="m5 12 4 4L19 6" />
  </Icon>
)

const UserIcon = () => (
  <Icon>
    <path d="M20 21a8 8 0 0 0-16 0" />
    <circle cx="12" cy="7" r="4" />
  </Icon>
)

const TasksIcon = () => (
  <Icon>
    <path d="M9 5h11M9 12h11M9 19h11" />
    <path d="m3 5 1 1 2-2M3 12l1 1 2-2M3 19l1 1 2-2" />
  </Icon>
)

const MenuIcon = ({ open }) => (
  <Icon className="h-6 w-6">
    {open ? (
      <>
        <path d="m6 6 12 12" />
        <path d="M18 6 6 18" />
      </>
    ) : (
      <>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </>
    )}
  </Icon>
)

const withdrawals = [
  { name: 'أحمد م.', method: 'PayPal', amount: '$42.80', time: 'الآن' },
  { name: 'سارة ع.', method: 'Vodafone Cash', amount: '$18.25', time: 'منذ دقيقة' },
  { name: 'محمد ك.', method: 'USDT', amount: '$76.40', time: 'منذ دقيقتين' },
  { name: 'نور هـ.', method: 'PayPal', amount: '$31.10', time: 'منذ 3 دقائق' },
  { name: 'عمر أ.', method: 'Binance', amount: '$54.90', time: 'منذ 4 دقائق' },
]

const tasks = [
  { icon: '🎮', title: 'العب واربح', reward: '+$1.80', progress: 72, tone: 'lime' },
  { icon: '📱', title: 'جرّب تطبيقاً', reward: '+$3.20', progress: 45, tone: 'cyan' },
  { icon: '💬', title: 'أجب عن استبيان', reward: '+$0.90', progress: 88, tone: 'purple' },
]

const steps = [
  {
    number: '01',
    icon: <UserIcon />,
    title: 'أنشئ حسابك',
    description: 'سجّل مجاناً خلال ثوانٍ واختر اهتماماتك لتظهر لك أفضل الفرص.',
    color: 'lime',
  },
  {
    number: '02',
    icon: <TasksIcon />,
    title: 'اختر مهمتك',
    description: 'تصفّح الألعاب والاستبيانات والعروض، وابدأ بما يناسب وقتك.',
    color: 'cyan',
  },
  {
    number: '03',
    icon: <WalletIcon className="h-5 w-5" />,
    title: 'اسحب أرباحك',
    description: 'استلم مكافآتك بسرعة عبر وسيلة الدفع المفضلة لديك وبكل أمان.',
    color: 'purple',
  },
]

function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    ['الرئيسية', '#home'],
    ['المميزات', '#features'],
    ['السحوبات', '#withdrawals'],
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-ink/80 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-[74px] max-w-7xl items-center justify-between px-5 lg:px-8"
        aria-label="التنقل الرئيسي"
      >
        <a href="#home" className="group flex items-center gap-2.5">
          <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-lime/30 bg-lime/10 text-lime shadow-neon">
            <BoltIcon />
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </span>
          <span className="text-xl font-black tracking-tight text-white">
            أول <span className="text-lime">ربح</span>
          </span>
        </a>

        <div className="hidden items-center gap-8 text-sm font-semibold text-slate-400 md:flex">
          {links.map(([label, href], index) => (
            <a
              key={href}
              href={href}
              className={`transition hover:text-white ${index === 0 ? 'text-white' : ''}`}
            >
              {label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#login"
            className="rounded-xl px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/5"
          >
            تسجيل الدخول
          </a>
          <a
            href="#signup"
            className="group flex items-center gap-2 rounded-xl bg-lime px-5 py-2.5 text-sm font-black text-ink shadow-neon transition hover:-translate-y-0.5 hover:bg-[#c8ff66]"
          >
            إنشاء حساب
            <ArrowUpLeft />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 text-white md:hidden"
          aria-expanded={open}
          aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
        >
          <MenuIcon open={open} />
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/[0.06] bg-ink/95 px-5 pb-5 pt-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-2">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-bold text-slate-300 hover:bg-white/5 hover:text-white"
              >
                {label}
              </a>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-3">
              <a
                href="#login"
                className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-bold text-white"
              >
                دخول
              </a>
              <a
                href="#signup"
                className="rounded-xl bg-lime px-4 py-3 text-center text-sm font-black text-ink"
              >
                حساب جديد
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function DashboardMockup() {
  const [balance, setBalance] = useState(128.64)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setBalance((value) => Number((value + 0.01).toFixed(2)))
    }, 4000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className="relative mx-auto w-full max-w-[560px] animate-float lg:mx-0">
      <div className="absolute -inset-8 rounded-full bg-cyan/10 blur-[90px]" />
      <div className="absolute -left-4 top-16 z-20 hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#111a29]/90 p-3 shadow-2xl backdrop-blur-xl sm:flex">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-lime/10 text-lime">
          <CheckIcon />
        </span>
        <div>
          <p className="text-[11px] text-slate-400">تمت المهمة بنجاح</p>
          <p className="text-sm font-black text-white">+$2.45 مكافأة</p>
        </div>
      </div>
      <div className="absolute -bottom-5 -right-3 z-20 hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#111a29]/90 p-3 shadow-2xl backdrop-blur-xl sm:flex">
        <span className="relative flex h-10 w-10 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-cyan/20" />
          <span className="relative grid h-9 w-9 place-items-center rounded-full bg-cyan/15 text-cyan">
            <WalletIcon className="h-4 w-4" />
          </span>
        </span>
        <div>
          <p className="text-[11px] text-slate-400">آخر سحب</p>
          <p className="text-sm font-black text-white">$35.00 عبر PayPal</p>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0d1422]/95 p-2 shadow-[0_40px_100px_rgba(0,0,0,0.55)] backdrop-blur">
        <div className="absolute inset-x-14 top-0 h-px bg-gradient-to-r from-transparent via-cyan/70 to-transparent" />
        <div className="overflow-hidden rounded-[22px] border border-white/[0.06] bg-[#090f1a]">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <div className="h-2.5 w-2.5 rounded-full bg-lime" />
            </div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
              <span className="h-2 w-2 rounded-full bg-lime shadow-[0_0_10px_#b7f34b]" />
              حسابك نشط
            </div>
          </div>

          <div className="grid gap-4 p-4 sm:grid-cols-[1.2fr_.8fr] sm:p-5">
            <div className="rounded-2xl border border-lime/15 bg-gradient-to-br from-lime/[0.12] to-transparent p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-400">رصيدك المتاح</p>
                  <p className="mt-2 text-3xl font-black tracking-tight text-white" dir="ltr">
                    ${balance.toFixed(2)}
                  </p>
                </div>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-lime text-ink shadow-neon">
                  <WalletIcon className="h-5 w-5" />
                </span>
              </div>
              <button
                type="button"
                className="mt-5 w-full rounded-xl bg-lime py-2.5 text-xs font-black text-ink transition hover:bg-[#c8ff66]"
              >
                سحب الأرباح
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-3.5">
                <p className="text-[10px] text-slate-500">مهام اليوم</p>
                <div className="mt-1 flex items-end justify-between">
                  <strong className="text-xl text-white">12</strong>
                  <span className="text-[10px] font-bold text-lime">+18%</span>
                </div>
              </div>
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-3.5">
                <p className="text-[10px] text-slate-500">أيام متتالية</p>
                <div className="mt-1 flex items-end justify-between">
                  <strong className="text-xl text-white">7</strong>
                  <span className="text-base">🔥</span>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 pb-5 sm:px-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-black text-white">مهام مقترحة لك</h3>
              <button type="button" className="text-[11px] font-bold text-cyan">
                عرض الكل
              </button>
            </div>
            <div className="space-y-2.5">
              {tasks.map((task) => {
                const tones = {
                  lime: ['bg-lime/10', 'text-lime', 'bg-lime'],
                  cyan: ['bg-cyan/10', 'text-cyan', 'bg-cyan'],
                  purple: ['bg-violet-500/10', 'text-violet-400', 'bg-violet-400'],
                }
                return (
                  <button
                    type="button"
                    key={task.title}
                    className="group flex w-full items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3 text-right transition hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.05]"
                  >
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${tones[task.tone][0]} text-lg`}
                    >
                      {task.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{task.title}</span>
                        <span className={`text-xs font-black ${tones[task.tone][1]}`}>
                          {task.reward}
                        </span>
                      </span>
                      <span className="mt-2 block h-1 overflow-hidden rounded-full bg-white/[0.06]">
                        <span
                          className={`block h-full rounded-full ${tones[task.tone][2]}`}
                          style={{ width: `${task.progress}%` }}
                        />
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden pb-20 pt-32 lg:flex lg:items-center lg:pb-24 lg:pt-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="hero-grid absolute inset-0 opacity-30" />
        <div className="absolute -right-48 top-16 h-[520px] w-[520px] rounded-full bg-lime/[0.07] blur-[120px]" />
        <div className="absolute -left-48 bottom-0 h-[520px] w-[520px] rounded-full bg-cyan/[0.07] blur-[120px]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-16 px-5 lg:grid-cols-[1.02fr_.98fr] lg:px-8">
        <div className="text-center lg:text-right">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-lime/20 bg-lime/[0.07] px-4 py-2 text-xs font-bold text-lime">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
            </span>
            أكثر من 50,000 فرصة ربح متاحة الآن
          </div>

          <h1 className="text-4xl font-black leading-[1.25] tracking-[-0.04em] text-white sm:text-6xl lg:text-[68px]">
            أنجز المهام، العب،
            <span className="relative mt-1 block bg-gradient-to-l from-lime via-[#e6ff9a] to-cyan bg-clip-text text-transparent">
              واربح المكافآت
              <svg
                aria-hidden="true"
                className="absolute -bottom-3 right-1/2 w-56 translate-x-1/2 text-lime/60 lg:right-0 lg:translate-x-0"
                viewBox="0 0 260 18"
                fill="none"
              >
                <path d="M3 13C75 2 158 3 257 6" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-xl text-base font-medium leading-8 text-slate-400 sm:text-lg lg:mx-0">
            حوّل وقتك إلى دخل حقيقي. اكتشف مهاماً ممتعة، ألعاباً جديدة واستبيانات سريعة،
            واسحب أرباحك بالطريقة التي تناسبك.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
            <a
              href="#signup"
              className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-lime px-7 py-4 text-base font-black text-ink shadow-neon transition hover:-translate-y-1 hover:bg-[#c8ff66] sm:w-auto"
            >
              ابدأ الربح الآن
              <ArrowUpLeft />
            </a>
            <a
              href="#features"
              className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-7 py-4 text-base font-bold text-white transition hover:border-white/20 hover:bg-white/[0.07] sm:w-auto"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full border border-white/20 text-[10px] text-lime">
                ▶
              </span>
              كيف تعمل المنصة؟
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-xs font-semibold text-slate-500 lg:justify-start">
            {['تسجيل مجاني', 'سحب سريع وآمن', 'دعم عربي 24/7'].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-lime/10 text-lime">
                  <CheckIcon />
                </span>
                {item}
              </span>
            ))}
          </div>
        </div>

        <DashboardMockup />
      </div>
    </section>
  )
}

function WithdrawalTicker() {
  const repeated = [...withdrawals, ...withdrawals]
  return (
    <section id="withdrawals" className="relative border-y border-white/[0.07] bg-[#090f19] py-5">
      <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#090f19] to-transparent sm:w-48" />
      <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#090f19] to-transparent sm:w-48" />
      <div className="mx-auto mb-4 flex max-w-7xl items-center justify-between px-5 lg:px-8">
        <div className="flex items-center gap-2 text-sm font-black text-white">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime" />
          </span>
          أحدث سحوبات المستخدمين
        </div>
        <span className="text-[11px] font-bold text-slate-500">تحديث مباشر</span>
      </div>
      <div className="ticker-mask overflow-hidden" dir="ltr">
        <div className="flex w-max animate-ticker gap-3 px-3 hover:[animation-play-state:paused]">
          {repeated.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="flex min-w-[285px] items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.035] px-4 py-3"
              dir="rtl"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cyan/20 to-lime/20 text-sm font-black text-white">
                {item.name.charAt(0)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-bold text-white">{item.name}</span>
                <span className="block text-[10px] text-slate-500">
                  {item.method} · {item.time}
                </span>
              </span>
              <strong className="text-sm text-lime" dir="ltr">
                {item.amount}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  return (
    <section id="features" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.045] blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 text-xs font-black text-lime">
            <span className="h-px w-8 bg-lime" />
            البداية أسهل مما تتخيل
            <span className="h-px w-8 bg-lime" />
          </span>
          <h2 className="mt-5 text-3xl font-black tracking-tight text-white sm:text-5xl">
            اربح في <span className="text-lime">3 خطوات</span> بسيطة
          </h2>
          <p className="mt-5 leading-8 text-slate-400">
            لا خبرة مطلوبة ولا رسوم خفية. فقط اختر ما تستمتع به وابدأ في جمع مكافآتك.
          </p>
        </div>

        <div className="relative mt-16 grid gap-5 lg:grid-cols-3">
          <div className="absolute left-[16%] right-[16%] top-16 hidden border-t border-dashed border-white/10 lg:block" />
          {steps.map((step, index) => {
            const toneClasses = {
              lime: 'text-lime bg-lime/10 border-lime/20 group-hover:shadow-neon',
              cyan: 'text-cyan bg-cyan/10 border-cyan/20 group-hover:shadow-cyan',
              purple:
                'text-violet-400 bg-violet-500/10 border-violet-400/20 group-hover:shadow-[0_0_34px_rgba(167,139,250,.18)]',
            }
            return (
              <article
                key={step.number}
                className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.055] to-white/[0.02] p-7 transition duration-500 hover:-translate-y-2 hover:border-white/[0.16] sm:p-8"
              >
                <span className="absolute -left-2 -top-6 text-[100px] font-black leading-none text-white/[0.025] transition group-hover:text-white/[0.045]">
                  {step.number}
                </span>
                <div className="relative flex items-center justify-between">
                  <span
                    className={`grid h-14 w-14 place-items-center rounded-2xl border transition duration-500 ${toneClasses[step.color]}`}
                  >
                    {step.icon}
                  </span>
                  <span className="font-mono text-xs font-bold tracking-[0.18em] text-slate-600">
                    STEP {step.number}
                  </span>
                </div>
                <h3 className="relative mt-8 text-xl font-black text-white">{step.title}</h3>
                <p className="relative mt-3 text-sm font-medium leading-7 text-slate-400">
                  {step.description}
                </p>
                <div className="relative mt-7 flex items-center gap-2 text-xs font-black text-white/50 transition group-hover:text-white">
                  {index === 2 ? 'جاهز لاستلام أرباحك' : 'تابع للخطوة التالية'}
                  <span className="text-lime">←</span>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-20 overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-l from-lime/[0.1] via-white/[0.035] to-cyan/[0.08] p-7 sm:p-10">
          <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-right">
            <div>
              <p className="text-sm font-black text-lime">ابدأ رحلتك اليوم</p>
              <h3 className="mt-2 text-2xl font-black text-white sm:text-3xl">
                أول مكافأة لك على بُعد دقائق
              </h3>
              <p className="mt-3 text-sm text-slate-400">
                انضم إلى مجتمع عربي يصنع دخلاً إضافياً كل يوم.
              </p>
            </div>
            <a
              id="signup"
              href="#home"
              className="group flex shrink-0 items-center gap-3 rounded-2xl bg-white px-7 py-4 text-sm font-black text-ink transition hover:-translate-y-1 hover:bg-lime"
            >
              سجّل مجاناً
              <ArrowUpLeft />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-center sm:flex-row sm:text-right lg:px-8">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-lime/10 text-lime">
            <BoltIcon />
          </span>
          <span className="font-black text-white">
            أول <span className="text-lime">ربح</span>
          </span>
        </div>
        <p className="text-xs text-slate-600">© 2026 أول ربح. منصتك الذكية للمكافآت.</p>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-ink text-white selection:bg-lime selection:text-ink">
      <Navbar />
      <main>
        <Hero />
        <WithdrawalTicker />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  )
}
