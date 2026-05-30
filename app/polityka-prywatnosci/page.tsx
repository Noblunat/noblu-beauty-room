import type { Metadata } from "next";

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
      <article className="mx-auto max-w-4xl">
        <a href="/" className="text-sm font-medium text-[#B08B57]">
          Powrót do strony głównej
        </a>

        <h1 className="mt-10 text-5xl font-light leading-tight lg:text-7xl">
          Polityka prywatności
        </h1>

        <p className="mt-8 text-lg leading-relaxed text-[#5F5B56]">
          Niniejsza polityka opisuje zasady przetwarzania danych osobowych oraz
          korzystania z plików cookies na stronie internetowej Noblu Beauty
          Room dostępnej pod adresem https://noblu.pl.
        </p>

        <div className="mt-14 space-y-12 text-[#5F5B56]">
          <section>
            <h2 className="text-3xl font-light text-[#1D1D1B]">
              Administrator danych
            </h2>
            <div className="mt-5 space-y-2 leading-relaxed">
              <p>Administratorem danych jest Noblu Beauty Room.</p>
              <p>Adres salonu: Orzechowa 4/lok.1, 30-422 Kraków.</p>
              <p>
                Kontakt:{" "}
                <a
                  href="mailto:noblu.beautyroom@gmail.com"
                  className="text-[#B08B57]"
                >
                  noblu.beautyroom@gmail.com
                </a>
                ,{" "}
                <a href="tel:+48662989534" className="text-[#B08B57]">
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
              Strona może przetwarzać dane przekazywane dobrowolnie podczas
              kontaktu e-mailowego lub telefonicznego, a także podstawowe dane
              techniczne związane z korzystaniem ze strony, takie jak informacje
              o urządzeniu, przeglądarce, adresie IP czy ustawieniach cookies.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-light text-[#1D1D1B]">
              Cel przetwarzania danych
            </h2>
            <ul className="mt-5 list-disc space-y-3 pl-6 leading-relaxed">
              <li>udzielenie odpowiedzi na wiadomość lub zapytanie,</li>
              <li>obsługa rezerwacji prowadzonych przez Booksy,</li>
              <li>zapewnienie prawidłowego działania strony,</li>
              <li>prezentowanie mapy, zdjęć i treści zewnętrznych,</li>
              <li>poprawa jakości strony i komunikacji z klientkami.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-light text-[#1D1D1B]">
              Pliki cookies
            </h2>
            <p className="mt-5 leading-relaxed">
              Strona korzysta z plików cookies i podobnych technologii.
              Niezbędne pliki cookies służą do prawidłowego działania strony
              oraz zapamiętania wyboru użytkownika dotyczącego cookies.
              Opcjonalne cookies mogą być wykorzystywane do analityki,
              wyświetlania map Google, treści zewnętrznych oraz elementów
              społecznościowych.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-light text-[#1D1D1B]">
              Narzędzia zewnętrzne
            </h2>
            <p className="mt-5 leading-relaxed">
              Na stronie mogą pojawiać się odnośniki lub osadzone elementy
              zewnętrzne, w szczególności Google Maps, Instagram, Elfsight oraz
              Booksy. Korzystanie z tych usług może wiązać się z przetwarzaniem
              danych przez ich dostawców zgodnie z ich własnymi politykami
              prywatności.
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
              odbywa się na podstawie zgody. W sprawach dotyczących danych
              osobowych można skontaktować się z administratorem.
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
