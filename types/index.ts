export type University = {
  id: string;
  name: string;
  shortName: string;
  portalName: string;
  lmsName: string;
  themeColor: string;
  logoInitials: string;
};

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

export type PortalConnection = {
  universityId: string;
  status: ConnectionStatus;
  lastSynced: Date | null;
};

export type Course = {
  id: string;
  name: string;
  instructor: string;
  room: string;
  campus: string;
  format: 'in-person' | 'online' | 'hybrid';
  color: string;
  credits: number;
};

export type TimetableSlot = {
  id: string;
  courseId: string;
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  period: 1 | 2 | 3 | 4 | 5 | 6;
};

export type AssignmentStatus = 'pending' | 'submitted' | 'overdue';

export type Assignment = {
  id: string;
  courseId: string;
  title: string;
  dueDate: Date;
  status: AssignmentStatus;
  description?: string;
};

export type Announcement = {
  id: string;
  courseId?: string;
  title: string;
  content: string;
  date: Date;
  isImportant: boolean;
  source: 'portal' | 'lms';
};

export type SyncStatus = {
  isSyncing: boolean;
  lastSyncTime: Date | null;
  message: string;
};
