import SyncBanner from '@/components/SyncBanner';
import TabBar from '@/components/TabBar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <SyncBanner />
      <main className="max-w-md mx-auto pb-24">{children}</main>
      <TabBar />
    </div>
  );
}
