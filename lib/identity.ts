import type { RuralIdentity } from "@/lib/types";

export const getVisitProof = (visitCode?: string | null): RuralIdentity["visitProof"] =>
  visitCode === "longtan-dao" ? "DAO 龙潭现场入口" : undefined;

export const buildDemoIdentity = (visitProof?: RuralIdentity["visitProof"]): RuralIdentity => ({
  id: "demo-user",
  handle: "游客",
  role: "游客",
  source: "demo",
  ...(visitProof ? { visitProof } : {})
});
