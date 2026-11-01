const reviews = [
  {
    name: "Anna",
    text: "Serdecznie polecam Panią Natalię! Paznokcie za każdym razem są wykonane niezwykle starannie, dokładnie i profesjonalnie. Zawsze wychodzę bardzo zadowolona, bo efekt jest po prostu piękny. Widać ogromne zaangażowanie, precyzję i dbałość o każdy szczegół. Zdecydowanie osoba, do której chce się wracać!",
  },
  {
    name: "Grażyna",
    text: "Paznokcie perfekcyjnie wykonane, dokładnie takie jak chciałam. Pani Natalia robi sprawnie i delikatnie. Jestem stałą klientką i nie mam zamiaru zmieniać tego stanu rzeczy.",
  },
  {
    name: "Klaudia",
    text: "Piękny salon, sterylnie i mega miło. Stylizacja - super wykonanie!",
  },
  {
    name: "Anita",
    text: "Bardzo polecam salon, korzystam już od paru lat. Miła atmosfera i usługi na jak najwyższym poziomie.",
  },
  {
    name: "Luśka",
    text: "Jestem bardzo zadowolona. Perfekcja, delikatność, profesjonalizm.",
  },
  {
    name: "Anna",
    text: "Polecam gorąco! Mega starannie wykonane paznokcie za każdym razem. Piękny salon i super atmosfera.",
  },
];

export default function HomeReviews() {
  return (
    <section id="opinie-klientek" className="relative scroll-mt-28 py-28 overflow-hidden bg-transparent text-[#1D1D1B]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <div className="text-sm uppercase tracking-[0.3em] text-[#7C6238] mb-4">
            Opinie klientek
          </div>

          <h2 className="text-4xl lg:text-6xl font-light leading-tight">
            Kobiety wracają dla jakości i atmosfery{" "}
            <span className="block text-[#7C6238]">
              potwierdzają to opinie klientek
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={`${review.name}-${index}`}
              className="rounded-[2rem] border border-[#E8DED2] bg-white/70 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-8"
            >
              <div aria-hidden="true" className="text-[#7C6238] text-4xl mb-6">“</div>

              <p className="text-[#6D6B68] leading-relaxed mb-8">
                {review.text}
              </p>

              <div className="flex items-center justify-between gap-4">
                <div className="text-sm uppercase tracking-[0.2em] text-[#7C6238]">
                  {review.name}
                </div>

                <div className="rounded-full border border-[#E8DED2] bg-white/80 px-3 py-1 text-xs font-medium text-[#6D6B68]">
                  Booksy
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <a
            href="https://g.page/r/CWOsZkWYFdZbEBM/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#D4B483] bg-white/80 px-6 py-3 font-medium text-[#1D1D1B] transition-colors hover:bg-[#D4B483] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C6238]"
          >
            Dodaj opinię w Google
          </a>
        </div>
      </div>
    </section>
  );
}
