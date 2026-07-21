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
          Ostatnia aktualizacja: 5 lipca 2026 r.
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
                oraz ustalenie, dochodzenie lub obrona roszczeń – art. 6 ust. 1
                lit. f RODO, czyli prawnie uzasadniony interes administratora,
              </li>
              <li>
                wypełnienie obowiązków prawnych, jeżeli powstaną w związku z
                usługą – art. 6 ust. 1 lit. c RODO,
              </li>
              <li>
                podstawowe statystyki działania i szybkości strony zbierane
                przez Vercel bez użycia cookies – art. 6 ust. 1 lit. f RODO,
              </li>
              <li>
                Google Analytics oraz pomiar działań reklamowych Google Ads –
                art. 6 ust. 1 lit. a RODO, wyłącznie po udzieleniu odpowiedniej
                zgody,
              </li>
              <li>
                udzielenie odpowiedzi na kontakt e-mailowy lub telefoniczny –
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
                Niektórzy dostawcy mogą przetwarzać dane poza Europejskim
                Obszarem Gospodarczym. W takim przypadku transfer odbywa się z
                zastosowaniem mechanizmów przewidzianych przez RODO, takich jak
                decyzja stwierdzająca odpowiedni stopień ochrony lub
                standardowe klauzule umowne.
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
          </section>

          <section>
            <h2 className="text-3xl font-light text-[#1D1D1B]">
              Narzędzia zewnętrzne
            </h2>
            <p className="mt-5 leading-relaxed">
              Na stronie wykorzystywane są lub mogą pojawiać się usługi Vercel,
              Resend, Google oraz Booksy. Booksy obsługuje
              rezerwacje dokonywane bezpośrednio w swoim serwisie na zasadach
              określonych we własnej polityce prywatności. Korzystanie z
              odnośników lub osadzonych elementów zewnętrznych może wiązać się
              z przetwarzaniem danych przez ich dostawców.
            </p>
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
              Użytkownik może zmienić ustawienia cookies w swojej przeglądarce
              internetowej. Ograniczenie stosowania cookies może wpłynąć na
              działanie niektórych funkcji strony.
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
