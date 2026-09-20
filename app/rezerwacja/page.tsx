import ReservationClient from "./ReservationClient"

const servicesFromLinks = new Map([
  ["manicure", "Manicure"],
  ["hybryda", "Stylizacja hybrydowa"],
  ["pedicure", "Pedicure kosmetyczny"],
  ["rzesy", "Aplikacja rzęs 1:1"],
])

export default async function RezerwacjaPage({
  searchParams,
}: {
  searchParams: Promise<{ usluga?: string }>
}) {
  const { usluga } = await searchParams
  const initialService = typeof usluga === "string" ? servicesFromLinks.get(usluga) ?? "" : ""

  return <ReservationClient initialService={initialService} />
}
