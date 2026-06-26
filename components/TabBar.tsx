'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePortal } from '@/store/portalStore';
import { universities } from '@/data/dummyData';

const tabs = [
  { href: '/home', label: 'ホーム', icon: '🏠' },
  { href: '/timetable', label: '時間割', icon: '📅' },
  { href: '/assignments', label: '課題', icon: '📝' },
  { href: '/announcements', label: 'お知らせ', icon: '🔔' },
  { href: '/settings', label: '設定', icon: '⚙️' },
];

export default function TabBar() {
  const pathname = usePathname();
  const { state } = usePortal();
  const university = universities.find((u) => u.id === state.selectedUniversityId);
  const themeColor = university?.themeColor ?? '#003366';

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex-1 flex flex-col items-center justify-center py-2 pt-3 pb-5 gap-0.5"
            >
              <span className="text-xl leading-none">{tab.icon}</span>
              <span
                className="text-xs font-medium"
                style={{ color: isActive ? themeColor : '#9CA3AF' }}
              >
                {tab.label}
              </span>
              {isActive && (
                <span
                  className="absolute bottom-0 h-0.5 w-10"
                  style={{ backgroundColor: themeColor }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
