// Ads can collect through a JSONP script tag. Resource type alone is not a
// safe reason to forward a request from an isolated browser test.
export function isGoogleLibrary(url: URL): boolean {
  return (
    url.protocol === "https:" &&
    url.hostname === "www.googletagmanager.com" &&
    ["/gtag/js", "/gtag/destination"].includes(url.pathname)
  );
}
