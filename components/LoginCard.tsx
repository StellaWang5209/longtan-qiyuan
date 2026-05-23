"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/Button";
import { Logo } from "@/components/Logo";
import { buildDemoIdentity } from "@/lib/identity";
import { saveDemoIdentity } from "@/lib/storage";

type LoginCardProps = {
  visitProof?: "DAO 龙潭现场入口";
  visitCode?: string;
  errorMessage?: string | null;
};

export function LoginCard({ visitProof, visitCode, errorMessage }: LoginCardProps) {
  const defaultDomainName = "stella.web5.xjdao.net";
  const defaultPassword = "9JphfVw9sm6TPt6";

  const router = useRouter();
  const [error, setError] = useState<string | null>(errorMessage ?? null);
  const [busy, setBusy] = useState<"account" | "demo" | null>(null);
  const [domainName, setDomainName] = useState(defaultDomainName);
  const [password, setPassword] = useState(defaultPassword);

  const goDraw = () => {
    router.push(visitCode ? `/draw?visitCode=${encodeURIComponent(visitCode)}` : "/draw");
  };

  const handleAccountLogin = async () => {
    if (!domainName.trim() || !password.trim()) {
      setError("请填写乡建数字游民身份账号和密码。");
      return;
    }

    setBusy("account");
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          domainName: domainName.trim(),
          password: password.trim(),
          visitCode
        })
      });
      const data = (await response.json()) as { error?: string; message?: string; success?: boolean };
      if (!response.ok || !data.success) {
        throw new Error(data.message ?? data.error ?? "乡建DAO登录暂不可用，请稍后重试。");
      }
      goDraw();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "乡建DAO登录暂不可用，请稍后重试。");
    } finally {
      setBusy(null);
    }
  };

  const handleDemo = () => {
    setBusy("demo");
    const identity = buildDemoIdentity(visitProof);
    saveDemoIdentity(identity);
    goDraw();
  };

  return (
    <section className="mx-auto max-w-3xl rounded-[2rem] border border-white/60 bg-white/75 p-8 shadow-glow backdrop-blur">
      <div className="flex flex-col items-center text-center">
        <Logo size="lg" />
        <h1 className="mt-6 font-serif text-4xl text-ink sm:text-5xl">龙潭祈愿</h1>
        <p className="mt-4 text-lg text-ink/80">用乡建DAO身份，进入龙潭的一次民俗体验。</p>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-ink/75">
          在屏南熙岭乡龙潭村，溪水穿村而过，古厝沿溪而立，四平戏与红粬黄酒延续着地方记忆。登录后，写下一个愿望，生成一支属于你的龙潭签，并获得一枚可以发送给朋友的龙潭祈愿徽章。
        </p>
        {visitProof ? (
          <div className="mt-5 rounded-full bg-cinnabar/10 px-4 py-2 text-sm text-cinnabar">已通过 DAO 龙潭现场入口完成体验</div>
        ) : null}

        <div className="mt-8 w-full max-w-xl rounded-[1.5rem] border border-white/60 bg-white/72 p-5 text-left shadow-card">
          <div className="space-y-4">
            <div>
              <label htmlFor="domainName" className="text-sm text-ink/70">
                乡建数字游民身份账号
              </label>
              <input
                id="domainName"
                value={domainName}
                onChange={(event) => setDomainName(event.target.value)}
                placeholder="例如 stella.web5.xjdao.net"
                className="mt-2 h-12 w-full rounded-[1rem] border border-ink/10 bg-[#fffdf8] px-4 text-sm text-ink outline-none transition placeholder:text-ink/35 focus:border-cinnabar/40"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm text-ink/70">
                密码
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="输入乡建数字游民身份密码"
                className="mt-2 h-12 w-full rounded-[1rem] border border-ink/10 bg-[#fffdf8] px-4 text-sm text-ink outline-none transition placeholder:text-ink/35 focus:border-cinnabar/40"
              />
            </div>
            <Button onClick={handleAccountLogin} disabled={busy !== null} fullWidth>
              {busy === "account" ? "正在登录乡建数字游民身份…" : "乡建数字游民身份登录"}
            </Button>
          </div>
        </div>

        <div className="mt-5 flex w-full max-w-xl flex-col gap-3">
          <Button onClick={handleDemo} disabled={busy !== null} variant="secondary" fullWidth>
            {busy === "demo" ? "正在进入…" : "游客体验模式"}
          </Button>
        </div>
        {error ? <p className="mt-4 text-sm text-cinnabar">{error}</p> : null}
      </div>
    </section>
  );
}
