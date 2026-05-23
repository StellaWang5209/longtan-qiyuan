"use client";

export const copyText = async (value: string) => {
  if (typeof navigator === "undefined" || !navigator.clipboard) {
    throw new Error("clipboard_unavailable");
  }
  await navigator.clipboard.writeText(value);
};
