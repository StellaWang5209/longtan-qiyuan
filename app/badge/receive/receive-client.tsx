"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { BadgeCard } from "@/components/BadgeCard";
import { Button } from "@/components/Button";
import { decodePayload } from "@/lib/encoding";
import { downloadPngFromSvg, downloadSvg } from "@/lib/download";
import { saveReceivedBadge } from "@/lib/storage";
import type { LongtanBadge } from "@/lib/types";

type ReceiveBadgeClientPageProps = {
  payload?: string;
};

export default function ReceiveBadgeClientPage({ payload }: ReceiveBadgeClientPageProps) {
  const [message, setMessage] = useState<string | null>(null);

  const badge = useMemo(() => {
    if (!payload) return null;

    try {
      return decodePayload<LongtanBadge>(payload);
    } catch {
      return null;
    }
  }, [payload]);

  if (!badge) {
    return (
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-white/60 bg-white/80 p-8 text-center shadow-glow">
        <h1 className="font-serif text-4xl text-ink">徽章解析失败</h1>
        <p className="mt-4 text-ink/70">分享链接可能已损坏，或 payload 无法解析。</p>
        <div className="mt-6">
          <Link href="/draw">
            <Button>我也去祈愿</Button>
          </Link>
        </div>
      </section>
    );
  }

  const saveBadge = () => {
    saveReceivedBadge(badge);
    setMessage("已收下徽章，并保存到本地。");
  };

  const downloadBadge = async () => {
    const pngDownloaded = await downloadPngFromSvg(badge.badgeSvg, `${badge.badgeId}.png`, 1080, 1080);
    if (!pngDownloaded) {
      downloadSvg(badge.badgeSvg, `${badge.badgeId}.svg`);
      setMessage("PNG 下载不可用，已改为下载 SVG。");
      return;
    }
    setMessage("徽章图片已开始下载。");
  };

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-white/60 bg-white/80 p-8 shadow-glow">
        <h1 className="font-serif text-4xl text-ink">你收到了一枚龙潭祈愿徽章</h1>
        <p className="mt-4 text-ink/70">
          这枚徽章来自一位完成过龙潭祈愿体验的朋友。你也可以来龙潭写下一个愿望，生成属于自己的祈愿签。
        </p>
      </div>
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <BadgeCard badge={badge} />
        <div className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-card">
          <div className="space-y-3 text-sm leading-7 text-ink/75">
            <div>发送者 handle：{badge.holder.handle ? `@${badge.holder.handle}` : "游客"}</div>
            <div>地点：屏南熙岭 · 龙潭村</div>
            <div>祈愿方式：{badge.prayer.mode}</div>
            <div>签名：{badge.prayer.title}</div>
            <div>龙潭意象：{badge.prayer.symbol}</div>
            <div>徽章编号：{badge.badgeId}</div>
            <div>签发时间：{new Date(badge.issuedAt).toLocaleString("zh-CN")}</div>
          </div>
          <div className="mt-6 grid gap-3">
            <Button onClick={saveBadge}>收下徽章</Button>
            <Link href="/draw">
              <Button variant="secondary" className="w-full">
                我也去祈愿
              </Button>
            </Link>
            <Button variant="secondary" onClick={downloadBadge}>
              下载徽章图片
            </Button>
          </div>
          {message ? <p className="mt-4 text-sm text-cinnabar">{message}</p> : null}
        </div>
      </div>
    </section>
  );
}
