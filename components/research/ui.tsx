'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

// 研究コンソール共通のUI部品。紺色を基調に、白いパネルと明るいグレーの背景で読みやすさを優先する。
// テーマの定義は app/globals.css の .research-root / .rc-* を参照。

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-navy-950">{title}</h1>
        {description && <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-slate-600">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ title, description, actions, children, className = '' }: { title?: string; description?: string; actions?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`rc-glass rounded-xl ${className}`}>
      {(title || actions) && (
        <header className="flex flex-col gap-2 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {title && <h2 className="text-sm font-semibold tracking-wide text-navy-900">{title}</h2>}
            {description && <p className="mt-0.5 text-xs text-slate-600">{description}</p>}
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
    <span className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" aria-hidden />
      {children}
    </span>
  );
}

type AlertKind = 'success' | 'error' | 'warning' | 'info';
const alertStyles: Record<AlertKind, string> = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  error: 'border-rose-200 bg-rose-50 text-rose-900',
  warning: 'border-amber-200 bg-amber-50 text-amber-900',
  info: 'border-slate-200 bg-white text-slate-700',
};

export function Alert({ kind, title, children, onClose }: { kind: AlertKind; title?: string; children?: ReactNode; onClose?: () => void }) {
  return (
    <div
      role={kind === 'error' ? 'alert' : 'status'}
      className={`flex items-start justify-between gap-3 rounded-xl border px-4 py-3 text-sm leading-relaxed shadow-sm ${alertStyles[kind]}`}
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
  secondary: 'bg-white text-slate-700 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 hover:text-navy-700 disabled:text-slate-500',
  danger: 'bg-white text-rose-700 ring-1 ring-inset ring-rose-300 hover:bg-rose-50 disabled:text-rose-300',
  ghost: 'text-slate-600 hover:bg-slate-100 hover:text-navy-700 disabled:text-slate-300',
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
      className={`inline-flex items-center justify-center gap-1.5 rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed ${buttonStyles[variant]} ${className}`}
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
      {error ? <p className="mt-1 text-xs text-rose-600">{error}</p> : hint ? <p className="mt-1 text-xs text-slate-600">{hint}</p> : null}
    </label>
  );
}

export const inputClass =
  'block w-full rounded-lg border-0 bg-white px-3 py-1.5 text-sm text-slate-900 ring-1 ring-inset ring-slate-300 transition placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-navy-500/50 disabled:bg-slate-50 disabled:text-slate-600';

export function Stat({ label, value, sub }: { label: string; value: ReactNode; sub?: ReactNode }) {
  return (
    <div className="rc-glass relative overflow-hidden rounded-xl py-4 pl-5 pr-4">
      <span className="absolute inset-y-0 left-0 w-1 bg-navy-700" aria-hidden />
      <p className="text-xs font-medium text-slate-600">{label}</p>
      <p className="mt-1.5 text-2xl font-bold tabular-nums tracking-tight text-navy-950">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-slate-600">{sub}</p>}
    </div>
  );
}

export function EmptyState({ title, description, href, action }: { title: string; description: string; href?: string; action?: string }) {
  return (
    <div className="rounded-xl border border-dashed border-navy-200 bg-white px-6 py-10 text-center">
      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-navy-50 text-navy-600" aria-hidden>
        ＋
      </div>
      <p className="text-sm font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-sm text-slate-600">{description}</p>
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
          <tr className="border-b border-navy-100 bg-navy-50/70 text-left text-xs font-semibold text-navy-800">
            {head.map((h, i) => (
              <th key={i} className="whitespace-nowrap px-3 py-2 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 [&>tr:hover]:bg-slate-50">
          {hasRows ? (
            children
          ) : (
            <tr>
              <td colSpan={head.length} className="px-3 py-6 text-center text-sm text-slate-600">
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
    <div className="flex items-center justify-center gap-2 py-12 text-sm text-slate-600">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-navy-200 border-t-navy-700" aria-hidden />
      読み込み中…
    </div>
  );
}
