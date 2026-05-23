"use client";

import { PosterPreview } from "@/components/PosterPreview";
import type { LongtanBadge } from "@/lib/types";

type BadgeCardProps = {
  badge: LongtanBadge;
};

export function BadgeCard({ badge }: BadgeCardProps) {
  return (
    <div className="rounded-[1.75rem] border border-white/60 bg-white/82 p-6 shadow-card sm:p-7">
      <PosterPreview svg={badge.badgeSvg} title="龙潭祈愿徽章" />
      <div className="mt-6 grid gap-3 text-sm text-ink/75">
        <div>持有人：{badge.holder.handle ? `@${badge.holder.handle}` : "游客"}</div>
        <div>祈愿方式：{badge.prayer.mode}</div>
        <div>签名：{badge.prayer.title}</div>
        <div>龙潭意象：{badge.prayer.symbol}</div>
        <div>徽章编号：{badge.badgeId}</div>
        <div>签发时间：{new Date(badge.issuedAt).toLocaleString("zh-CN")}</div>
        <div>校验码：{badge.checksum}</div>
      </div>
    </div>
  );
}
