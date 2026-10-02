import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { AlertCircle, CheckCircle2, Eye, EyeOff, Loader2, Lock, Mail, ShieldCheck, User, X } from 'lucide-react';
import Logo from './Logo';
import { AppleIcon, FacebookIcon, GoogleIcon } from './SocialIcons';
import { useLanguage } from '../i18n/useLanguage';
import { EMAIL_PATTERN, login, signup, socialSignIn, type SocialProvider } from '../lib/auth';

export type AuthMode = 'login' | 'signup';

interface AuthModalProps {
  open: boolean;
  initialMode?: AuthMode;
  onClose: () => void;
}

type FieldErrors = Partial<Record<'username' | 'email' | 'password' | 'confirm' | 'terms', string>>;
type Status = { type: 'success' | 'error'; message: string } | null;

const PROVIDER_NAMES: Record<SocialProvider, string> = { google: 'Google', apple: 'Apple', facebook: 'Facebook' };

export default function AuthModal({ open, initialMode = 'login', onClose }: AuthModalProps) {
  const { t, dir } = useLanguage();
  const a = t.auth;
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [remember, setRemember] = useState(true);
  const [terms, setTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState<'email' | SocialProvider | null>(null);
  const [status, setStatus] = useState<Status>(null);

  useEffect(() => {
    if (open) {
      setMode(initialMode);
      setErrors({});
      setStatus(null);
    }
  }, [open, initialMode]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector<HTMLElement>('input, button')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), a[href]',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const isSignup = mode === 'signup';

  const switchMode = (next: AuthMode) => {
    setMode(next);
    setErrors({});
    setStatus(null);
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (isSignup && username.trim().length < 3) next.username = a.errName;
    if (!EMAIL_PATTERN.test(email.trim())) next.email = a.errEmail;
    if (password.length < 8) next.password = a.errPassword;
    if (isSignup && confirm !== password) next.confirm = a.errMatch;
    if (isSignup && !terms) next.terms = a.errTerms;
    return next;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus(null);
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading('email');
    try {
      if (isSignup) {
        await signup({ username: username.trim(), email: email.trim(), password });
        setStatus({ type: 'success', message: a.successSignup });
      } else {
        await login({ email: email.trim(), password, remember });
        setStatus({ type: 'success', message: a.successLogin });
      }
    } catch (err) {
      setStatus({ type: 'error', message: err instanceof Error ? err.message : String(err) });
    } finally {
      setLoading(null);
    }
  };

  const handleSocial = async (provider: SocialProvider) => {
    setStatus(null);
    setLoading(provider);
    try {
      await socialSignIn(provider);
      setStatus({ type: 'success', message: a.successSocial.replace('{provider}', PROVIDER_NAMES[provider]) });
    } catch (err) {
      setStatus({ type: 'error', message: err instanceof Error ? err.message : String(err) });
    } finally {
      setLoading(null);
    }
  };

  const busy = loading !== null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4" dir={dir}>
      <div className="absolute inset-0 animate-fade-in bg-ink-950/80 backdrop-blur-md" onClick={onClose} aria-hidden="true" />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[100dvh] w-full max-w-4xl animate-scale-in overflow-hidden rounded-t-3xl border border-white/10 bg-ink-900 shadow-[0_0_80px_-10px_rgba(168,85,247,0.5)] sm:max-h-[92vh] sm:rounded-3xl"
      >
        <aside className="relative hidden w-5/12 flex-col justify-between overflow-hidden bg-gradient-to-br from-neon-violet/30 via-ink-800 to-neon-cyan/20 p-8 md:flex">
          <div className="bg-grid absolute inset-0 opacity-60" />
          <div className="relative">
            <Logo />
          </div>
          <div className="relative">
            <p className="font-display text-2xl font-bold leading-snug text-white">
              {t.hero.titleStart} <span className="text-gradient">{t.hero.titleHighlight}</span>
            </p>
            <p className="mt-3 text-sm text-slate-300">{t.hero.badge}</p>
          </div>
          <p className="relative flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="h-4 w-4 text-neon-lime" /> {a.secure}
          </p>
        </aside>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id={titleId} className="font-display text-2xl font-bold text-white">
                {isSignup ? a.signupTitle : a.loginTitle}
              </h2>
              <p className="mt-1 text-sm text-slate-400">{isSignup ? a.signupSubtitle : a.loginSubtitle}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={a.close}
              className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 rounded-xl bg-ink-800 p-1" role="tablist">
            {(['login', 'signup'] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={mode === m}
                onClick={() => switchMode(m)}
                className={`rounded-lg py-2.5 text-sm font-semibold transition ${
                  mode === m ? 'bg-gradient-to-r from-neon-cyan to-neon-violet text-ink-950 shadow-neon-cyan' : 'text-slate-400 hover:text-white'
                }`}
              >
                {m === 'login' ? a.loginTab : a.signupTab}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              onClick={() => handleSocial('google')}
              disabled={busy}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-white px-6 py-3.5 text-base font-semibold text-slate-900 shadow-lg transition hover:bg-slate-100 hover:shadow-neon-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading === 'google' ? <Loader2 className="h-5 w-5 animate-spin" /> : <GoogleIcon className="h-6 w-6" />}
              {a.google}
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocial('apple')}
                disabled={busy}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-black px-4 py-3 text-sm font-semibold text-white transition hover:border-white/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading === 'apple' ? <Loader2 className="h-5 w-5 animate-spin" /> : <AppleIcon />}
                {a.apple}
              </button>
              <button
                type="button"
                onClick={() => handleSocial('facebook')}
                disabled={busy}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#1877F2] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#166FE5] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading === 'facebook' ? <Loader2 className="h-5 w-5 animate-spin" /> : <FacebookIcon />}
                {a.facebook}
              </button>
            </div>
          </div>

          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-xs uppercase tracking-wider text-slate-500">{a.or}</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {isSignup && (
              <Field label={a.name} error={errors.username} icon={<User className="h-5 w-5" />}>
                {(id, describedBy) => (
                  <input
                    id={id}
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={a.namePlaceholder}
                    aria-invalid={!!errors.username}
                    aria-describedby={describedBy}
                    className="input-field"
                  />
                )}
              </Field>
            )}

            <Field label={a.email} error={errors.email} icon={<Mail className="h-5 w-5" />}>
              {(id, describedBy) => (
                <input
                  id={id}
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  dir="ltr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={a.emailPlaceholder}
                  aria-invalid={!!errors.email}
                  aria-describedby={describedBy}
                  className="input-field rtl:text-right"
                />
              )}
            </Field>

            <Field label={a.password} error={errors.password} icon={<Lock className="h-5 w-5" />}>
              {(id, describedBy) => (
                <>
                  <input
                    id={id}
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={isSignup ? 'new-password' : 'current-password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={a.passwordPlaceholder}
                    aria-invalid={!!errors.password}
                    aria-describedby={describedBy}
                    className="input-field pe-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? a.hidePassword : a.showPassword}
                    className="absolute inset-y-0 end-0 grid w-12 place-items-center text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </>
              )}
            </Field>

            {isSignup && (
              <Field label={a.confirmPassword} error={errors.confirm} icon={<Lock className="h-5 w-5" />}>
                {(id, describedBy) => (
                  <input
                    id={id}
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder={a.confirmPlaceholder}
                    aria-invalid={!!errors.confirm}
                    aria-describedby={describedBy}
                    className="input-field"
                  />
                )}
              </Field>
            )}

            {isSignup ? (
              <div>
                <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-400">
                  <input
                    type="checkbox"
                    checked={terms}
                    onChange={(e) => setTerms(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-white/20 bg-ink-800 accent-neon-cyan"
                  />
                  <span>
                    {a.agree}{' '}
                    <a href="#terms" className="font-medium text-neon-cyan hover:underline">{a.terms}</a> {a.and}{' '}
                    <a href="#privacy" className="font-medium text-neon-cyan hover:underline">{a.privacy}</a>
                  </span>
                </label>
                {errors.terms && <p className="mt-1.5 text-xs text-rose-400">{errors.terms}</p>}
              </div>
            ) : (
              <div className="flex items-center justify-between text-sm">
                <label className="flex cursor-pointer items-center gap-2 text-slate-400">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-white/20 bg-ink-800 accent-neon-cyan"
                  />
                  {a.remember}
                </label>
                <a href="#forgot-password" className="font-medium text-neon-cyan hover:underline">{a.forgot}</a>
              </div>
            )}

            {status && (
              <div
                role={status.type === 'error' ? 'alert' : 'status'}
                className={`flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${
                  status.type === 'success'
                    ? 'border-neon-lime/30 bg-neon-lime/10 text-neon-lime'
                    : 'border-rose-500/30 bg-rose-500/10 text-rose-300'
                }`}
              >
                {status.type === 'success' ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />}
                {status.message}
              </div>
            )}

            <button type="submit" disabled={busy} className="btn-neon w-full py-3.5 text-base">
              {loading === 'email' && <Loader2 className="h-5 w-5 animate-spin" />}
              {isSignup ? a.submitSignup : a.submitLogin}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            {isSignup ? a.haveAccount : a.noAccount}{' '}
            <button
              type="button"
              onClick={() => switchMode(isSignup ? 'login' : 'signup')}
              className="font-semibold text-neon-cyan hover:underline"
            >
              {isSignup ? a.loginTab : a.signupTab}
            </button>
          </p>

          <p className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500 md:hidden">
            <ShieldCheck className="h-4 w-4 text-neon-lime" /> {a.secure}
          </p>
        </div>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  error?: string;
  icon: ReactNode;
  children: (id: string, describedBy: string | undefined) => ReactNode;
}

function Field({ label, error, icon, children }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-300">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 start-0 grid w-11 place-items-center text-slate-500">{icon}</span>
        {children(id, error ? errorId : undefined)}
      </div>
      {error && (
        <p id={errorId} className="mt-1.5 text-xs text-rose-400">
          {error}
        </p>
      )}
    </div>
  );
}
