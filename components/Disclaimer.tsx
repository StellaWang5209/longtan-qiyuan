import Link from "next/link";

import { DISCLAIMER_TEXT } from "@/lib/constants";

export function Disclaimer() {
  return (
    <div className="rounded-[1.75rem] border border-white/50 bg-white/55 px-6 py-5 text-[13px] leading-7 text-ink/62 shadow-card backdrop-blur-sm">
      <p>{DISCLAIMER_TEXT}</p>
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-cinnabar/65">
        <Link href="/about">关于项目</Link>
        <Link href="/disclaimer">免责声明</Link>
      </div>
    </div>
  );
}
