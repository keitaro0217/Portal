'use client';

import { useState } from 'react';
import { usePortal } from '@/store/portalStore';
import { universities } from '@/data/dummyData';
import AnnouncementCard from '@/components/AnnouncementCard';

type Filter = 'all' | 'university' | 'course';

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: '全て' },
  { value: 'university', label: '大学からのお知らせ' },
  { value: 'course', label: '授業のお知らせ' },
];

export default function AnnouncementsPage() {
  const { state } = usePortal();
  const { courses, announcements } = state;
  const [activeFilter, setActiveFilter] = useState<Filter>('all');

  const university = universities.find((u) => u.id === state.selectedUniversityId);
  const themeColor = university?.themeColor ?? '#003366';

  const filtered = announcements
    .filter((a) => {
      if (activeFilter === 'university') return !a.courseId;
      if (activeFilter === 'course') return !!a.courseId;
      return true;
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="px-4 pt-6 pb-4">
      <h1 className="text-xl font-bold text-gray-900 mb-4">お知らせ</h1>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className="flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
            style={
              activeFilter === f.value
                ? { backgroundColor: themeColor, color: 'white' }
                : { backgroundColor: '#F3F4F6', color: '#6B7280' }
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400 text-sm">
            お知らせはありません
          </div>
        ) : (
          filtered.map((ann) => (
            <AnnouncementCard
              key={ann.id}
              announcement={ann}
              course={ann.courseId ? courses.find((c) => c.id === ann.courseId) : undefined}
            />
          ))
        )}
      </div>
    </div>
  );
}
