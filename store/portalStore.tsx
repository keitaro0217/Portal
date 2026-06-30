'use client';

import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { ConnectionStatus, SyncStatus, SyncLog } from '@/types';
import {
  universities,
  courses,
  timetableSlots,
  assignments,
  announcements,
  dummySyncLogs,
} from '@/data/dummyData';
import type { University, Course, TimetableSlot, Assignment, Announcement } from '@/types';

type State = {
  selectedUniversityId: string;
  connectionStatus: ConnectionStatus;
  lastSynced: Date | null;
  courses: Course[];
  timetableSlots: TimetableSlot[];
  assignments: Assignment[];
  announcements: Announcement[];
  syncStatus: SyncStatus;
  syncLogs: SyncLog[];
};

type Action =
  | { type: 'SELECT_UNIVERSITY'; universityId: string }
  | { type: 'START_CONNECTION' }
  | { type: 'COMPLETE_CONNECTION' }
  | { type: 'RESET_CONNECTION' }
  | { type: 'START_SYNC' }
  | { type: 'COMPLETE_SYNC' }
  | { type: 'HYDRATE'; payload: Partial<State> };

const initialState: State = {
  selectedUniversityId: 'keio',
  connectionStatus: 'connected',
  lastSynced: new Date(Date.now() - 3600000),
  courses,
  timetableSlots,
  assignments,
  announcements,
  syncStatus: {
    isSyncing: false,
    lastSyncTime: new Date(Date.now() - 3600000),
    message: '同期完了',
  },
  syncLogs: dummySyncLogs,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SELECT_UNIVERSITY':
      return { ...state, selectedUniversityId: action.universityId };
    case 'START_CONNECTION':
      return {
        ...state,
        connectionStatus: 'connecting',
        syncStatus: { ...state.syncStatus, isSyncing: true, message: 'ログイン中...' },
      };
    case 'COMPLETE_CONNECTION': {
      const now = new Date();
      return {
        ...state,
        connectionStatus: 'connected',
        lastSynced: now,
        syncStatus: { isSyncing: false, lastSyncTime: now, message: '同期完了' },
      };
    }
    case 'RESET_CONNECTION':
      return {
        ...state,
        connectionStatus: 'disconnected',
        lastSynced: null,
        syncStatus: { isSyncing: false, lastSyncTime: null, message: '未接続' },
      };
    case 'START_SYNC':
      return {
        ...state,
        syncStatus: { ...state.syncStatus, isSyncing: true, message: '同期中...' },
      };
    case 'COMPLETE_SYNC': {
      const now = new Date();
      const newLog: SyncLog = {
        id: `sl-${now.getTime()}`,
        timestamp: now,
        result: 'success',
        coursesFetched: state.courses.length,
        assignmentsFetched: state.assignments.length,
        announcementsFetched: state.announcements.length,
      };
      return {
        ...state,
        lastSynced: now,
        syncStatus: { isSyncing: false, lastSyncTime: now, message: '同期完了' },
        syncLogs: [newLog, ...state.syncLogs],
      };
    }
    case 'HYDRATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

type ContextValue = {
  state: State;
  universities: University[];
  selectUniversity: (id: string) => void;
  startConnection: () => void;
  completeConnection: () => void;
  resetConnection: () => void;
  disconnect: () => void;
  sync: () => void;
};

const PortalContext = createContext<ContextValue | null>(null);

export function PortalProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const stored = localStorage.getItem('portalState');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        dispatch({
          type: 'HYDRATE',
          payload: {
            selectedUniversityId: parsed.selectedUniversityId ?? initialState.selectedUniversityId,
            connectionStatus: parsed.connectionStatus ?? initialState.connectionStatus,
            lastSynced: parsed.lastSynced ? new Date(parsed.lastSynced) : null,
            syncStatus: parsed.syncStatus
              ? {
                  ...parsed.syncStatus,
                  lastSyncTime: parsed.syncStatus.lastSyncTime
                    ? new Date(parsed.syncStatus.lastSyncTime)
                    : null,
                }
              : initialState.syncStatus,
            syncLogs: Array.isArray(parsed.syncLogs)
              ? parsed.syncLogs.map((log: SyncLog) => ({
                  ...log,
                  timestamp: new Date(log.timestamp),
                }))
              : initialState.syncLogs,
          },
        });
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'portalState',
      JSON.stringify({
        selectedUniversityId: state.selectedUniversityId,
        connectionStatus: state.connectionStatus,
        lastSynced: state.lastSynced,
        syncStatus: state.syncStatus,
        syncLogs: state.syncLogs,
      })
    );
  }, [state.selectedUniversityId, state.connectionStatus, state.lastSynced, state.syncStatus, state.syncLogs]);

  const selectUniversity = (id: string) => dispatch({ type: 'SELECT_UNIVERSITY', universityId: id });

  const startConnection = () => dispatch({ type: 'START_CONNECTION' });

  const completeConnection = () => dispatch({ type: 'COMPLETE_CONNECTION' });

  const resetConnection = () => dispatch({ type: 'RESET_CONNECTION' });

  const disconnect = () => dispatch({ type: 'RESET_CONNECTION' });

  const sync = () => {
    dispatch({ type: 'START_SYNC' });
    setTimeout(() => dispatch({ type: 'COMPLETE_SYNC' }), 1800);
  };

  return (
    <PortalContext.Provider
      value={{
        state,
        universities,
        selectUniversity,
        startConnection,
        completeConnection,
        resetConnection,
        disconnect,
        sync,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
}

export function usePortal() {
  const ctx = useContext(PortalContext);
  if (!ctx) throw new Error('usePortal must be used within PortalProvider');
  return ctx;
}
