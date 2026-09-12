import './globals.css';
import { Inter } from 'next/font/google';
import SideBar from '@/components/SideBar';
import TopBar from '@/components/TopBar';
import { AuthProvider } from '@/lib/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Lycksele Fotboll Legends',
  description: 'Spåra ball mastery för ungdomsfotbollslag',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" className={inter.className}>
      <body className="bg-slate text-white min-h-screen flex">
        <AuthProvider>
          <SideBar />
          <div className="flex-1 flex flex-col">
            <TopBar />
            <main className="flex-1 p-4 overflow-y-auto">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
