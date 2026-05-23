import type { LongtanPrayer } from "@/lib/types";
import { APP_LOCATION, APP_NAME } from "@/lib/constants";

type ResultCardProps = {
  prayer: LongtanPrayer;
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start gap-3 border-b border-ink/8 py-5 sm:gap-4">
    <div className="w-[108px] shrink-0 text-[14px] tracking-[0.02em] text-ink/52">{label}</div>
    <div className="min-w-0 flex-1 whitespace-normal text-[17px] leading-[1.9] tracking-[0.02em] text-ink [line-break:auto] [word-break:normal] [overflow-wrap:normal]">
      {value}
    </div>
  </div>
);

export function ResultCard({ prayer }: ResultCardProps) {
  return (
    <div className="rounded-[1.75rem] border border-white/60 bg-white/82 p-6 shadow-card sm:p-7">
      <div className="space-y-3">
        <div className="text-[15px] tracking-[0.14em] text-cinnabar/72">{APP_NAME}</div>
        <h2 className="block w-full max-w-none whitespace-normal font-serif text-[2rem] leading-[1.18] text-ink [line-break:auto] [word-break:normal] [overflow-wrap:normal] sm:text-[2.25rem]">
          你收到了龙潭的一支上上签
        </h2>
        <p className="block w-full max-w-none whitespace-normal text-[16px] leading-[1.85] tracking-[0.02em] text-ink/72 [line-break:auto] [word-break:normal] [overflow-wrap:normal] sm:text-[17px]">
          愿今日所念，像溪水一样有路；愿脚下之事，像古厝灯火一样慢慢明亮。
        </p>
      </div>
      <div className="mt-7">
        <Row label="产品名" value={APP_NAME} />
        <Row label="地点" value={APP_LOCATION} />
        <Row label="签级" value={prayer.level} />
        <Row label="祈愿方式" value={prayer.mode} />
        <Row label="用户愿望" value={prayer.wish} />
        <Row label="签名" value={prayer.title} />
        <Row label="签文" value={prayer.fortune} />
        <Row label="解签" value={prayer.explanation} />
        <Row label="今日行动" value={prayer.action} />
        <Row label="龙潭意象" value={prayer.symbol} />
        <Row label="幸运颜色" value={prayer.luckyColor} />
        <Row label="生成日期" value={new Date(prayer.createdAt).toLocaleString("zh-CN")} />
        {prayer.operaInspiration ? (
          <>
            <Row label="戏文灵感来源" value={prayer.operaInspiration.play} />
            <Row label="戏文灵感句" value={prayer.operaInspiration.quoteInspired} />
            <Row
              label="戏文启发"
              value={`这句灵感围绕“${prayer.operaInspiration.theme}”展开，提醒你把想表达的内容先说出来，再让回应慢慢靠近。`}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
