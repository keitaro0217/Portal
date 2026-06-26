'use client';

import { usePortal } from '@/store/portalStore';
import ConnectionCard from '@/components/ConnectionCard';

export default function SettingsPage() {
  const { state, selectUniversity, universities } = usePortal();
  const themeColor =
    universities.find((u) => u.id === state.selectedUniversityId)?.themeColor ?? '#003366';

  return (
    <div className="px-4 pt-6 pb-4 space-y-6">
      <h1 className="text-xl font-bold text-gray-900">設定</h1>

      <section>
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">大学を選択</h2>
        <div className="space-y-2">
          {universities.map((uni) => {
            const isSelected = state.selectedUniversityId === uni.id;
            return (
              <button
                key={uni.id}
                onClick={() => selectUniversity(uni.id)}
                className="w-full bg-white rounded-xl shadow-sm p-4 flex items-center gap-3 transition-all text-left"
                style={isSelected ? { outline: `2px solid ${uni.themeColor}`, outlineOffset: '0px' } : {}}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: uni.themeColor }}
                >
                  {uni.logoInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm">{uni.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{uni.portalName} / {uni.lmsName}</p>
                </div>
                {isSelected && (
                  <svg className="w-5 h-5 flex-shrink-0" style={{ color: uni.themeColor }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">ポータル連携</h2>
        <ConnectionCard />
      </section>

      <section>
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">アプリについて</h2>
        <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-100">
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-sm text-gray-700">バージョン</span>
            <span className="text-sm text-gray-400">1.0.0</span>
          </div>
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-sm text-gray-700">開発者</span>
            <span className="text-sm text-gray-400">UniPortal</span>
          </div>
        </div>
      </section>
    </div>
  );
}
