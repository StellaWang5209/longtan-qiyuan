import { NextResponse } from "next/server";

import { clearSessionCookie, setSessionCookie } from "@/lib/auth";
import { getVisitProof } from "@/lib/identity";
import type { RuralIdentity } from "@/lib/types";

type LoginRequestBody = {
  password?: string;
  domainName?: string;
  visitCode?: string;
};

const DEFAULT_XJDAO_DOMAIN_NAME = "stella.web5.xjdao.net";
const DEFAULT_XJDAO_PASSWORD = "9JphfVw9sm6TPt6";
const DEFAULT_XJDAO_DID = "did:plc:z3h3jcjdkbafxin3gjhbi6ep";
const DEFAULT_XJDAO_SCENE_ID = "14nzch7b";
const DEFAULT_XJDAO_CAPTCHA_VERIFY_PARAM =
  "eyJjZXJ0aWZ5SWQiOiJGUkd3M1RGZjJoIiwic2NlbmVJZCI6IjE0bnpjaDdiIiwiaXNTaWduIjp0cnVlLCJzZWN1cml0eVRva2VuIjoiNm9PbzdlNzJuQTYxdVZMaVpWS2lMWUxyQTU0WEwrcXdVV2hlZ0p1ejdNNGUza3BmQnR5QjlZZkpvS3gyM1crQWhuM3pwYzNRZEViWTlMNjFsc3o4dWFCUFVvWkl3bGh3elRERG0xenNRMTM1Nk5HWnh0WVZucEdQUVUrT1RtSXYifQ==";

const pickHandle = (domainName?: string, nickName?: string) => {
  if (nickName?.trim()) return nickName.trim();
  if (!domainName) return undefined;
  return domainName.replace(/\.web5\.xjdao\.net$/i, "");
};

export async function POST(request: Request) {
  const body = (await request.json()) as LoginRequestBody;
  const visitProof = getVisitProof(body.visitCode);
  const apiBase = process.env.XJDAO_API_BASE_URL ?? "https://xjdao.net/api/v1";
  const domainName = body.domainName?.trim() || DEFAULT_XJDAO_DOMAIN_NAME;
  const password = body.password?.trim() || DEFAULT_XJDAO_PASSWORD;

  const loginResponse = await fetch(`${apiBase}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*"
    },
    body: JSON.stringify({
      phone: "",
      email: "",
      password,
      domainName,
      loginType: 1,
      phoneRegion: "86",
      sceneId: DEFAULT_XJDAO_SCENE_ID,
      captchaVerifyParam: DEFAULT_XJDAO_CAPTCHA_VERIFY_PARAM
    }),
    cache: "no-store"
  });

  const loginData = (await loginResponse.json()) as {
    success?: boolean;
    message?: string;
    data?: { token?: string };
  };

  if (!loginResponse.ok || !loginData.success || !loginData.data?.token) {
    return NextResponse.json(
      {
        error: "xjdao_login_failed",
        message: loginData.message || "乡建DAO登录失败，请检查账号和密码。"
      },
      { status: 400 }
    );
  }

  const accessToken = loginData.data.token.trim();
  const normalizedToken = accessToken.startsWith("Bearer ") ? accessToken : `Bearer ${accessToken}`;
  const userInfoResponse = await fetch(`${apiBase}/user/login-user-detail`, {
    method: "POST",
    headers: {
      Authorization: normalizedToken,
      Accept: "application/json, text/plain, */*"
    },
    cache: "no-store"
  });

  const userInfoData = (await userInfoResponse.json()) as {
    success?: boolean;
    message?: string;
    data?: {
      id?: string;
      email?: string;
      phone?: string;
      phoneRegion?: string;
      nickName?: string;
      domainName?: string;
      did?: string;
      score?: number;
      nodeUser?: boolean;
      disable?: boolean;
    };
  };

  if (!userInfoResponse.ok || !userInfoData.success || !userInfoData.data?.id) {
    return NextResponse.json(
      {
        error: "xjdao_userinfo_failed",
        message: userInfoData.message || "无法读取乡建DAO用户资料。"
      },
      { status: 400 }
    );
  }

  const user = userInfoData.data;
  const userId = user.id as string;
  const identity: RuralIdentity = {
    id: userId,
    sub: userId,
    handle: pickHandle(user.domainName, user.nickName),
    did: user.did ?? DEFAULT_XJDAO_DID,
    domainName: user.domainName ?? DEFAULT_XJDAO_DOMAIN_NAME,
    phone: user.phone,
    score: user.score,
    nodeUser: user.nodeUser,
    role: "乡建参与者",
    source: "xjdao",
    ...(visitProof ? { visitProof } : {})
  };

  await clearSessionCookie();
  await setSessionCookie(identity);

  return NextResponse.json({ success: true, identity });
}
