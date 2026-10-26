'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';

// 研究コンソール共通のUI部品。金融機関向けの落ち着いた配色（濃紺・グレー）で統一する。

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-6">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function Card({ title, description, actions, children, className = '' }: { title?: string; description?: string; actions?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-lg border border-slate-200 bg-white shadow-sm ${className}`}>
      {(title || actions) && (
        <header className="flex flex-col gap-2 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {title && <h2 className="text-sm font-semibold text-slate-900">{title}</h2>}
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
  return <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset whitespace-nowrap ${className}`}>{children}</span>;
}

type AlertKind = 'success' | 'error' | 'warning' | 'info';
const alertStyles: Record<AlertKind, string> = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  error: 'border-red-200 bg-red-50 text-red-800',
  warning: 'border-amber-200 bg-amber-50 text-amber-800',
  info: 'border-blue-200 bg-blue-50 text-blue-800',
};

export function Alert({ kind, title, children, onClose }: { kind: AlertKind; title?: string; children?: ReactNode; onClose?: () => void }) {
  return (
    <div role={kind === 'error' ? 'alert' : 'status'} className={`flex items-start justify-between gap-3 rounded-md border px-4 py-3 text-sm ${alertStyles[kind]}`}>
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
  primary: 'bg-slate-900 text-white hover:bg-slate-800 disabled:bg-slate-400',
  secondary: 'bg-white text-slate-700 ring-1 ring-inset ring-slate-300 hover:bg-slate-50 disabled:text-slate-400',
  danger: 'bg-white text-red-700 ring-1 ring-inset ring-red-300 hover:bg-red-50 disabled:text-red-300',
  ghost: 'text-slate-600 hover:bg-slate-100 disabled:text-slate-300',
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
      className={`inline-flex items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed ${buttonStyles[variant]} ${className}`}
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
        {required && <span className="ml-0.5 text-red-600">*</span>}
      </span>
      <div className="mt-1">{children}</div>
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
    </label>
  );
}

export const inputClass =
  'block w-full rounded-md border-0 px-2.5 py-1.5 text-sm text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-700 disabled:bg-slate-50 disabled:text-slate-500';

export function Stat({ label, value, sub }: { label: string; value: ReactNode; sub?: ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-semibold tabular-nums text-slate-900">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-slate-500">{sub}</p>}
    </div>
  );
}

export function EmptyState({ title, description, href, action }: { title: string; description: string; href?: string; action?: string }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-8 text-center">
      <p className="text-sm font-medium text-slate-900">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
      {href && action && (
        <Link href={href} className="mt-4 inline-flex rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800">
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
          <tr className="border-b border-slate-200 text-left text-xs font-medium text-slate-500">
            {head.map((h, i) => (
              <th key={i} className="whitespace-nowrap px-3 py-2 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
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
  return <p className="py-10 text-center text-sm text-slate-500">読み込み中…</p>;
}
