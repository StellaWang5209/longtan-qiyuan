import type { PrayerMode } from "@/lib/types";

type PrayerModeCardProps = {
  mode: PrayerMode;
  title: string;
  description: string;
  fits: string;
  elements: string;
  selected: boolean;
  onClick: () => void;
};

export function PrayerModeCard({
  mode,
  title,
  description,
  fits,
  elements,
  selected,
  onClick
}: PrayerModeCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[1.75rem] border p-5 text-left transition ${
        selected
          ? "border-cinnabar bg-[#fff7ef] shadow-glow"
          : "border-white/60 bg-white/75 shadow-card hover:border-gold/50 hover:bg-white"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-serif text-2xl text-ink">{title}</h3>
        <span className="rounded-full bg-ink/5 px-3 py-1 text-xs tracking-[0.18em] text-ink/60">{mode}</span>
      </div>
      <p className="mt-4 text-sm leading-7 text-ink/75">{description}</p>
      <p className="mt-4 text-sm text-cinnabar">适合：{fits}</p>
      <p className="mt-2 text-sm text-ink/65">代表元素：{elements}</p>
    </button>
  );
}
