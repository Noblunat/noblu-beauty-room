import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "../components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Polityka prywatności | Noblu Beauty Room",
  description:
    "Polityka prywatności i informacje o plikach cookies na stronie Noblu Beauty Room.",
  alternates: {
    canonical: "https://noblu.pl/polityka-prywatnosci",
  },
};

const privacyTools = [
  {
    name: "Zapis zgód",
    provider: "Noblu Beauty Room",
    purpose: "Zapamiętanie wybranych kategorii cookies i ich zmiany.",
    data: "Wyłącznie ustawienia: niezbędne, analityka, marketing i treści zewnętrzne; bez danych formularza.",
    activation: "Po zapisaniu wyboru w banerze. Zapis niezbędny do obsługi preferencji, niezależny od zgód opcjonalnych.",
    basis: "Art. 6 ust. 1 lit. f RODO.",
    storage: "localStorage: noblu-cookie-consent; bez automatycznego wygaśnięcia, do zmiany wyboru lub usunięcia danych witryny.",
    href: null,
    source: "",
  },
  {
    name: "Vercel",
    provider: "Vercel Inc.",
    purpose: "Hosting, CDN, obsługa formularza i ochrona przed spamem, w tym Vercel Firewall.",
    data: "Adres IP, adres żądanej strony i dane techniczne połączenia; przy wysłaniu formularza także jego treść.",
    activation: "Przy korzystaniu ze strony; obsługa formularza po jego wysłaniu. Nie wymaga zgody na opcjonalne cookies.",
    basis: "Art. 6 ust. 1 lit. f RODO; obsługa zapytania: lit. b.",
    storage: "Liczniki antyspamowe pracują w oknach 10 minut. Okresy logów infrastruktury zależą od rodzaju danych i konfiguracji Vercel, nie od tego okna.",
    href: "https://vercel.com/legal/dpa",
    source: "Dane i podwykonawcy Vercel",
  },
  {
    name: "Resend",
    provider: "Plus Five Five, Inc. (Resend)",
    purpose: "Wysłanie wiadomości z prośbą o termin do salonu.",
    data: "Imię, telefon, usługa, preferowany dzień i pora, dobrowolne uwagi oraz dane dostarczenia wiadomości.",
    activation: "Po wysłaniu poprawnie wypełnionego formularza. Odmowa cookies analitycznych i marketingowych nie blokuje wysyłki.",
    basis: "Art. 6 ust. 1 lit. b RODO.",
    storage: "Dane wiadomości i logi standardowo 30 dni według dokumentacji Resend; kopia w skrzynce salonu ma osobny okres przechowywania.",
    href: "https://resend.com/security/gdpr",
    source: "Prywatność i retencja Resend",
  },
  {
    name: "OVHcloud / Zimbra",
    provider: "OVH sp. z o.o. (OVHcloud)",
    purpose: "Odbiór zgłoszeń z formularza na salon@noblu.pl oraz bieżąca korespondencja z klientkami i dostawcami.",
    data: "Treść wiadomości, dane kontaktowe, historia korespondencji i dane techniczne dostarczenia poczty.",
    activation: "Po wysłaniu formularza lub wiadomości do salonu. Poczta jest obsługiwana także w Thunderbirdzie przez IMAP; nie ładuje na noblu.pl dodatkowego skryptu.",
    basis: "Art. 6 ust. 1 lit. b lub f RODO, zależnie od celu kontaktu.",
    storage: "Zgłoszenia co do zasady do 12 miesięcy od ostatniego kontaktu, z wyjątkami opisanymi w sekcji „Okres przechowywania”. Wiadomości są przechowywane w OVHcloud, a lokalne kopie mogą znajdować się na upoważnionych komputerach korzystających z Thunderbirda.",
    href: "https://contract.eu.ovhapis.com/1.0/pdf/OVH_Data_Protection_Agreement-pl.pdf",
    source: "Umowa powierzenia OVHcloud",
  },
  {
    name: "Gmail (wcześniejsza korespondencja)",
    provider: "Google",
    purpose: "Przechowywanie wcześniejszych zgłoszeń i historii korespondencji sprzed zmiany poczty salonu.",
    data: "Wcześniej otrzymane wiadomości, dane kontaktowe i historia korespondencji.",
    activation: "Nowe zgłoszenia z formularza nie trafiają na tę skrzynkę ani nie są do niej automatycznie kopiowane. Zmiana odbiorcy nie usuwa wcześniejszych wiadomości.",
    basis: "Art. 6 ust. 1 lit. b lub f RODO, zależnie od celu kontaktu.",
    storage: "Zgłoszenia w skrzynce: co do zasady do 12 miesięcy od ostatniego kontaktu, z wyjątkami opisanymi w sekcji „Okres przechowywania”.",
    href: "https://policies.google.com/privacy?hl=pl",
    source: "Polityka prywatności Google",
  },
  {
    name: "Google Analytics 4",
    provider: "Google; identyfikator G-BD9VRN0W6Q",
    purpose: "Statystyki odwiedzin oraz zdarzenia związane z usługami i formularzem, nie potwierdzenie wykonania wizyty.",
    data: "Identyfikatory cookies, dane urządzenia, adres podstrony bez parametrów zapytania, nazwa usługi i zdarzenia. Kod strony nie przekazuje imienia, telefonu ani uwag jako parametrów zdarzeń.",
    activation: "Dopiero po zgodzie analitycznej. Sama zgoda marketingowa nie włącza GA4.",
    basis: "Art. 6 ust. 1 lit. a RODO.",
    storage: "Pliki _ga i _ga_<identyfikator>: domyślnie 2 lata według Google; przeglądarka może skrócić ten czas. Retencja danych w GA4 jest odrębna i zależy od ustawień usługi.",
    href: "https://support.google.com/analytics/answer/11397207?hl=pl",
    source: "Pliki cookie GA4",
  },
  {
    name: "Google Ads",
    provider: "Google; identyfikator AW-10795260361",
    purpose: "Pomiar kontaktów po reklamach i personalizacja reklam.",
    data: "Identyfikatory reklamowe i kliknięć oraz konwersje: wysłanie zgłoszenia, kliknięcie telefonu lub Booksy. Kod strony nie wysyła imienia, telefonu ani uwag jako parametrów konwersji.",
    activation: "Dopiero po zgodzie marketingowej; ustawienia przekazujemy przez Consent Mode. Po jej wycofaniu nie wysyłamy nowych konwersji.",
    basis: "Art. 6 ust. 1 lit. a RODO.",
    storage: "Przykładowe pliki _gcl_* mają okres 90 dni. Rzeczywisty zestaw plików i okresy zależą od funkcji Ads oraz ustawień przeglądarki i konta Google.",
    href: "https://business.safety.google/adscookies/",
    source: "Wykaz cookies reklamowych Google",
  },
  {
    name: "Google Maps",
    provider: "Google",
    purpose: "Wyświetlenie osadzonej mapy dojazdu do salonu.",
    data: "Adres IP i dane przeglądarki; Google może korzystać z cookies lub powiązać korzystanie z mapy z kontem Google zgodnie z Twoimi ustawieniami.",
    activation: "Osadzona mapa po zgodzie na treści zewnętrzne. Link „Wyznacz trasę” otwiera odrębny serwis Google poza noblu.pl.",
    basis: "Osadzona mapa: art. 6 ust. 1 lit. a RODO.",
    storage: "Pliki i okresy zależą od funkcji mapy, ustawień przeglądarki i konta Google; szczegóły określa Google.",
    href: "https://policies.google.com/technologies/cookies?hl=pl",
    source: "Zasady cookies Google",
  },
  {
    name: "Booksy",
    provider: "Booksy International sp. z o.o.",
    purpose: "Rezerwacja w zewnętrznym serwisie po użyciu odnośnika.",
    data: "Odnośnik może wskazywać usługę. Formularz Noblu nie przekazuje do Booksy wpisanego imienia, telefonu ani uwag; dalsze dane podajesz w Booksy.",
    activation: "Po przejściu do Booksy. Zgody i przetwarzanie w tym serwisie są odrębne od banera Noblu.",
    basis: "Zasady i podstawy przetwarzania określa polityka Booksy; obsługa wizyty przez salon: art. 6 ust. 1 lit. b RODO.",
    storage: "Okresy dotyczące konta, rezerwacji i cookies w serwisie Booksy określa jego polityka; nie steruje nimi baner Noblu.",
    href: "https://booksy.com/pl-pl/p/privacy",
    source: "Polityka prywatności Booksy",
  },
];

export default function PolitykaPrywatnosciPage() {
  return (
    <main className="min-h-screen bg-[#F8F5F2] px-6 py-24 text-[#1D1D1B] lg:px-12">
      <BreadcrumbJsonLd
        items={[
          {
            name: "Polityka prywatności",
            url: "https://noblu.pl/polityka-prywatnosci",
          },
        ]}
      />

      <article className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm font-medium text-[#7C6238]">
          Powrót do strony głównej
        </Link>

        <h1 className="mt-10 text-5xl font-light leading-tight lg:text-7xl">
          Polityka prywatności
        </h1>

        <p className="mt-8 text-lg leading-relaxed text-[#5F5B56]">
          Niniejsza polityka opisuje zasady przetwarzania danych osobowych oraz
          korzystania z plików cookies na stronie internetowej Noblu Beauty
          Room dostępnej pod adresem https://noblu.pl.
        </p>
        <p className="mt-3 text-sm text-[#7A746D]">
          Ostatnia aktualizacja: 17 października 2026 r.
        </p>

        <div className="mt-14 space-y-12 text-[#5F5B56]">
          <section>
            <h2 className="text-3xl font-light text-[#1D1D1B]">
              Administrator danych
            </h2>
            <div className="mt-5 space-y-2 leading-relaxed">
              <p>
                Administratorem danych jest Noblu Beauty Room Natalia Mądry.
              </p>
              <p>NIP: 6793222358, REGON: 389813411.</p>
              <p>
                Adres: Orzechowa 4 lok. 1, 30-422 Kraków, woj. małopolskie.
              </p>
              <p>
                Kontakt:{" "}
                <a
                  href="mailto:salon@noblu.pl"
                  className="text-[#7C6238]"
                >
                  salon@noblu.pl
                </a>
                ,{" "}
                <a href="tel:+48662989534" className="text-[#7C6238]">
                  +48 662 989 534
                </a>
                .
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-light text-[#1D1D1B]">
              Jakie dane mogą być przetwarzane
            </h2>
            <p className="mt-5 leading-relaxed">
              W formularzu zapytania o termin przetwarzane są: imię, numer
              telefonu, wybrana usługa, preferowany dzień i pora wizyty oraz
              dobrowolnie wpisane uwagi. Strona może także przetwarzać dane
              przekazane podczas kontaktu e-mailowego lub telefonicznego oraz
              podstawowe dane techniczne, takie jak informacje o urządzeniu,
              przeglądarce, adresie IP i ustawieniach cookies. Identyfikator
              techniczny utworzony na podstawie adresu IP jest używany
              tymczasowo do ochrony formularza przed spamem.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-light text-[#1D1D1B]">
              Formularz zapytania o termin
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed">
              <p>
                Dane z formularza są wykorzystywane do przyjęcia prośby o
                termin, kontaktu z klientką i uzgodnienia wizyty. Podstawą
                przetwarzania jest art. 6 ust. 1 lit. b RODO, czyli podjęcie
                działań na żądanie osoby przed zawarciem umowy.
              </p>
              <p>
                Podanie danych jest dobrowolne, ale imię, numer telefonu,
                usługa i preferowany dzień są niezbędne do obsługi zgłoszenia.
                Prośba przesłana formularzem nie oznacza automatycznego
                potwierdzenia terminu.
              </p>
              <p>
                Wiadomość jest wysyłana przez Resend do skrzynki
                salon@noblu.pl w OVHcloud (Zimbra), obsługiwanej przez
                upoważnione osoby w salonie, także za pomocą Thunderbirda.
                Nie wysyłamy automatycznej kopii zgłoszenia do Gmaila.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-light text-[#1D1D1B]">
              Pozostałe cele i podstawy prawne
            </h2>
            <ul className="mt-5 list-disc space-y-3 pl-6 leading-relaxed">
              <li>
                zapewnienie bezpieczeństwa strony, przeciwdziałanie spamowi
                oraz ustalenie, dochodzenie lub obrona roszczeń - art. 6 ust. 1
                lit. f RODO, czyli prawnie uzasadniony interes administratora,
              </li>
              <li>
                wypełnienie obowiązków prawnych, jeżeli powstaną w związku z
                usługą - art. 6 ust. 1 lit. c RODO,
              </li>
              <li>
                udostępnianie strony przez hosting i sieć CDN Vercel,
                obsługa żądań oraz diagnostyka błędów i bezpieczeństwa -
                art. 6 ust. 1 lit. f RODO,
              </li>
              <li>
                analiza korzystania ze strony w Google Analytics 4 oraz
                pomiar i personalizacja reklam Google Ads -
                art. 6 ust. 1 lit. a RODO, wyłącznie po udzieleniu odpowiedniej
                zgody,
              </li>
              <li>
                wyświetlanie osadzonej mapy Google i przekazanie danych
                technicznych jej dostawcy - art. 6 ust. 1 lit. a RODO,
                po zgodzie na treści zewnętrzne,
              </li>
              <li>
                udzielenie odpowiedzi na kontakt e-mailowy lub telefoniczny -
                odpowiednio art. 6 ust. 1 lit. b lub f RODO.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-light text-[#1D1D1B]">
              Okres przechowywania
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed">
              <p>
                Wiadomości dotyczące zapytania o termin są przechowywane przez
                czas potrzebny do jego obsługi, co do zasady nie dłużej niż 12
                miesięcy od ostatniego kontaktu. Jeżeli dojdzie do wykonania
                usługi, dane mogą być przechowywane dłużej w zakresie
                wymaganym przez przepisy lub do upływu terminów przedawnienia
                roszczeń.
              </p>
              <p>
                Od 17 października 2026 r. nowe zgłoszenia trafiają do
                skrzynki salon@noblu.pl w OVHcloud. Wcześniejsza
                korespondencja może pozostawać w Gmailu do upływu właściwego
                okresu przechowywania. Zmiana skrzynki nie oznacza jej
                automatycznej migracji ani usunięcia. Te same zasady dotyczą
                lokalnych kopii poczty na upoważnionych komputerach.
              </p>
              <p>
                Resend przechowuje dane wysłanych wiadomości standardowo przez
                30 dni. Ochrona przed spamem korzysta z liczników działających
                w oknach 10 minut w Vercel Firewall i pomocniczo w pamięci
                funkcji. Nie jest to okres przechowywania wszystkich logów hostingu.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-light text-[#1D1D1B]">
              Odbiorcy danych
            </h2>
            <div className="mt-5 space-y-4 leading-relaxed">
              <p>
                Dane mogą być powierzane dostawcom niezbędnym do działania
                strony i obsługi kontaktu, w szczególności Vercel
                (hosting), Resend
                (wysyłka formularza), OVHcloud (poczta Zimbra) oraz Google
                (wcześniejsza korespondencja w Gmailu, Analytics, Ads i usługi mapowe).
              </p>
              <p>
                Korzystanie z infrastruktury Vercel, Resend i Google może
                wiązać się z przetwarzaniem danych poza Europejskim Obszarem
                Gospodarczym, w szczególności w Stanach Zjednoczonych.
                Dokumentacja dostawców przewiduje zabezpieczenia transferów,
                w tym standardowe klauzule umowne zatwierdzone przez Komisję
                Europejską, a dla objętych nimi odbiorców także decyzje o
                odpowiednim stopniu ochrony. Mechanizm zależy od dostawcy,
                usługi i odbiorcy danych.
              </p>
              <p>
                Informacje o zabezpieczeniach i podwykonawcach znajdują się w{" "}
                <a className="underline" href="https://vercel.com/legal/dpa">dokumentacji Vercel</a>,{" "}
                <a className="underline" href="https://resend.com/legal/dpa">dokumentacji Resend</a>,{" "}
                <a className="underline" href="https://contract.eu.ovhapis.com/1.0/pdf/OVH_Data_Protection_Agreement-pl.pdf">umowie powierzenia OVHcloud</a>{" "}
                oraz{" "}
                <a className="underline" href="https://policies.google.com/privacy/frameworks?hl=pl">zasadach transferów Google</a>.
                O informacje dotyczące transferu Twoich danych oraz kopię
                stosowanych zabezpieczeń możesz wystąpić do administratora
                pod adresem salon@noblu.pl.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-light text-[#1D1D1B]">
              Pliki cookies
            </h2>
            <p className="mt-5 leading-relaxed">
              Strona korzysta z plików cookies i podobnych technologii.
              Niezbędne pliki cookies służą do prawidłowego działania strony
              oraz zapamiętania wyboru użytkownika dotyczącego cookies.
              Opcjonalne technologie analityczne i marketingowe uruchamiane są
              dopiero po udzieleniu odpowiedniej zgody. Odmowa nie wpływa na
              możliwość wysłania formularza. Mapa Google jest ładowana dopiero
              po osobnym włączeniu treści zewnętrznych.
            </p>
            <ul className="mt-5 list-disc space-y-3 pl-6 leading-relaxed">
              <li>
                Niezbędne: zapis „noblu-cookie-consent” w pamięci lokalnej
                przeglądarki (localStorage) przechowuje wybrane kategorie zgód.
                Nie ma automatycznego terminu wygaśnięcia; pozostaje do zmiany
                wyboru lub usunięcia danych witryny w przeglądarce.
              </li>
              <li>
                Analityczne: Google Analytics 4 może zapisywać identyfikatory
                cookies, np. „_ga”. Według dokumentacji Google domyślny czas
                tego pliku wynosi 2 lata i może być odnawiany przy kolejnych
                wizytach. To okres pliku w przeglądarce, a nie okres
                przechowywania wszystkich danych na koncie Analytics.
              </li>
              <li>
                Marketingowe: Google Ads może zapisywać identyfikatory
                służące przypisaniu kontaktu do reklamy i jej personalizacji.
                Rodzaje plików i ich okresy zależą od funkcji reklamowych oraz
                ustawień przeglądarki. Szczegółowy wykaz publikuje{" "}
                <a className="underline" href="https://business.safety.google/adscookies/">Google dla produktów reklamowych</a>.
              </li>
              <li>
                Treści zewnętrzne: po włączeniu mapy przeglądarka łączy się z
                Google Maps. Google otrzymuje m.in. adres IP i informacje o
                przeglądarce; może korzystać z własnych plików cookies,
                zależnie od Twoich ustawień i zalogowania do Google.
                Więcej w{" "}
                <a className="underline" href="https://policies.google.com/technologies/cookies?hl=pl">zasadach cookies Google</a>.
              </li>
            </ul>
          </section>

          <section id="narzedzia" aria-labelledby="narzedzia-title">
            <h2 id="narzedzia-title" className="text-3xl font-light text-[#1D1D1B]">
              Narzędzia i dostawcy
            </h2>
            <p className="mt-5 leading-relaxed">
              Poniższe zestawienie opisuje narzędzia używane przez noblu.pl.
              Zgoda na analitykę, marketing i treści zewnętrzne jest dobrowolna
              i nie jest potrzebna do wysłania formularza.
            </p>
            <div
              role="region"
              aria-labelledby="narzedzia-title"
              tabIndex={0}
              className="mt-6 overflow-x-auto rounded-lg border border-[#D8CEC1] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7C6238]"
            >
              <table className="w-full min-w-[760px] table-fixed border-collapse text-left text-sm leading-relaxed [overflow-wrap:anywhere]">
                <caption className="bg-[#EFE7DD] px-4 py-3 text-left font-medium text-[#1D1D1B]">
                  Zestawienie narzędzi używanych na noblu.pl
                </caption>
                <thead className="bg-white text-[#1D1D1B]">
                  <tr>
                    <th scope="col" className="w-[20%] border-t border-[#D8CEC1] p-4 align-top">Narzędzie i dostawca</th>
                    <th scope="col" className="w-[30%] border-t border-[#D8CEC1] p-4 align-top">Cel i przetwarzane dane</th>
                    <th scope="col" className="w-1/4 border-t border-[#D8CEC1] p-4 align-top">Uruchomienie i podstawa</th>
                    <th scope="col" className="w-1/4 border-t border-[#D8CEC1] p-4 align-top">Zapis i przechowywanie</th>
                  </tr>
                </thead>
                <tbody>
                  {privacyTools.map((tool) => (
                    <tr key={tool.name} className="odd:bg-white/60">
                      <th scope="row" className="border-t border-[#D8CEC1] p-4 align-top font-normal">
                        <span className="block font-semibold text-[#1D1D1B]">{tool.name}</span>
                        <span className="mt-2 block">{tool.provider}</span>
                      </th>
                      <td className="border-t border-[#D8CEC1] p-4 align-top">
                        <p>{tool.purpose}</p>
                        <p className="mt-2">{tool.data}</p>
                      </td>
                      <td className="border-t border-[#D8CEC1] p-4 align-top">
                        <p>{tool.activation}</p>
                        <p className="mt-2">{tool.basis}</p>
                      </td>
                      <td className="border-t border-[#D8CEC1] p-4 align-top">
                        <p>{tool.storage}</p>
                        {tool.href && (
                          <a href={tool.href} className="mt-2 inline-block text-[#7C6238] underline underline-offset-4">
                            {tool.source}
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5 space-y-4 leading-relaxed">
              <p>
                Korzystanie z usług Vercel, Resend i Google może wiązać się
                z przetwarzaniem danych poza EOG, w tym w USA. Informacje
                o zabezpieczeniach transferów znajdują się wyżej, w sekcji
                „Odbiorcy danych”, oraz w dokumentacji dostawców.
              </p>
              <p>
                Wycofanie zgody blokuje nowe zdarzenia zgodnie z ustawieniami,
                również w pozostałych otwartych kartach tej przeglądarki.
                Wcześniej załadowany tag Google może wysłać techniczny sygnał
                zmiany zgody; nie jest to zgoda na personalizację reklam.
              </p>
              <p>
                Kod strony nie zawiera Meta Pixel ani osobnego kontenera
                Google Tag Manager. GA4 i Google Ads obsługuje Google tag (gtag.js).
                Odnośniki do profili społecznościowych nie są osadzonymi pikselami.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-light text-[#1D1D1B]">
              Prawa użytkownika
            </h2>
            <p className="mt-5 leading-relaxed">
              Użytkownik ma prawo dostępu do swoich danych, ich sprostowania,
              usunięcia, ograniczenia przetwarzania, przenoszenia danych,
              wniesienia sprzeciwu oraz cofnięcia zgody, jeżeli przetwarzanie
              odbywa się na podstawie zgody. Zakres poszczególnych praw zależy
              od podstawy i celu przetwarzania. Użytkownik ma także prawo
              wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych. W
              sprawach dotyczących danych osobowych można skontaktować się z
              administratorem.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-light text-[#1D1D1B]">
              Zmiana ustawień cookies
            </h2>
            <p className="mt-5 leading-relaxed">
              W każdej chwili możesz zmienić lub wycofać zgody na opcjonalne
              pliki cookie, korzystając z przycisku „Ustawienia cookies” w stopce każdej strony. Wycofanie zgody
              nie wpływa na zgodność z prawem wcześniejszego przetwarzania.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-light text-[#1D1D1B]">
              Aktualizacja polityki
            </h2>
            <p className="mt-5 leading-relaxed">
              Polityka może być okresowo aktualizowana, w szczególności w razie
              zmian funkcji strony, wykorzystywanych narzędzi lub przepisów
              prawa.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
