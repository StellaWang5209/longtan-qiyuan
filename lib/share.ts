"use client";

export const shareLink = async (url: string, title: string, text: string) => {
  if (typeof navigator !== "undefined" && navigator.share) {
    await navigator.share({ url, title, text });
    return true;
  }

  return false;
};
