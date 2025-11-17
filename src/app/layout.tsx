import type { Metadata } from 'next';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://launchpad-journal.local'),
  title: {
    template: '%s | Launchpad Journal',
    default: 'Launchpad Journal',
  },
  description:
    'A Strapi-powered blog that documents product launches, founder notes, and community updates in real time.',
  openGraph: {
    title: 'Launchpad Journal',
    description:
      'A Strapi-powered blog that documents product launches, founder notes, and community updates in real time.',
    url: 'https://launchpad-journal.local',
    siteName: 'Launchpad Journal',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} gradient-ring`}>
        <div className="min-h-screen bg-slate-950/95 backdrop-blur">
          <header className="border-b border-white/5 bg-slate-950/70">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-brand-light">
                  Launchpad Journal
                </p>
                <p className="text-xl font-semibold text-white">Building in public.</p>
              </div>
              <nav className="flex items-center gap-6 text-sm text-slate-300">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
                <Link
                  href="https://strapi.io/"
                  className="hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  Strapi
                </Link>
                <Link
                  href="https://nextjs.org/"
                  className="hover:text-white"
                  target="_blank"
                  rel="noreferrer"
                >
                  Next.js
                </Link>
              </nav>
            </div>
          </header>

          <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>

          <footer className="border-t border-white/5 bg-slate-950/70">
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
              <p>© {new Date().getFullYear()} Launchpad Journal. Crafted for the round 3 challenge.</p>
              <p>
                Backend: Strapi • Frontend: Next.js 16 • Database: SQLite (dev)
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
