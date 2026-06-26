import type { Metadata } from 'next';
import './globals.css';
import { PortalProvider } from '@/store/portalStore';

export const metadata: Metadata = {
  title: 'UniPortal',
  description: '大学ポータル連携アプリ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <PortalProvider>{children}</PortalProvider>
      </body>
    </html>
  );
}
