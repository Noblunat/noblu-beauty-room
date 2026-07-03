type ServiceOffer = {
  name: string
  price: string
}

type ServiceJsonLdProps = {
  name: string
  description: string
  serviceType: string
  url: string
  offers: ServiceOffer[]
}

const areaServed = [
  "Kraków",
  "Podgórze",
  "Podgórze Duchackie",
  "Borek Fałęcki",
  "Łagiewniki",
  "Ruczaj",
  "Kurdwanów",
  "Wola Duchacka",
  "Swoszowice",
]

export default function ServiceJsonLd({
  name,
  description,
  serviceType,
  url,
  offers,
}: ServiceJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name,
    description,
    serviceType,
    url,
    provider: {
      "@id": "https://noblu.pl/#salon",
    },
    areaServed,
    offers: offers.map((offer) => ({
      "@type": "Offer",
      name: offer.name,
      price: offer.price,
      priceCurrency: "PLN",
      url: "https://noblu.pl/cennik",
      availability: "https://schema.org/InStock",
    })),
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://noblu.pl/rezerwacja",
        inLanguage: "pl-PL",
      },
      name: "Zapytaj o termin wizyty",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
