import type { Metadata } from "next";
import Link from "next/link";
import BreadcrumbJsonLd from "../components/BreadcrumbJsonLd";
import CookiePreferencesButton from "../components/CookiePreferencesButton";

export const metadata: Metadata = {
  title: "Polityka prywatności | Noblu Beauty Room",
  description:
    "Polityka prywatności i informacje o plikach cookies na stronie Noblu Beauty Room.",
  alternates: {
    canonical: "https://noblu.pl/polityka-prywatnosci",
  },
};

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
          Ostatnia aktualizacja: 6 października 2026 r.
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
                  href="mailto:noblu.beautyroom@gmail.com"
                  className="text-[#7C6238]"
                >
                  noblu.beautyroom@gmail.com
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
                Resend przechowuje dane wysłanych wiadomości standardowo przez
                30 dni. Techniczne dane antyspamowe są przechowywane
                tymczasowo w pamięci funkcji obsługującej formularz.
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
                (wysyłka formularza) oraz Google (poczta Gmail, Analytics,
                Ads i usługi mapowe).
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
                <a className="underline" href="https://resend.com/legal/dpa">dokumentacji Resend</a>{" "}
                oraz{" "}
                <a className="underline" href="https://policies.google.com/privacy/frameworks?hl=pl">zasadach transferów Google</a>.
                O informacje dotyczące transferu Twoich danych oraz kopię
                stosowanych zabezpieczeń możesz wystąpić do administratora
                pod adresem noblu.beautyroom@gmail.com.
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

          <section>
            <h2 className="text-3xl font-light text-[#1D1D1B]">
              Narzędzia zewnętrzne
            </h2>
            <ul className="mt-5 list-disc space-y-4 pl-6 leading-relaxed">
              <li>
                Vercel obsługuje hosting, CDN i funkcję serwerową formularza.
                Przy otwieraniu strony przetwarza dane techniczne żądania;
                po wysłaniu formularza obsługuje również jego treść.
              </li>
              <li>
                Resend dostarcza wiadomość ze zgłoszeniem na skrzynkę Gmail
                salonu. Przekazywane są imię, telefon, usługa, preferowany
                termin i dobrowolne uwagi. Dane formularza nie są w kodzie
                strony przekazywane jako parametry zdarzeń GA4 ani Google Ads.
              </li>
              <li>
                Google Analytics 4 (G-BD9VRN0W6Q) mierzy odwiedziny podstron
                usługowych, kliknięcia prowadzące do rezerwacji oraz rozpoczęcie
                i skuteczne wysłanie formularza. Zdarzenie wysłania oznacza
                przyjęcie prośby o termin przez system, nie potwierdzoną wizytę.
              </li>
              <li>
                Google Ads (AW-10795260361) mierzy wybrane kontakty, w tym
                wysłanie formularza oraz kliknięcia telefonu i Booksy.
                Zgoda marketingowa obejmuje pomiar i personalizację reklam.
                Ustawienia są przekazywane do Google przez Consent Mode.
              </li>
              <li>
                Mapa Google jest osadzona za zgodą na treści zewnętrzne.
                Link „Wyznacz trasę w Google Maps” otwiera osobny serwis Google.
              </li>
              <li>
                Booksy obsługuje rezerwacje po przejściu do jego serwisu.
                Formularz Noblu nie wysyła do Booksy wpisanego imienia,
                telefonu ani uwag; odnośnik może wskazywać wybraną usługę.
                Dalsze przetwarzanie podlega zasadom prywatności Booksy.
              </li>
            </ul>
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
              pliki cookie, korzystając z przycisku poniżej. Wycofanie zgody
              nie wpływa na zgodność z prawem wcześniejszego przetwarzania.
            </p>
            <div className="mt-5">
              <CookiePreferencesButton />
            </div>
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
