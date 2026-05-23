import { APP_LOCATION, FOOTER_NOTE, OPERA_INSPIRATIONS, PRAYER_CONTENT } from "@/lib/constants";
import { generatePosterSvg } from "@/lib/generatePosterSvg";
import type { LongtanPrayer, OperaInspiration, PrayerMode, RuralIdentity } from "@/lib/types";

const pickRandom = <T>(items: readonly T[]) => items[Math.floor(Math.random() * items.length)];

const randomId = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 10)}`;

const resolveLocalElement = (mode: PrayerMode, symbol: string) => {
  if (mode === "西溪水愿") return `龙潭${symbol}与${APP_LOCATION}的溪畔气息`;
  if (mode === "古厝灯火") return `龙潭${symbol}与老屋灯火的安定感`;
  if (mode === "四平戏灵感签") return `龙潭${symbol}与戏台回声的登场感`;
  return `龙潭${symbol}与红粬工艺时间感的沉淀`;
};

const buildOperaExplanation = (opera: OperaInspiration) =>
  `戏文启发来自 ${opera.play}，它指向“${opera.theme}”的母题。今天更重要的不是等一个完美时机，而是把心里的想法先说出来、写下来，给自己一次正式登场。`;

export const summarizeFortune = (fortune: string) =>
  fortune.length > 48 ? `${fortune.slice(0, 48)}……` : fortune;

export const generatePrayerResult = (input: {
  wish: string;
  mode: PrayerMode;
  identity?: RuralIdentity;
}): LongtanPrayer => {
  const pool = PRAYER_CONTENT[input.mode];
  const symbol = pickRandom(pool.symbols);
  const operaInspiration = input.mode === "四平戏灵感签" ? pickRandom(OPERA_INSPIRATIONS) : undefined;
  const createdAt = new Date().toISOString();

  const result: LongtanPrayer = {
    id: randomId("prayer"),
    identity: input.identity,
    wish: input.wish.trim(),
    mode: input.mode,
    level: "上上签",
    title: pickRandom(pool.titles),
    fortune: pickRandom(pool.fortunes),
    explanation:
      input.mode === "四平戏灵感签" && operaInspiration
        ? `${pickRandom(pool.explanations)} ${buildOperaExplanation(operaInspiration)}`
        : pickRandom(pool.explanations),
    action: pickRandom(pool.actions),
    localElement: resolveLocalElement(input.mode, symbol),
    symbol,
    luckyColor: pickRandom(pool.colors),
    ...(operaInspiration ? { operaInspiration } : {}),
    posterSvg: "",
    createdAt
  };

  result.posterSvg = generatePosterSvg(result, {
    subtitle: "随机祈愿 · 民俗体验",
    footerNote: FOOTER_NOTE,
    summary: summarizeFortune(result.fortune)
  });

  return result;
};
