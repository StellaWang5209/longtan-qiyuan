"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/Button";
import { IdentityBadge } from "@/components/IdentityBadge";
import { Logo } from "@/components/Logo";
import { PrayerModeCard } from "@/components/PrayerModeCard";
import { LOADING_MESSAGES, PRAYER_MODE_META, PRAYER_MODES } from "@/lib/constants";
import { generatePrayerResult } from "@/lib/generatePrayerResult";
import { saveCurrentPrayer } from "@/lib/storage";
import type { PrayerMode, RuralIdentity } from "@/lib/types";

type PrayerFormProps = {
  identity: RuralIdentity | null;
  visitProof?: RuralIdentity["visitProof"];
};

export function PrayerForm({ identity, visitProof }: PrayerFormProps) {
  const router = useRouter();
  const [wish, setWish] = useState("");
  const [mode, setMode] = useState<PrayerMode | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);

  const resolvedIdentity: RuralIdentity | null = identity ? { ...identity, ...(visitProof ? { visitProof } : {}) } : null;

  const submit = async () => {
    const trimmed = wish.trim();
    if (!trimmed) {
      setError("请先写下一个愿望。");
      return;
    }

    if (trimmed.length > 100) {
      setError("愿望最多 100 字。");
      return;
    }

    if (!mode) {
      setError("请选择一种龙潭在地祈愿方式。");
      return;
    }

    setError(null);
    setLoadingMessage(LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)]);

    await new Promise((resolve) => window.setTimeout(resolve, 700));

    const prayer = generatePrayerResult({
      wish: trimmed,
      mode,
      identity: resolvedIdentity ?? undefined
    });
    saveCurrentPrayer(prayer);
    router.push("/result");
  };

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-6 rounded-[2rem] border border-white/60 bg-white/75 p-8 shadow-glow">
        <div className="flex items-center gap-4">
          <Logo size="md" />
          <div>
            <h1 className="font-serif text-4xl text-ink">写下愿望，开启龙潭祈愿</h1>
            <p className="mt-2 text-ink/75">不用想太多，把此刻心里的念头交给龙潭溪畔的一支签。</p>
          </div>
        </div>
        <IdentityBadge identity={resolvedIdentity} />
      </div>

      <div className="rounded-[2rem] border border-white/60 bg-white/80 p-8 shadow-card">
        <label htmlFor="wish" className="text-sm font-medium text-ink">
          你的愿望
        </label>
        <textarea
          id="wish"
          value={wish}
          onChange={(event) => setWish(event.target.value.slice(0, 100))}
          placeholder="例如：这次来龙潭希望能有新的灵感。"
          className="mt-3 h-36 w-full rounded-[1.5rem] border border-ink/10 bg-[#fffdf8] px-5 py-4 text-base text-ink outline-none ring-0 transition placeholder:text-ink/35 focus:border-cinnabar/40"
        />
        <div className="mt-3 text-right text-sm text-ink/50">{wish.length} / 100</div>
      </div>

      <div>
        <h2 className="mb-4 font-serif text-2xl text-ink">选择一种龙潭在地祈愿方式</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {PRAYER_MODES.map((item) => (
            <PrayerModeCard
              key={item}
              mode={item}
              title={item}
              description={PRAYER_MODE_META[item].description}
              fits={PRAYER_MODE_META[item].fits}
              elements={PRAYER_MODE_META[item].elements}
              selected={mode === item}
              onClick={() => setMode(item)}
            />
          ))}
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/60 bg-white/75 p-8 shadow-card">
        <Button onClick={submit} fullWidth>
          生成我的龙潭祈愿
        </Button>
        <p className="mt-4 text-center text-sm text-ink/60">
          结果会随机生成签级、签文、意象、颜色与海报风格。
        </p>
        {loadingMessage ? <p className="mt-4 text-center text-sm text-cinnabar">{loadingMessage}</p> : null}
        {error ? <p className="mt-4 text-center text-sm text-cinnabar">{error}</p> : null}
      </div>
    </section>
  );
}
