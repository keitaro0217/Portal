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
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4">
            <Link href="/research" className="flex items-center gap-2 min-w-0">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded bg-slate-900 text-xs font-bold text-white">R</span>
              <span className="truncate text-sm font-semibold">{basic.appDisplayName}</span>
            </Link>
            <span className="hidden truncate text-xs text-slate-500 sm:block">ログイン中: {principal}</span>
          </div>
          <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 md:hidden">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap border-b-2 px-3 py-2 text-sm ${isActive(item.href, item.exact) ? 'border-slate-900 font-medium text-slate-900' : 'border-transparent text-slate-500'}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
          <aside className="hidden w-52 flex-shrink-0 md:block">
            <nav className="sticky top-20 space-y-1">
              {nav.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-md px-3 py-2 text-sm ${isActive(item.href, item.exact) ? 'bg-slate-900 font-medium text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                  >
                    {item.label}
                  </Link>
                  {item.href === '/research/settings' && isActive(item.href) && (
                    <div className="mt-1 space-y-0.5 border-l border-slate-200 pl-3 ml-3">
                      {settingsNav.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className={`block rounded px-2 py-1.5 text-xs ${pathname === s.href ? 'font-semibold text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
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
    <nav className="mb-6 flex gap-1 overflow-x-auto border-b border-slate-200 md:hidden">
      {settingsNav.map((s) => (
        <Link
          key={s.href}
          href={s.href}
          className={`whitespace-nowrap border-b-2 px-3 py-2 text-sm ${pathname === s.href ? 'border-slate-900 font-medium' : 'border-transparent text-slate-500'}`}
        >
          {s.label}
        </Link>
      ))}
    </nav>
  );
}
