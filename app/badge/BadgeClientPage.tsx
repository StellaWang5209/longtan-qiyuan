"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { BadgeCard } from "@/components/BadgeCard";
import { BadgeSharePanel } from "@/components/BadgeSharePanel";
import { Button } from "@/components/Button";
import { getLatestMyBadge } from "@/lib/storage";
import type { LongtanBadge } from "@/lib/types";

export default function BadgeClientPage() {
  const [badge, setBadge] = useState<LongtanBadge | null>(null);

  useEffect(() => {
    setBadge(getLatestMyBadge());
  }, []);

  if (!badge) {
    return (
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-white/60 bg-white/80 p-8 text-center shadow-glow">
        <h1 className="font-serif text-4xl text-ink">我的龙潭祈愿徽章</h1>
        <p className="mt-4 text-ink/70">还没有徽章。完成一次龙潭祈愿后，就会获得一枚到访徽章。</p>
        <div className="mt-6">
          <Link href="/draw">
            <Button>去生成龙潭祈愿</Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-white/60 bg-white/80 p-8 shadow-glow">
        <h1 className="font-serif text-4xl text-ink">我的龙潭祈愿徽章</h1>
        <p className="mt-4 text-ink/70">
          这枚徽章证明你完成过一次龙潭祈愿体验，也可以发送给朋友，邀请对方来龙潭写下自己的愿望。
        </p>
      </div>
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <BadgeCard badge={badge} />
        <div className="space-y-6">
          <BadgeSharePanel badge={badge} />
          <div className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-card">
            <Link href="/badge/receive">
              <Button variant="secondary">查看收到的徽章</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
