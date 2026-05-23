import { cookies } from "next/headers";

import { SESSION_COOKIE } from "@/lib/constants";
import type { RuralIdentity } from "@/lib/types";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export const serializeSession = (identity: RuralIdentity) => JSON.stringify(identity);

export const parseSession = (value?: string | null) => {
  if (!value) return null;

  try {
    return JSON.parse(value) as RuralIdentity;
  } catch {
    return null;
  }
};

export const getSessionIdentity = async () => {
  const store = await cookies();
  return parseSession(store.get(SESSION_COOKIE)?.value);
};

export const setSessionCookie = async (identity: RuralIdentity) => {
  const store = await cookies();
  store.set(SESSION_COOKIE, serializeSession(identity), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: COOKIE_MAX_AGE
  });
};

export const clearSessionCookie = async () => {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
};
