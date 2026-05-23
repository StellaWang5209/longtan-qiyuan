import { NextResponse } from "next/server";

import { getSessionIdentity } from "@/lib/auth";

export async function GET() {
  const identity = await getSessionIdentity();
  return NextResponse.json(identity ? { authenticated: true, identity } : { authenticated: false });
}
