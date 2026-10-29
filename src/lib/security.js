/** Reject cross-site browser mutation attempts while remaining compatible with proxies. */
export function sameOrigin(req) {
  const origin = req.headers.get("origin");
  if (!origin) return true; // Server-to-server requests may not send Origin.
  try {
    const requestOrigin = new URL(req.url);
    const supplied = new URL(origin);
    const hosts = new Set(
      [
        requestOrigin.host,
        req.headers.get("host"),
        req.headers.get("x-forwarded-host"),
      ].filter(Boolean),
    );
    return (
      (supplied.protocol === "https:" ||
        requestOrigin.hostname === "localhost") &&
      hosts.has(supplied.host)
    );
  } catch {
    return false;
  }
}
