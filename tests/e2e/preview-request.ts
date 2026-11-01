export async function previewRequest<T>(request: () => Promise<T>, secret: string): Promise<T> {
  try {
    return await request();
  } catch (error) {
    // Playwright fetch errors include request headers; never retain their cause.
    throw new Error(String(error).replaceAll(secret, "[redacted]"));
  }
}
