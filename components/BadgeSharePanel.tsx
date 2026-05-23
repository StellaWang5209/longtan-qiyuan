"use client";

import { useState } from "react";

import { Button } from "@/components/Button";
import { copyText } from "@/lib/copy";
import { downloadPngFromSvg, downloadSvg } from "@/lib/download";
import { encodePayload } from "@/lib/encoding";
import { shareLink } from "@/lib/share";
import type { LongtanBadge } from "@/lib/types";

type BadgeSharePanelProps = {
  badge: LongtanBadge;
};

export function BadgeSharePanel({ badge }: BadgeSharePanelProps) {
  const [message, setMessage] = useState<string | null>(null);

  const url =
    typeof window === "undefined"
      ? ""
      : `${window.location.origin}/badge/receive?payload=${encodeURIComponent(encodePayload(badge))}`;

  const copyLink = async () => {
    try {
      await copyText(url);
      setMessage("徽章链接已复制。");
    } catch {
      setMessage("当前浏览器不支持复制。");
    }
  };

  const send = async () => {
    const shared = await shareLink(
      url,
      "我送你一枚龙潭祈愿徽章",
      "我在屏南熙岭 · 龙潭村完成了一次龙潭祈愿，送你一枚龙潭祈愿徽章。也来写下你的愿望吧。"
    );

    if (!shared) {
      await copyLink();
      setMessage("当前浏览器不支持系统分享，已复制链接。");
    }
  };

  const download = async () => {
    const pngDownloaded = await downloadPngFromSvg(badge.badgeSvg, `${badge.badgeId}.png`, 1080, 1080);
    if (!pngDownloaded) {
      downloadSvg(badge.badgeSvg, `${badge.badgeId}.svg`);
      setMessage("PNG 下载不可用，已改为下载 SVG。");
      return;
    }
    setMessage("徽章图片已开始下载。");
  };

  return (
    <div className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-card">
      <div className="grid gap-3 sm:grid-cols-2">
        <Button onClick={download}>下载徽章图片</Button>
        <Button onClick={copyLink} variant="secondary">
          复制徽章链接
        </Button>
        <Button onClick={send} variant="secondary">
          发送给朋友
        </Button>
      </div>
      <p className="mt-4 text-sm text-ink/65">非链上数字纪念徽章 · 非 NFT · 不可交易</p>
      {message ? <p className="mt-3 text-sm text-cinnabar">{message}</p> : null}
    </div>
  );
}
