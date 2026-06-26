'use client';

import { useState } from 'react';
import { usePortal } from '@/store/portalStore';
import { universities } from '@/data/dummyData';
import AssignmentCard from '@/components/AssignmentCard';
import { AssignmentStatus } from '@/types';

type Filter = 'all' | AssignmentStatus;

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: '全て' },
  { value: 'pending', label: '未提出' },
  { value: 'submitted', label: '提出済み' },
  { value: 'overdue', label: '期限切れ' },
];

export default function AssignmentsPage() {
  const { state } = usePortal();
  const { courses, assignments } = state;
  const [activeFilter, setActiveFilter] = useState<Filter>('all');

  const university = universities.find((u) => u.id === state.selectedUniversityId);
  const themeColor = university?.themeColor ?? '#003366';

  const filtered = assignments
    .filter((a) => activeFilter === 'all' || a.status === activeFilter)
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

  return (
    <div className="px-4 pt-6 pb-4">
      <h1 className="text-xl font-bold text-gray-900 mb-4">課題</h1>

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
            {f.value !== 'all' && (
              <span className="ml-1 text-xs">
                ({assignments.filter((a) => a.status === f.value).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-400 text-sm">
            該当する課題はありません
          </div>
        ) : (
          filtered.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              course={courses.find((c) => c.id === assignment.courseId)}
            />
          ))
        )}
      </div>
    </div>
  );
}
