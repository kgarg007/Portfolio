import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Krishna Garg — Full Stack Developer & Data Analyst',
  description:
    'Portfolio & engineering case studies of Krishna Garg, Full Stack Developer and Computer Science student at MSIT (GGSIPU).',
  keywords: ['Krishna Garg', 'Full Stack Developer', 'React', 'Next.js', 'Data Analyst', 'GGSIPU', 'MSIT'],
  authors: [{ name: 'Krishna Garg' }],
  creator: 'Krishna Garg',
  openGraph: {
    title: 'Krishna Garg — Full Stack Developer & Data Analyst',
    description:
      'Portfolio & engineering case studies of Krishna Garg, Full Stack Developer and Computer Science student at MSIT (GGSIPU).',
    type: 'website',
    url: 'https://krishnagarg.dev',
    siteName: 'Krishna Garg Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Krishna Garg — Full Stack Developer & Data Analyst',
    description:
      'Portfolio & engineering case studies of Krishna Garg, Full Stack Developer and Computer Science student at MSIT (GGSIPU).',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark scroll-smooth`}
    >
      <body className="min-h-full bg-zinc-950 text-zinc-100 flex flex-col">{children}</body>
    </html>
  );
}
