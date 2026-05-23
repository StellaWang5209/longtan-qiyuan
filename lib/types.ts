export type PrayerMode = "西溪水愿" | "古厝灯火" | "四平戏灵感签" | "红粬暖愿";

export type RuralIdentity = {
  id: string;
  sub?: string;
  handle?: string;
  walletAddress?: string;
  did?: string;
  domainName?: string;
  phone?: string;
  score?: number;
  nodeUser?: boolean;
  role: "乡建参与者" | "游客" | "新村民" | "创作者" | "数字游民";
  source: "xjdao" | "semi" | "demo";
  visitProof?: "DAO 龙潭现场入口";
};

export type OperaInspiration = {
  play: string;
  theme: string;
  quoteInspired: string;
};

export type LongtanPrayer = {
  id: string;
  identity?: RuralIdentity;
  wish: string;
  mode: PrayerMode;
  level: "上上签";
  title: string;
  fortune: string;
  explanation: string;
  action: string;
  localElement: string;
  symbol: string;
  luckyColor: string;
  operaInspiration?: OperaInspiration;
  posterSvg: string;
  createdAt: string;
};

export type LongtanBadge = {
  badgeId: string;
  productName: "龙潭祈愿";
  badgeName: "龙潭祈愿到访徽章";
  location: "屏南熙岭 · 龙潭村";
  holder: {
    id: string;
    handle?: string;
    source: "xjdao" | "semi" | "demo";
    walletAddress?: string;
  };
  prayer: {
    prayerId: string;
    mode: PrayerMode;
    title: string;
    level: "上上签";
    symbol: string;
  };
  visitProof?: "DAO 龙潭现场入口";
  issuedAt: string;
  proofText: string;
  badgeSvg: string;
  checksum: string;
};
