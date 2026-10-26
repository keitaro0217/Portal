'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createContext, useContext, type ReactNode } from 'react';
import type { BasicSettings } from '@/lib/research/types';

const SettingsContext = createContext<BasicSettings | null>(null);
export const useBasicSettings = () => useContext(SettingsContext);

const nav = [
  { href: '/research', label: 'ダッシュボード', exact: true },
  { href: '/research/experiments', label: '研究実験' },
  { href: '/research/simulation', label: 'シミュレーション' },
  { href: '/research/settings', label: '設定' },
];

export const settingsNav = [
  { href: '/research/settings/general', label: '基本設定' },
  { href: '/research/settings/api', label: 'API連携' },
  { href: '/research/settings/models', label: 'モデル割り当て' },
  { href: '/research/settings/execution', label: '実行設定' },
  { href: '/research/settings/costs', label: '費用管理' },
  { href: '/research/settings/security', label: 'セキュリティ' },
];

export default function ResearchShell({ basic, principal, children }: { basic: BasicSettings; principal: string; children: ReactNode }) {
  const pathname = usePathname();
  const isActive = (href: string, exact?: boolean) => (exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`));

  return (
    <SettingsContext.Provider value={basic}>
      <div className="research-root relative">
        <div className="rc-orb -right-24 -top-24 h-96 w-96 bg-rose-400/25" aria-hidden />
        <div className="rc-orb -left-32 top-1/3 h-80 w-80 bg-rose-300/20 [animation-delay:-6s]" aria-hidden />
        <div className="rc-orb bottom-0 right-1/4 h-72 w-72 bg-pink-300/20 [animation-delay:-12s]" aria-hidden />
        <header className="sticky top-0 z-30 border-b border-white/60 bg-white/55 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
            <Link href="/research" className="flex min-w-0 items-center gap-2.5">
              <span className="rc-primary flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold">R</span>
              <span className="truncate text-sm font-bold tracking-wide text-slate-900">{basic.appDisplayName}</span>
            </Link>
            <span className="hidden items-center gap-2 truncate rounded-full bg-white/60 px-3 py-1 text-xs text-slate-600 ring-1 ring-rose-100 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-500" aria-hidden />
              ログイン中: {principal}
            </span>
          </div>
          <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 md:hidden">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap border-b-2 px-3 py-2 text-sm ${isActive(item.href, item.exact) ? 'border-rose-500 font-semibold text-rose-700' : 'border-transparent text-slate-500'}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <div className="relative z-10 mx-auto flex max-w-7xl gap-6 px-4 py-8">
          <aside className="hidden w-56 flex-shrink-0 md:block">
            <nav className="rc-glass sticky top-24 space-y-1 rounded-2xl p-2">
              {nav.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-xl px-3 py-2 text-sm transition-colors ${isActive(item.href, item.exact) ? 'rc-primary font-semibold' : 'text-slate-600 hover:bg-white/70 hover:text-rose-700'}`}
                  >
                    {item.label}
                  </Link>
                  {item.href === '/research/settings' && isActive(item.href) && (
                    <div className="mb-1 ml-4 mt-1.5 space-y-0.5 border-l border-rose-200/80 pl-3">
                      {settingsNav.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className={`block rounded-lg px-2 py-1.5 text-xs transition-colors ${pathname === s.href ? 'bg-rose-50/80 font-semibold text-rose-700' : 'text-slate-500 hover:text-rose-700'}`}
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </aside>
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </SettingsContext.Provider>
  );
}

export function SettingsTabs() {
  const pathname = usePathname();
  return (
    <nav className="mb-6 flex gap-1 overflow-x-auto border-b border-rose-100 md:hidden">
      {settingsNav.map((s) => (
        <Link
          key={s.href}
          href={s.href}
          className={`whitespace-nowrap border-b-2 px-3 py-2 text-sm ${pathname === s.href ? 'border-rose-500 font-semibold text-rose-700' : 'border-transparent text-slate-500'}`}
        >
          {s.label}
        </Link>
      ))}
    </nav>
  );
}
