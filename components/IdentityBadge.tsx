import type { RuralIdentity } from "@/lib/types";

type IdentityBadgeProps = {
  identity: RuralIdentity | null;
};

export function IdentityBadge({ identity }: IdentityBadgeProps) {
  if (!identity) {
    return <div className="rounded-full bg-white/70 px-4 py-2 text-sm text-ink/70 shadow-card">未登录，将优先使用游客模式。</div>;
  }

  const label =
    identity.source === "demo"
      ? "游客体验模式"
      : `已通过乡建DAO身份进入：@${identity.handle ?? identity.domainName ?? "未命名用户"}`;

  return (
    <div className="inline-flex flex-wrap items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm text-ink shadow-card">
      <span className="font-medium">{label}</span>
      <span className="text-ink/55">身份角色：{identity.role}</span>
      {typeof identity.score === "number" ? <span className="text-ink/55">稻米：{identity.score}</span> : null}
      {identity.visitProof ? <span className="text-cinnabar">{identity.visitProof}</span> : null}
    </div>
  );
}
