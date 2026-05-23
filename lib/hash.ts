const fallbackHash = (input: string) => {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) >>> 0;
  }
  return hash.toString(16);
};

export const shortChecksum = async (input: string) => {
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const data = new TextEncoder().encode(input);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest))
      .slice(0, 6)
      .map((item) => item.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();
  }

  return fallbackHash(input).slice(0, 8).toUpperCase();
};
