'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

// 研究コンソール共通のUI部品。透明感のある赤（すりガラス＋半透明の赤グラデーション）で統一する。
// テーマの定義は app/globals.css の .research-root / .rc-* を参照。

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <div className="flex items-center gap-2.5">
          <span className="h-6 w-1.5 rounded-full rc-primary" aria-hidden />
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
        </div>
        {description && <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-500">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ title, description, actions, children, className = '' }: { title?: string; description?: string; actions?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`rc-glass rounded-2xl ${className}`}>
      {(title || actions) && (
        <header className="flex flex-col gap-2 border-b border-rose-100/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {title && <h2 className="text-sm font-semibold tracking-wide text-slate-900">{title}</h2>}
            {description && <p className="mt-0.5 text-xs text-slate-500">{description}</p>}
          </div>
          {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </header>
      )}
      <div className="px-5 py-4">{children}</div>
    </section>
  );
}

export function Badge({ className, children }: { className: string; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset backdrop-blur-sm ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" aria-hidden />
      {children}
    </span>
  );
}

type AlertKind = 'success' | 'error' | 'warning' | 'info';
const alertStyles: Record<AlertKind, string> = {
  success: 'border-emerald-200/80 bg-emerald-50/70 text-emerald-800',
  error: 'border-rose-300/80 bg-rose-50/80 text-rose-800',
  warning: 'border-amber-200/80 bg-amber-50/70 text-amber-800',
  info: 'border-rose-100/90 bg-white/55 text-slate-700',
};

export function Alert({ kind, title, children, onClose }: { kind: AlertKind; title?: string; children?: ReactNode; onClose?: () => void }) {
  return (
    <div
      role={kind === 'error' ? 'alert' : 'status'}
      className={`flex items-start justify-between gap-3 rounded-xl border px-4 py-3 text-sm leading-relaxed shadow-sm backdrop-blur-md ${alertStyles[kind]}`}
    >
      <div className="min-w-0">
        {title && <p className="font-semibold">{title}</p>}
        {children && <div className={title ? 'mt-1' : ''}>{children}</div>}
      </div>
      {onClose && (
        <button type="button" onClick={onClose} className="text-xs opacity-70 hover:opacity-100" aria-label="閉じる">
          ✕
        </button>
      )}
    </div>
  );
}

export type Notice = { kind: AlertKind; title: string; message?: string } | null;

export function NoticeBar({ notice, onClose }: { notice: Notice; onClose: () => void }) {
  if (!notice) return null;
  return (
    <div className="mb-4">
      <Alert kind={notice.kind} title={notice.title} onClose={onClose}>
        {notice.message}
      </Alert>
    </div>
  );
}

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
const buttonStyles: Record<ButtonVariant, string> = {
  primary: 'rc-primary',
  secondary: 'bg-white/70 text-slate-700 ring-1 ring-inset ring-rose-200/80 backdrop-blur hover:bg-white hover:text-rose-700 disabled:text-slate-400',
  danger: 'bg-rose-50/60 text-rose-700 ring-1 ring-inset ring-rose-300/80 backdrop-blur hover:bg-rose-100/70 disabled:text-rose-300',
  ghost: 'text-slate-600 hover:bg-rose-50/70 hover:text-rose-700 disabled:text-slate-300',
};

export function Button({
  variant = 'secondary',
  busy,
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; busy?: boolean }) {
  return (
    <button
      type="button"
      {...props}
      disabled={props.disabled || busy}
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-150 active:scale-[0.98] disabled:cursor-not-allowed ${buttonStyles[variant]} ${className}`}
    >
      {busy && <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden />}
      {children}
    </button>
  );
}

export function Field({ label, hint, error, children, required }: { label: string; hint?: string; error?: string | null; children: ReactNode; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-slate-700">
        {label}
        {required && <span className="ml-0.5 text-rose-600">*</span>}
      </span>
      <div className="mt-1">{children}</div>
      {error ? <p className="mt-1 text-xs text-rose-600">{error}</p> : hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
    </label>
  );
}

export const inputClass =
  'block w-full rounded-lg border-0 bg-white/70 px-3 py-1.5 text-sm text-slate-900 ring-1 ring-inset ring-rose-200/80 backdrop-blur transition placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500/60 disabled:bg-white/40 disabled:text-slate-500';

export function Stat({ label, value, sub }: { label: string; value: ReactNode; sub?: ReactNode }) {
  return (
    <div className="rc-glass relative overflow-hidden rounded-2xl px-4 py-3.5">
      <span className="absolute inset-x-0 top-0 h-0.5 rc-primary opacity-70" aria-hidden />
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1.5 text-xl font-bold tabular-nums tracking-tight text-slate-900">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-slate-500">{sub}</p>}
    </div>
  );
}

export function EmptyState({ title, description, href, action }: { title: string; description: string; href?: string; action?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-rose-300/70 bg-white/45 px-6 py-10 text-center backdrop-blur-md">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-rose-100/70 text-rose-600" aria-hidden>
        ＋
      </div>
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
      {href && action && (
        <Link href={href} className="rc-primary mt-4 inline-flex rounded-lg px-3.5 py-1.5 text-sm font-medium">
          {action}
        </Link>
      )}
    </div>
  );
}

export function Table({ head, children, empty }: { head: ReactNode[]; children: ReactNode; empty?: string }) {
  const hasRows = Array.isArray(children) ? children.length > 0 : Boolean(children);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-rose-100 text-left text-xs font-medium text-rose-900/50">
            {head.map((h, i) => (
              <th key={i} className="whitespace-nowrap px-3 py-2 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-rose-100/60 [&>tr:hover]:bg-rose-50/40">
          {hasRows ? (
            children
          ) : (
            <tr>
              <td colSpan={head.length} className="px-3 py-6 text-center text-sm text-slate-500">
                {empty ?? 'データがありません'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export const td = 'whitespace-nowrap px-3 py-2 text-slate-700';

export function Loading() {
  return (
    <div className="flex items-center justify-center gap-2 py-12 text-sm text-slate-500">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-rose-300 border-t-rose-600" aria-hidden />
      読み込み中…
    </div>
  );
}
