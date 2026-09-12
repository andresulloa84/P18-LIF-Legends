import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/lib/auth';
import TopBar from '@/components/TopBar';
import SideBar from '@/components/SideBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Lycksele Fotboll Legends',
  description: 'Spåra ball mastery för ungdomsfotbollslag',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" className={inter.className}>
      <body className="bg-dark-primary text-white min-h-screen flex">
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
