import { APP_LOCATION, APP_NAME, BADGE_NAME } from "@/lib/constants";
import { generateBadgeSvg } from "@/lib/generateBadgeSvg";
import { shortChecksum } from "@/lib/hash";
import type { LongtanBadge, LongtanPrayer, RuralIdentity } from "@/lib/types";

const randomPart = () => Math.random().toString(36).slice(2, 8).toUpperCase();

const formatBadgeDate = (date: Date) => {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, "0");
  const d = `${date.getDate()}`.padStart(2, "0");
  return `${y}${m}${d}`;
};

export const generateLongtanBadge = async (input: {
  identity: RuralIdentity;
  prayer: LongtanPrayer;
  visitProof?: string;
}): Promise<LongtanBadge> => {
  const issuedAt = new Date().toISOString();
  const badgeId = `LT-${formatBadgeDate(new Date())}-${randomPart()}`;
  const proofText =
    input.identity.source !== "demo"
      ? `该徽章由乡建DAO身份 @${input.identity.handle ?? input.identity.domainName ?? "用户"} 完成龙潭祈愿后生成。`
      : "恭喜您在龙潭古镇完成了一次难忘的文艺复兴";

  const badgeBase: Omit<LongtanBadge, "badgeSvg" | "checksum"> = {
    badgeId,
    productName: APP_NAME,
    badgeName: BADGE_NAME,
    location: APP_LOCATION,
    holder: {
      id: input.identity.id,
      handle: input.identity.handle,
      source: input.identity.source,
      walletAddress: input.identity.walletAddress
    },
    prayer: {
      prayerId: input.prayer.id,
      mode: input.prayer.mode,
      title: input.prayer.title,
      level: input.prayer.level,
      symbol: input.prayer.symbol
    },
    ...(input.visitProof === "DAO 龙潭现场入口" ? { visitProof: "DAO 龙潭现场入口" as const } : {}),
    issuedAt,
    proofText
  };

  const checksum = await shortChecksum(
    JSON.stringify({
      badgeId,
      holder: badgeBase.holder,
      prayer: badgeBase.prayer,
      visitProof: badgeBase.visitProof,
      issuedAt
    })
  );

  const badge = {
    ...badgeBase,
    badgeSvg: "",
    checksum
  } satisfies LongtanBadge;

  badge.badgeSvg = generateBadgeSvg(badge);
  return badge;
};
