import { APP_LOCATION, APP_NAME, COLOR_MAP } from "@/lib/constants";
import type { LongtanPrayer, PrayerMode } from "@/lib/types";

const esc = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const wrapText = (text: string, maxChars: number) => {
  const lines: string[] = [];
  let cursor = "";

  for (const char of text) {
    cursor += char;
    if (cursor.length >= maxChars) {
      lines.push(cursor);
      cursor = "";
    }
  }

  if (cursor) lines.push(cursor);
  return lines;
};

const estimateCharsForWidth = (width: number, fontSize: number, letterSpacingEm = 0) => {
  const charWidth = fontSize * (1 + letterSpacingEm);
  return Math.max(1, Math.floor(width / charWidth));
};

const limitLines = (lines: string[], maxLines: number) => {
  if (lines.length <= maxLines) return lines;

  const trimmed = lines.slice(0, maxLines);
  const lastLine = trimmed[maxLines - 1] ?? "";
  trimmed[maxLines - 1] = `${lastLine.slice(0, Math.max(0, lastLine.length - 1))}…`;
  return trimmed;
};

const renderTextLines = (
  lines: string[],
  options: {
    x: number;
    startY: number;
    step: number;
    fontSize: number;
    fontFamily: string;
    fill: string;
    letterSpacing?: string;
  }
) =>
  lines
    .map(
      (line, index) =>
        `<text x="${options.x}" y="${options.startY + index * options.step}" font-size="${options.fontSize}" font-family="${options.fontFamily}" fill="${options.fill}"${options.letterSpacing ? ` letter-spacing="${options.letterSpacing}"` : ""}>${esc(line)}</text>`
    )
    .join("");

const paletteByMode: Record<
  PrayerMode,
  { bg: string; bg2: string; accent: string; accent2: string; line: string; glow: string }
> = {
  西溪水愿: {
    bg: COLOR_MAP.青黛蓝,
    bg2: COLOR_MAP.雾蓝,
    accent: COLOR_MAP.水纹青,
    accent2: COLOR_MAP.灯火金,
    line: "#d7ebe8",
    glow: "#f0d8a0"
  },
  古厝灯火: {
    bg: COLOR_MAP.米白,
    bg2: COLOR_MAP.古厝土黄,
    accent: COLOR_MAP.檀木棕,
    accent2: COLOR_MAP.灯火金,
    line: "#8b6f4b",
    glow: "#d9ba7f"
  },
  四平戏灵感签: {
    bg: COLOR_MAP.戏台红,
    bg2: COLOR_MAP.青黛蓝,
    accent: COLOR_MAP.朱砂红,
    accent2: COLOR_MAP.灯火金,
    line: "#f4e8ce",
    glow: "#ffd585"
  },
  红粬暖愿: {
    bg: COLOR_MAP.黄酒暖橙,
    bg2: COLOR_MAP.米白,
    accent: COLOR_MAP.朱砂红,
    accent2: COLOR_MAP.琥珀金,
    line: "#70452e",
    glow: "#f2d099"
  }
};

const patternByMode = (mode: PrayerMode, palette: (typeof paletteByMode)[PrayerMode]) => {
  if (mode === "西溪水愿") {
    return `
      <path d="M120 1010 C260 940, 360 980, 520 920 S800 820, 940 860" stroke="${palette.line}" stroke-width="10" fill="none" opacity="0.5"/>
      <path d="M140 1070 C300 1000, 420 1020, 620 960 S850 900, 980 930" stroke="${palette.line}" stroke-width="6" fill="none" opacity="0.35"/>
      <path d="M180 220 C260 170, 360 150, 500 210 S760 290, 860 240" stroke="${palette.glow}" stroke-width="4" fill="none" opacity="0.4"/>
      <path d="M160 480 Q260 360, 430 410 T740 380 T950 460" stroke="${palette.line}" stroke-width="16" fill="none" opacity="0.18"/>
      <circle cx="770" cy="260" r="90" fill="${palette.accent2}" opacity="0.12"/>
    `;
  }

  if (mode === "古厝灯火") {
    return `
      <path d="M140 970 L280 850 L420 970 Z" fill="${palette.accent}" opacity="0.18"/>
      <path d="M360 980 L540 800 L720 980 Z" fill="${palette.accent}" opacity="0.14"/>
      <path d="M610 1010 L800 860 L980 1010 Z" fill="${palette.accent}" opacity="0.2"/>
      <rect x="210" y="880" width="60" height="80" rx="6" fill="${palette.accent2}" opacity="0.22"/>
      <rect x="450" y="840" width="64" height="88" rx="6" fill="${palette.accent2}" opacity="0.18"/>
      <rect x="720" y="900" width="58" height="82" rx="6" fill="${palette.accent2}" opacity="0.2"/>
      <path d="M120 310 H960" stroke="${palette.accent}" stroke-width="3" stroke-dasharray="10 14" opacity="0.3"/>
    `;
  }

  if (mode === "四平戏灵感签") {
    return `
      <path d="M110 110 C180 260, 220 380, 230 540" stroke="${palette.accent2}" stroke-width="34" fill="none" opacity="0.11"/>
      <path d="M970 110 C900 260, 860 380, 850 540" stroke="${palette.accent2}" stroke-width="34" fill="none" opacity="0.11"/>
      <circle cx="540" cy="300" r="132" fill="none" stroke="${palette.line}" stroke-width="8" opacity="0.14"/>
      <circle cx="540" cy="300" r="88" fill="none" stroke="${palette.line}" stroke-width="4" opacity="0.16"/>
      <path d="M360 830 C450 770, 500 650, 610 690 C710 730, 740 860, 840 820" stroke="${palette.line}" stroke-width="12" fill="none" opacity="0.16"/>
    `;
  }

  return `
    <ellipse cx="540" cy="260" rx="240" ry="120" fill="${palette.accent2}" opacity="0.14"/>
    <path d="M220 900 C280 760, 440 710, 540 780 C640 850, 780 840, 860 720" stroke="${palette.line}" stroke-width="14" fill="none" opacity="0.18"/>
    <circle cx="280" cy="980" r="18" fill="${palette.accent}" opacity="0.28"/>
    <circle cx="350" cy="930" r="12" fill="${palette.accent}" opacity="0.22"/>
    <circle cx="770" cy="980" r="16" fill="${palette.accent}" opacity="0.26"/>
    <path d="M380 1020 C420 950, 470 900, 540 900 C610 900, 660 950, 700 1020" stroke="${palette.accent}" stroke-width="8" fill="none" opacity="0.25"/>
  `;
};

export const generatePosterSvg = (
  result: LongtanPrayer,
  meta: { subtitle: string; footerNote: string; summary: string }
) => {
  const palette = paletteByMode[result.mode];
  const createdDate = new Date(result.createdAt).toLocaleDateString("zh-CN");
  const contentX = 118;
  const contentWidth = 844;
  const cardInset = 20;
  const textWidth = contentWidth - cardInset * 2;
  const summaryFontSize = 29;
  const summaryLineStep = 50;
  const actionFontSize = 28;
  const actionLineStep = 48;
  const textLetterSpacing = 0.02;
  const wishLines = limitLines(wrapText(`愿望 · ${result.wish}`, estimateCharsForWidth(textWidth, 30, textLetterSpacing)), 3);
  const fortuneLines = limitLines(wrapText(meta.summary, estimateCharsForWidth(textWidth, summaryFontSize, textLetterSpacing)), 4);
  const actionLines = limitLines(wrapText(result.action, estimateCharsForWidth(textWidth, actionFontSize, textLetterSpacing)), 3);
  const operaLines = result.operaInspiration
    ? limitLines(wrapText(`戏文灵感句 · ${result.operaInspiration.quoteInspired}`, estimateCharsForWidth(textWidth, 22, textLetterSpacing)), 2)
    : [];
  const wishCardY = 496;
  const wishCardHeight = 74 + wishLines.length * 40;
  const summaryCardY = wishCardY + wishCardHeight + 18;
  const summaryCardHeight =
    92 +
    fortuneLines.length * summaryLineStep +
    (operaLines.length > 0 ? 28 + operaLines.length * 38 : 0);
  const infoCardY = summaryCardY + summaryCardHeight + 18;
  const infoCardWidth = contentWidth;
  const actionCardHeight = Math.max(160, 84 + actionLines.length * actionLineStep);
  const symbolCardY = infoCardY + actionCardHeight + 18;
  const symbolCardHeight = 180;
  const footerY = symbolCardY + symbolCardHeight + 92;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1440" viewBox="0 0 1080 1440" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="80" y1="40" x2="980" y2="1380" gradientUnits="userSpaceOnUse">
      <stop stop-color="${palette.bg}"/>
      <stop offset="1" stop-color="${palette.bg2}"/>
    </linearGradient>
    <radialGradient id="paper" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(540 660) rotate(90) scale(880 640)">
      <stop stop-color="#FFFDF8" stop-opacity="0.96"/>
      <stop offset="1" stop-color="#F6EFDF" stop-opacity="0.86"/>
    </radialGradient>
  </defs>
  <rect width="1080" height="1440" fill="url(#bg)"/>
  <rect x="54" y="54" width="972" height="1332" rx="42" fill="url(#paper)" opacity="0.95"/>
  ${patternByMode(result.mode, palette)}
  <circle cx="540" cy="138" r="54" fill="${palette.accent2}" opacity="0.08"/>
  <text x="540" y="136" text-anchor="middle" font-size="46" font-family="'Noto Serif SC','Songti SC',serif" fill="${palette.accent}">龙潭祈愿</text>
  <text x="540" y="178" text-anchor="middle" font-size="22" font-family="'Noto Sans SC','PingFang SC',sans-serif" fill="${palette.accent}" opacity="0.82">${APP_LOCATION}</text>
  <text x="540" y="214" text-anchor="middle" font-size="18" font-family="'Noto Sans SC','PingFang SC',sans-serif" fill="${palette.accent2}" opacity="0.82">${esc(meta.subtitle)}</text>
  <rect x="444" y="248" width="192" height="56" rx="28" fill="${palette.accent2}" opacity="0.94"/>
  <text x="540" y="286" text-anchor="middle" font-size="28" font-family="'Noto Serif SC','Songti SC',serif" fill="#fffdf8">${esc(result.level)}</text>
  <text x="540" y="354" text-anchor="middle" font-size="20" font-family="'Noto Sans SC','PingFang SC',sans-serif" fill="${palette.accent}" opacity="0.8">${APP_NAME}</text>
  <text x="540" y="414" text-anchor="middle" font-size="50" font-family="'Noto Serif SC','Songti SC',serif" fill="${palette.accent}">${esc(result.title)}</text>
  <text x="540" y="456" text-anchor="middle" font-size="24" font-family="'Noto Sans SC','PingFang SC',sans-serif" fill="${palette.accent2}" opacity="0.88">祈愿方式 · ${esc(result.mode)}</text>
  <rect x="${contentX}" y="${wishCardY}" width="${contentWidth}" height="${wishCardHeight}" rx="28" fill="#fffdf8" opacity="0.76"/>
  <text x="${contentX + cardInset}" y="${wishCardY + 42}" font-size="22" font-family="'Noto Sans SC','PingFang SC',sans-serif" fill="${palette.accent2}">你的愿望</text>
  ${renderTextLines(wishLines, {
    x: contentX + cardInset,
    startY: wishCardY + 96,
    step: 40,
    fontSize: 30,
    fontFamily: "'Noto Sans SC','PingFang SC',sans-serif",
    fill: palette.accent,
    letterSpacing: "0.02em"
  })}
  <rect x="${contentX}" y="${summaryCardY}" width="${contentWidth}" height="${summaryCardHeight}" rx="28" fill="#fffdf8" opacity="0.76"/>
  <text x="${contentX + cardInset}" y="${summaryCardY + 42}" font-size="22" font-family="'Noto Sans SC','PingFang SC',sans-serif" fill="${palette.accent2}">签文摘要</text>
  ${renderTextLines(fortuneLines, {
    x: contentX + cardInset,
    startY: summaryCardY + 98,
    step: summaryLineStep,
    fontSize: summaryFontSize,
    fontFamily: "'Noto Sans SC','PingFang SC',sans-serif",
    fill: palette.accent,
    letterSpacing: "0.02em"
  })}
  ${
    result.operaInspiration
      ? `<text x="${contentX + cardInset}" y="${summaryCardY + 98 + fortuneLines.length * summaryLineStep + 12}" font-size="20" font-family="'Noto Sans SC','PingFang SC',sans-serif" fill="${palette.accent2}">戏文灵感句</text>
  ${renderTextLines(operaLines, {
    x: contentX + cardInset,
    startY: summaryCardY + 98 + fortuneLines.length * summaryLineStep + 48,
    step: 38,
    fontSize: 22,
    fontFamily: "'Noto Sans SC','PingFang SC',sans-serif",
    fill: palette.accent,
    letterSpacing: "0.02em"
  })}`
      : ""
  }
  <rect x="${contentX}" y="${infoCardY}" width="${infoCardWidth}" height="${actionCardHeight}" rx="28" fill="#fffdf8" opacity="0.76"/>
  <text x="${contentX + cardInset}" y="${infoCardY + 42}" font-size="22" font-family="'Noto Sans SC','PingFang SC',sans-serif" fill="${palette.accent2}">今日行动</text>
  ${renderTextLines(actionLines, {
    x: contentX + cardInset,
    startY: infoCardY + 94,
    step: actionLineStep,
    fontSize: actionFontSize,
    fontFamily: "'Noto Sans SC','PingFang SC',sans-serif",
    fill: palette.accent,
    letterSpacing: "0.02em"
  })}
  <rect x="${contentX}" y="${symbolCardY}" width="${infoCardWidth}" height="${symbolCardHeight}" rx="28" fill="#fffdf8" opacity="0.76"/>
  <text x="${contentX + cardInset}" y="${symbolCardY + 42}" font-size="22" font-family="'Noto Sans SC','PingFang SC',sans-serif" fill="${palette.accent2}">龙潭意象</text>
  <text x="${contentX + cardInset}" y="${symbolCardY + 94}" font-size="32" font-family="'Noto Serif SC','Songti SC',serif" fill="${palette.accent}">${esc(result.symbol)}</text>
  <text x="${contentX + cardInset}" y="${symbolCardY + 138}" font-size="22" font-family="'Noto Sans SC','PingFang SC',sans-serif" fill="${palette.accent2}">幸运颜色 · ${esc(result.luckyColor)}</text>
  <text x="${contentX + cardInset}" y="${symbolCardY + 176}" font-size="22" font-family="'Noto Sans SC','PingFang SC',sans-serif" fill="${palette.accent}" opacity="0.86">生成日期 · ${esc(createdDate)}</text>
  <text x="540" y="${footerY}" text-anchor="middle" font-size="18" font-family="'Noto Sans SC','PingFang SC',sans-serif" fill="${palette.accent2}" opacity="0.7">${esc(meta.footerNote)}</text>
</svg>`;
};
