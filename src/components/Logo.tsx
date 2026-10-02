export default function Logo({ className = '' }: { className?: string }) {
  return (
    <a href="#home" className={`group flex items-center gap-2.5 ${className}`} aria-label="Awal Rebh">
      <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-ink-800 ring-1 ring-white/10 transition group-hover:shadow-neon-cyan">
        <svg viewBox="0 0 64 64" className="h-6 w-6" aria-hidden="true">
          <defs>
            <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#22d3ee" />
              <stop offset="1" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          <path d="M32 6 54 58H42l-4-10H26l-4 10H10L32 6Zm0 18-4 12h8l-4-12Z" fill="url(#logo-g)" />
        </svg>
      </span>
      <span className="font-display text-lg font-bold tracking-wider text-white" dir="ltr">
        AWAL<span className="text-gradient">REBH</span>
      </span>
    </a>
  );
}
