"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { BadgeCard } from "@/components/BadgeCard";
import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { LogoWordmark } from "@/components/Logo";
import { PosterPreview } from "@/components/PosterPreview";
import { ResultCard } from "@/components/ResultCard";
import { copyText } from "@/lib/copy";
import { downloadPngFromSvg, downloadSvg } from "@/lib/download";
import { generateLongtanBadge } from "@/lib/generateLongtanBadge";
import { getCurrentPrayer, getDemoIdentity, saveMyBadge } from "@/lib/storage";
import type { LongtanBadge, LongtanPrayer, RuralIdentity } from "@/lib/types";

export default function ResultClientPage() {
  const router = useRouter();
  const [prayer, setPrayer] = useState<LongtanPrayer | null>(null);
  const [badge, setBadge] = useState<LongtanBadge | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const currentPrayer = getCurrentPrayer();
    setPrayer(currentPrayer);
  }, []);

  const ensureBadge = async () => {
    if (!prayer) return null;
    if (badge) return badge;

    const identity: RuralIdentity =
      prayer.identity ??
      getDemoIdentity() ?? {
        id: "demo-user",
        handle: "游客",
        role: "游客",
        source: "demo"
      };

    const created = await generateLongtanBadge({
      identity,
      prayer,
      visitProof: identity.visitProof
    });
    saveMyBadge(created);
    setBadge(created);
    return created;
  };

  const handleCopyFortune = async () => {
    if (!prayer) return;
    await copyText(`${prayer.title}\n${prayer.fortune}\n${prayer.explanation}\n今日行动：${prayer.action}`);
    setMessage("签文已复制。");
  };

  const handleDownloadPoster = async () => {
    if (!prayer) return;
    const pngDownloaded = await downloadPngFromSvg(prayer.posterSvg, `longtan-prayer-${prayer.id}.png`, 1080, 1440);
    if (!pngDownloaded) {
      downloadSvg(prayer.posterSvg, `longtan-prayer-${prayer.id}.svg`);
      setMessage("PNG 下载不可用，已改为下载 SVG。");
      return;
    }
    setMessage("祈愿海报已开始下载。");
  };

  const handleGenerateBadge = async () => {
    await ensureBadge();
    setMessage("龙潭祈愿徽章已生成。");
  };

  const handleShareBadge = async () => {
    const created = await ensureBadge();
    if (!created) return;
    router.push("/badge");
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  if (!prayer) {
    return (
      <section className="rounded-[1.75rem] border border-white/60 bg-white/82 p-7 text-center shadow-glow sm:p-8">
        <h1 className="font-serif text-[2rem] leading-[1.25] text-ink sm:text-[2.25rem]">还没有祈愿结果，先去龙潭写下一个愿望吧。</h1>
        <div className="mt-6">
          <Link href="/draw">
            <Button>去祈愿</Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[720px] space-y-5 sm:space-y-6">
      <div className="relative overflow-hidden rounded-[2rem] border border-black/8 bg-[linear-gradient(180deg,rgba(252,251,247,0.96),rgba(245,243,238,0.92))] px-6 py-8 shadow-card sm:px-8 sm:py-10">
        <div className="pointer-events-none absolute inset-0 opacity-90">
          <div className="absolute inset-x-12 top-20 h-px bg-black/6" />
          <div className="absolute inset-x-12 bottom-16 h-px bg-black/5" />
        </div>
        <div className="relative text-center">
          <div className="mx-auto flex w-full flex-col items-center">
            <Logo size="sm" className="relative" />
            <LogoWordmark className="mt-5" subtitle="LONGTAN PRAYER" />
          </div>

          <div className="mx-auto mt-6 max-w-[680px]">
            <h1 className="font-serif text-[1.95rem] leading-[1.6] tracking-[0.03em] text-ink sm:text-[2.15rem]">
              <span className="block">你在龙潭水声与灯火之间</span>
              <span className="mt-1 block">完成了一次属于自己的登场</span>
            </h1>
            <p className="mx-auto mb-1 mt-6 max-w-[36em] text-[16px] leading-[1.9] tracking-[0.02em] text-ink/66 sm:text-[17px]">
              青石板路记下你的心念，溪桥与戏台把它轻轻送回；此刻，这份表达已被龙潭看见，也被温柔记录。
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5">
        <ResultCard prayer={prayer} />
        <PosterPreview svg={prayer.posterSvg} className="self-start" />
      </div>

      <div className="rounded-[1.75rem] border border-white/60 bg-white/82 p-6 shadow-card sm:p-7">
        <div className="grid gap-4 sm:grid-cols-2">
          <Button onClick={handleDownloadPoster} fullWidth>
            下载祈愿海报
          </Button>
          <Button onClick={handleCopyFortune} variant="secondary" fullWidth>
            复制签文
          </Button>
          <Button onClick={handleGenerateBadge} variant="secondary" fullWidth>
            生成龙潭祈愿徽章
          </Button>
          <Button onClick={handleShareBadge} variant="secondary" fullWidth>
            发送徽章给朋友
          </Button>
          <Link href="/draw">
            <Button variant="secondary" className="w-full">
              再次祈愿
            </Button>
          </Link>
          <Button onClick={handleLogout} variant="ghost" fullWidth className="sm:justify-center">
            退出登录
          </Button>
        </div>
        {message ? <p className="mt-5 text-[14px] leading-7 text-cinnabar/88">{message}</p> : null}
      </div>

      {badge ? (
        <div className="grid gap-5">
          <BadgeCard badge={badge} />
          <div className="rounded-[1.75rem] border border-white/60 bg-white/82 p-6 shadow-card sm:p-7">
            <h2 className="font-serif text-[1.95rem] leading-[1.22] text-ink sm:text-[2.1rem]">龙潭祈愿到访徽章</h2>
            <p className="mt-4 max-w-[28em] text-[16px] leading-[1.85] text-ink/70">
              这是一枚非链上数字纪念徽章，用于证明你完成过一次龙潭祈愿体验，不是 NFT，不可交易，不代表权益凭证。
            </p>
            <div className="mt-6">
              <Link href="/badge">
                <Button>查看我的徽章</Button>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
