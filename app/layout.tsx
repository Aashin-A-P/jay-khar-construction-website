import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import { SiteLayout } from '@/components/SiteLayout';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

export const metadata: Metadata = {
  title: 'Jay-Khar Construction Pvt. Ltd.',
  description: 'Residential, commercial, and institutional construction services across South India.',
  icons: {
    icon: '/logojk.png',
    shortcut: '/logojk.png',
    apple: '/logojk.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable} font-sans`}>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}
