import ReceiveBadgeClientPage from "./receive-client";

type ReceiveBadgePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

export default async function ReceiveBadgePage({ searchParams }: ReceiveBadgePageProps) {
  const params = await searchParams;
  return <ReceiveBadgeClientPage payload={first(params.payload)} />;
}
