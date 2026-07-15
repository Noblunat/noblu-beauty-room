const gonePaths = new Set([
  "/Shaushka-Cosmetics/pr/32",
  "/BEAUUGREEN-Ujedrniajaca-maska-w-plachcie-z-kolagenem-p187",
  "/Farmstay-Plyn-do-demakijazu-z-kolagenem-p206",
  "/Opcja-Natura-Eliksir-mlodosci-p309",
  "/Makijaz-c21/sort/producer",
]);

export function proxy(request: Request) {
  const { pathname } = new URL(request.url);

  if (!gonePaths.has(pathname)) {
    return;
  }

  return new Response("Gone", {
    status: 410,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "x-robots-tag": "noindex",
    },
  });
}

export const config = {
  matcher: [
    "/Shaushka-Cosmetics/pr/32",
    "/BEAUUGREEN-Ujedrniajaca-maska-w-plachcie-z-kolagenem-p187",
    "/Farmstay-Plyn-do-demakijazu-z-kolagenem-p206",
    "/Opcja-Natura-Eliksir-mlodosci-p309",
    "/Makijaz-c21/sort/producer",
  ],
};
