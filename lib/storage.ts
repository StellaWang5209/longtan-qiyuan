"use client";

import { STORAGE_KEYS } from "@/lib/constants";
import type { LongtanBadge, LongtanPrayer, RuralIdentity } from "@/lib/types";

const canUseStorage = () => typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const readJson = <T>(key: string, fallback: T): T => {
  if (!canUseStorage()) return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const writeJson = (key: string, value: unknown) => {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const saveDemoIdentity = (identity: RuralIdentity) => writeJson(STORAGE_KEYS.demoIdentity, identity);

export const getDemoIdentity = () => readJson<RuralIdentity | null>(STORAGE_KEYS.demoIdentity, null);

export const clearDemoIdentity = () => {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(STORAGE_KEYS.demoIdentity);
};

export const saveCurrentPrayer = (prayer: LongtanPrayer) => writeJson(STORAGE_KEYS.currentPrayer, prayer);

export const getCurrentPrayer = () => readJson<LongtanPrayer | null>(STORAGE_KEYS.currentPrayer, null);

export const clearCurrentPrayer = () => {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(STORAGE_KEYS.currentPrayer);
};

export const saveMyBadge = (badge: LongtanBadge) => {
  const list = readJson<LongtanBadge[]>(STORAGE_KEYS.myBadges, []);
  const next = [badge, ...list.filter((item) => item.badgeId !== badge.badgeId)];
  writeJson(STORAGE_KEYS.myBadges, next);
};

export const getMyBadges = () => readJson<LongtanBadge[]>(STORAGE_KEYS.myBadges, []);

export const getLatestMyBadge = () => {
  const list = getMyBadges();
  return list[0] ?? null;
};

export const saveReceivedBadge = (badge: LongtanBadge) => {
  const list = readJson<LongtanBadge[]>(STORAGE_KEYS.receivedBadges, []);
  const next = [badge, ...list.filter((item) => item.badgeId !== badge.badgeId)];
  writeJson(STORAGE_KEYS.receivedBadges, next);
};

export const getReceivedBadges = () => readJson<LongtanBadge[]>(STORAGE_KEYS.receivedBadges, []);
