type BreadcrumbItem = {
  name: string
  url: string
}

type BreadcrumbJsonLdProps = {
  items: BreadcrumbItem[]
}

const homeItem = {
  name: "Noblu Beauty Room",
  url: "https://noblu.pl/",
}

export default function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const breadcrumbItems = [homeItem, ...items]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
