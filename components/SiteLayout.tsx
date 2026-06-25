'use client';

import { FileText, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const nav = [
  ['Home', '/'],
  ['About', '/about'],
  ['Services', '/services'],
  ['Projects', '/projects'],
  ['Careers', '/careers'],
  ['Contact', '/contact'],
];

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === href : pathname.startsWith(href);
}

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `text-sm font-semibold transition ${isActive(pathname, href) ? 'text-brass' : 'text-ink hover:text-brass'}`;

  return (
    <div className="min-h-screen bg-[#fbfaf7]">
      <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-14 w-14 place-items-center overflow-hidden rounded bg-white shadow-sm ring-1 ring-stone-200">
              <img className="h-12 w-12 object-contain" src="logojk.png" alt="Jay-Khar Construction logo" />
            </span>
            <span>
              <span className="block font-display text-lg font-extrabold leading-tight text-ink">Jay-Khar</span>
              <span className="block text-xs font-bold uppercase tracking-[0.16em] text-steel">Construction Pvt. Ltd.</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map(([label, href]) => (
              <Link key={href} href={href} className={linkClass(href)}>
                {label}
              </Link>
            ))}
          </nav>
          <Link className="btn-primary hidden px-4 py-2.5 lg:inline-flex" href="/contact">
            <FileText size={16} /> Get a Quote
          </Link>
          <button
            className="grid h-11 w-11 place-items-center rounded border border-stone-200 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {open && (
          <div className="border-t border-stone-200 bg-white px-5 py-4 lg:hidden">
            <div className="flex flex-col gap-4">
              {nav.map(([label, href]) => (
                <Link key={href} href={href} onClick={() => setOpen(false)} className={linkClass(href)}>
                  {label}
                </Link>
              ))}
              <Link className="btn-primary w-full" href="/contact" onClick={() => setOpen(false)}>
                Get a Quote
              </Link>
            </div>
          </div>
        )}
      </header>
      <main>{children}</main>
      <footer className="bg-ink text-white">
        <div className="section grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <h2 className="font-display text-2xl font-extrabold">Jay-Khar Construction</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/72">
              Residential, commercial, and institutional construction with disciplined planning, quality execution, and a professional touch.
            </p>
          </div>
          <div>
            <h3 className="font-bold">Office</h3>
            <p className="mt-4 text-sm leading-7 text-white/72">
              Railway Station Road, Marthandam
              <br />
              Tamil Nadu, India
            </p>
          </div>
          <div>
            <h3 className="font-bold">Contact</h3>
            <p className="mt-4 text-sm leading-7 text-white/72">
              <a className="transition hover:text-white" href="tel:+919443370985">
                9443370985
              </a>
              <br />
              <a className="break-all transition hover:text-white" href="mailto:jay_khar@yahoo.com">
                jay_khar@yahoo.com
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
