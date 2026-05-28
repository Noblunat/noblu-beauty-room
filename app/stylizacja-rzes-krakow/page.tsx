export const metadata = {
  title: "Stylizacja rzęs Kraków | Noblu Beauty Room",
  description:
    "Stylizacja rzęs w Krakowie. Naturalny efekt, rzęsy 1:1, volume i premium lash look w Noblu Beauty Room.",
}

export default function StylizacjaRzesKrakowPage() {
  return (
    <main className="min-h-screen bg-[#F8F5F2] text-[#1D1D1B]">
      <section className="pt-40 pb-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-sm uppercase tracking-[0.3em] text-[#D4B483] mb-6">
            Stylizacja rzęs Kraków
          </div>

          <h1 className="text-5xl lg:text-7xl font-light leading-tight">
            Stylizacja rzęs
            <span className="block text-[#D4B483]">
              w Krakowie
            </span>
          </h1>

          <p className="mt-10 text-lg text-[#6D6B68] leading-relaxed max-w-3xl">
            Noblu Beauty Room oferuje stylizację rzęs w Krakowie dla kobiet,
            które cenią elegancki, dopracowany i naturalny efekt. Tworzymy
            stylizacje dopasowane do urody, kształtu oka oraz oczekiwanego
            rezultatu.
          </p>

          <div className="mt-12">
            <a
              href="https://booksy.com/pl-pl/105150_noblu-beauty-room_paznokcie_8820_krakow"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-[#D4B483] text-black font-medium hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(212,180,131,0.25)]"
            >
              Zarezerwuj stylizację rzęs
            </a>
          </div>
        </div>
      </section>

      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto space-y-10 text-lg leading-relaxed text-[#5F5B56]">
          <p>
            Jeśli szukasz miejsca takiego jak stylizacja rzęs Kraków,
            rzęsy Kraków, przedłużanie rzęs Kraków lub lash artist Kraków —
            Noblu Beauty Room oferuje profesjonalne usługi w kameralnej,
            estetycznej atmosferze.
          </p>

          <p>
            Wykonujemy stylizacje rzęs dopasowane do naturalnej urody:
            delikatne rzęsy 1:1, subtelne objętości oraz elegancki natural
            lash look. Stawiamy na komfort, estetykę i trwałość efektu.
          </p>

          <p>
            Salon znajduje się przy ul. Orzechowej 4/lok.1 w Krakowie i jest
            wygodnym wyborem dla klientek z okolic Podgórza, Łagiewnik,
            Borku Fałęckiego, Ruczaju oraz Kurdwanowa.
          </p>
        </div>
      </section>
    </main>
  )
}