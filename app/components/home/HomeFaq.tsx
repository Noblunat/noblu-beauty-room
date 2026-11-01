import { business } from "../../lib/business";

const faqItems = [
  {
    q: `Gdzie znajduje się ${business.name}?`,
    a: `Salon znajduje się w Krakowie przy ul. ${business.address.streetLocative}.`,
  },
  {
    q: "Czy można zarezerwować wizytę online?",
    a: "W Booksy wybierzesz usługę, stylistkę i dostępny termin. Bez konta możesz wysłać prośbę przez formularz Noblu 24/7. To zapytanie, nie gotowa rezerwacja: dostępność potwierdzamy SMS-em lub telefonicznie w godzinach pracy salonu. Jeśli termin będzie zajęty, zaproponujemy inny.",
  },
  {
    q: "Jakie usługi oferuje salon?",
    a: "Oferujemy manicure, stylizację paznokci (hybrydową i żelową), pedicure oraz stylizację i przedłużanie rzęs (1:1, 2D, 3D).",
  },
  {
    q: "Czy salon przyjmuje nowe klientki?",
    a: "Tak, przyjmujemy nowe klientki na manicure, paznokcie hybrydowe i pedicure. Termin możesz zapytać przez formularz online.",
  },
];

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${business.url}/#faq`,
  mainEntity: faqItems.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function HomeFaq() {
  return (
    <section id="faq" className="py-28 bg-transparent text-[#1D1D1B]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-5xl">
          <div className="mb-16">
            <div className="text-sm uppercase tracking-[0.3em] text-[#7C6238] mb-4">
              FAQ
            </div>

            <h2 className="text-4xl lg:text-6xl font-light">
              Najczęstsze pytania
            </h2>
          </div>

          <div className="space-y-8 mt-12">
            {faqItems.map((faq) => (
              <div
                key={faq.q}
                className="rounded-[2rem] border border-[#E8DED2] bg-white/70 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
              >
                <h3 className="text-xl text-[#1D1D1B] mb-4">{faq.q}</h3>

                <p className="text-[#6D6B68] leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
