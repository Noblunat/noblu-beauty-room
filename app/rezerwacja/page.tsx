import ReservationClient from "./ReservationClient"
import { findBookingService } from "../lib/bookingServices"

export default async function RezerwacjaPage({
  searchParams,
}: {
  searchParams: Promise<{ usluga?: string }>
}) {
  const { usluga } = await searchParams
  const initialService = typeof usluga === "string" ? findBookingService(usluga)?.id ?? "" : ""

  return <ReservationClient initialService={initialService} />
}
