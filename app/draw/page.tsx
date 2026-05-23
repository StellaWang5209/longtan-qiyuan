import { PrayerForm } from "@/components/PrayerForm";
import { getSessionIdentity } from "@/lib/auth";
import { getVisitProof } from "@/lib/identity";

type DrawPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

export default async function DrawPage({ searchParams }: DrawPageProps) {
  const identity = await getSessionIdentity();
  const params = await searchParams;
  const visitProof = getVisitProof(first(params.visitCode));

  return <PrayerForm identity={identity} visitProof={visitProof} />;
}
