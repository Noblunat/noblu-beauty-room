
import { business } from "../lib/business";
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
      "@id": `${business.url}/#salon`,
    },
    areaServed: business.areas,
    offers: offers.map((offer) => ({
      "@type": "Offer",
      name: offer.name,
      price: offer.price,
      priceCurrency: "PLN",
      url: `${business.url}/cennik`,
      availability: "https://schema.org/InStock",
    })),
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${business.url}/rezerwacja`,
        inLanguage: "pl-PL",
      },
      name: "Zapytaj o termin",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
