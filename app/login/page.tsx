import { LoginCard } from "@/components/LoginCard";
import { getVisitProof } from "@/lib/identity";

const errorMap: Record<string, string> = {
  xjdao_login_failed: "乡建DAO登录失败，请检查账号信息或验证码参数。",
  xjdao_userinfo_failed: "无法读取乡建DAO用户资料。"
};

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const visitCode = first(params.visitCode);
  const errorCode = first(params.error);
  const visitProof = getVisitProof(visitCode);
  const errorMessage = errorCode ? errorMap[errorCode] ?? "登录暂时不可用，请先使用游客体验模式。" : null;

  return (
    <div className="py-8 sm:py-12">
      <LoginCard visitProof={visitProof} visitCode={visitCode} errorMessage={errorMessage} />
    </div>
  );
}
