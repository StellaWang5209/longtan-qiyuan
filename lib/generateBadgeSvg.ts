import { APP_LOCATION, BADGE_NAME, COLOR_MAP, DAO_EVENT_NAME } from "@/lib/constants";
import type { LongtanBadge } from "@/lib/types";

const esc = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export const generateBadgeSvg = (badge: LongtanBadge) => {
  const holder = badge.holder.handle ? `@${badge.holder.handle}` : "游客";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1080" viewBox="0 0 1080 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="120" y1="100" x2="980" y2="980" gradientUnits="userSpaceOnUse">
      <stop stop-color="${COLOR_MAP.米白}"/>
      <stop offset="1" stop-color="#efe3cd"/>
    </linearGradient>
    <linearGradient id="ring" x1="270" y1="180" x2="810" y2="900" gradientUnits="userSpaceOnUse">
      <stop stop-color="${COLOR_MAP.灯火金}"/>
      <stop offset="1" stop-color="${COLOR_MAP.琥珀金}"/>
    </linearGradient>
  </defs>
  <rect width="1080" height="1080" fill="url(#bg)"/>
  <circle cx="540" cy="540" r="360" fill="none" stroke="url(#ring)" stroke-width="26"/>
  <circle cx="540" cy="540" r="314" fill="none" stroke="${COLOR_MAP.青黛蓝}" stroke-width="6" stroke-dasharray="4 18" opacity="0.35"/>
  <path d="M280 660 C360 520, 420 360, 570 330 C660 312, 760 360, 790 430 C820 500, 760 584, 680 580 C620 578, 582 546, 592 500 C602 460, 656 446, 696 470" stroke="${COLOR_MAP.青黛蓝}" stroke-width="22" fill="none" stroke-linecap="round"/>
  <path d="M266 748 C402 706, 486 730, 590 686 C702 638, 778 646, 848 694" stroke="${COLOR_MAP.雾蓝}" stroke-width="12" fill="none" opacity="0.6"/>
  <path d="M236 786 C392 744, 520 772, 690 726 C772 704, 824 714, 874 746" stroke="${COLOR_MAP.雾蓝}" stroke-width="6" fill="none" opacity="0.55"/>
  <circle cx="760" cy="256" r="88" fill="${COLOR_MAP.朱砂红}" opacity="0.12"/>
  <rect x="706" y="210" width="108" height="108" rx="22" fill="${COLOR_MAP.朱砂红}" opacity="0.14"/>
  <text x="540" y="250" text-anchor="middle" font-size="48" font-family="'Noto Serif SC','Songti SC',serif" fill="${COLOR_MAP.青黛蓝}">龙潭祈愿</text>
  <text x="540" y="308" text-anchor="middle" font-size="44" font-family="'Noto Serif SC','Songti SC',serif" fill="${COLOR_MAP.檀木棕}">${BADGE_NAME}</text>
  <text x="540" y="352" text-anchor="middle" font-size="24" font-family="'Noto Sans SC','PingFang SC',sans-serif" fill="${COLOR_MAP.檀木棕}">${APP_LOCATION}</text>
  <text x="540" y="470" text-anchor="middle" font-size="30" font-family="'Noto Sans SC','PingFang SC',sans-serif" fill="${COLOR_MAP.檀木棕}">持有人 · ${esc(holder)}</text>
  <text x="540" y="520" text-anchor="middle" font-size="30" font-family="'Noto Sans SC','PingFang SC',sans-serif" fill="${COLOR_MAP.檀木棕}">签级 · ${esc(badge.prayer.level)}</text>
  <text x="540" y="570" text-anchor="middle" font-size="30" font-family="'Noto Sans SC','PingFang SC',sans-serif" fill="${COLOR_MAP.檀木棕}">祈愿方式 · ${esc(badge.prayer.mode)}</text>
  <text x="540" y="620" text-anchor="middle" font-size="30" font-family="'Noto Sans SC','PingFang SC',sans-serif" fill="${COLOR_MAP.檀木棕}">龙潭意象 · ${esc(badge.prayer.symbol)}</text>
  <text x="540" y="670" text-anchor="middle" font-size="28" font-family="'Noto Serif SC','Songti SC',serif" fill="${COLOR_MAP.青黛蓝}">${esc(badge.prayer.title)}</text>
  ${badge.visitProof ? `<text x="540" y="722" text-anchor="middle" font-size="24" font-family="'Noto Sans SC','PingFang SC',sans-serif" fill="${COLOR_MAP.朱砂红}">已通过 DAO 龙潭现场入口完成体验</text>` : ""}
  <text x="540" y="812" text-anchor="middle" font-size="22" font-family="'Noto Sans SC','PingFang SC',sans-serif" fill="${COLOR_MAP.檀木棕}">徽章编号 · ${esc(badge.badgeId)}</text>
  <text x="540" y="850" text-anchor="middle" font-size="22" font-family="'Noto Sans SC','PingFang SC',sans-serif" fill="${COLOR_MAP.檀木棕}">签发时间 · ${esc(new Date(badge.issuedAt).toLocaleString("zh-CN"))}</text>
  <text x="540" y="888" text-anchor="middle" font-size="22" font-family="'Noto Sans SC','PingFang SC',sans-serif" fill="${COLOR_MAP.檀木棕}">${DAO_EVENT_NAME}</text>
  <text x="540" y="926" text-anchor="middle" font-size="20" font-family="'Noto Sans SC','PingFang SC',sans-serif" fill="${COLOR_MAP.朱砂红}">${esc(badge.proofText)}</text>
  <text x="540" y="996" text-anchor="middle" font-size="20" font-family="'Noto Sans SC','PingFang SC',sans-serif" fill="${COLOR_MAP.檀木棕}">非链上数字纪念徽章 · 不可交易 · 非 NFT</text>
</svg>`;
};
