import Link from "next/link";

import { Logo } from "@/components/Logo";

const links = [
  { href: "/login", label: "登录" },
  { href: "/draw", label: "祈愿" },
  { href: "/badge", label: "徽章" },
  { href: "/about", label: "关于" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/50 bg-[#f6f0e1]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/login" className="flex items-center gap-3">
          <Logo size="sm" />
          <div>
            <div className="font-serif text-xl text-ink">龙潭祈愿</div>
            <div className="text-xs tracking-[0.24em] text-ink/60">LONGTAN PRAYER</div>
          </div>
        </Link>
        <nav className="flex items-center gap-3 text-sm text-ink/75">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 transition hover:bg-white/70 hover:text-cinnabar"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
