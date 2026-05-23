export const toBase64Url = (value: string) =>
  Buffer.from(value, "utf8").toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");

export const fromBase64Url = (value: string) => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4 || 4)) % 4);
  return Buffer.from(padded, "base64").toString("utf8");
};

export const encodePayload = (value: unknown) => toBase64Url(JSON.stringify(value));

export const decodePayload = <T>(value: string): T => JSON.parse(fromBase64Url(value)) as T;
