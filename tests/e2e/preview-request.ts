import type { BrowserContext } from "@playwright/test";

export async function authorizePreview(context: Pick<BrowserContext, "request" | "cookies">, target: URL, secret: string): Promise<void> {
  if (target.protocol !== "https:" || !/^noblu-beauty-room77(?:-[a-z0-9-]+)?\.vercel\.app$/.test(target.hostname) ||
      target.port || target.username || target.password || target.pathname !== "/" || target.search || target.hash) {
    throw new Error("Authorization requires an exact HTTPS preview URL");
  }
  const response = await previewRequest(() => context.request.get(target.origin, {
    headers: { "x-vercel-protection-bypass": secret, "x-vercel-set-bypass-cookie": "true" },
    maxRedirects: 0,
  }), secret);
  if (response.status() < 200 || response.status() >= 400) {
    throw new Error(`Preview authorization failed (HTTP ${response.status()})`);
  }
  const cookies = await context.cookies(target.origin);
  if (!cookies.some(cookie => cookie.name === "_vercel_jwt" && cookie.domain === target.hostname && cookie.secure && cookie.httpOnly)) {
    throw new Error("Preview authorization did not establish a secure host-only session cookie");
  }
}

export async function previewRequest<T>(request: () => Promise<T>, secret: string): Promise<T> {
  try {
    return await request();
  } catch (error) {
    // Playwright fetch errors include request headers; never retain their cause.
    throw new Error(String(error).replaceAll(secret, "[redacted]"));
  }
}
