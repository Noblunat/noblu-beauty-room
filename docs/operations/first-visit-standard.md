# Pierwsza wizyta - standard roboczy

Wersja próbna, 1 listopada 2026. Materiał wewnętrzny do zatwierdzenia przez Natalię. Sam zapis w repozytorium nie oznacza wdrożenia procedury przez zespół.

## Przed rozpoczęciem

1. Potwierdź stylistkę, usługę, stan obecnej stylizacji i oczekiwany efekt (kształt, długość, kolor, zdobienia).
2. Sprawdź, czy czas w kalendarzu uwzględnia zdjęcie obcej stylizacji, naprawy i zdobienia. Bazowa hybryda jednym kolorem: Natalia 160 zł / 90 min, Julia junior 130 zł / 120 min. Źródło do dalszych zmian: `app/lib/booksyCatalog.ts`, nie ten dokument.
3. Przed rozpoczęciem podaj pełną cenę, zakres oraz przewidywany czas. Uzyskaj zgodę na dodatkowe prace; nie dopisuj ich dopiero przy płatności.
4. Gdy zakres nie pasuje do zarezerwowanego czasu, uzgodnij zmianę lub inny termin. Nie obiecuj skrócenia pracy juniora.

## Na zakończenie

1. Wspólnie obejrzyjcie kształt, kolor, skórki i wykończenie. Zapytaj o uwagi, zanim klientka wyjdzie.
2. Przekaż zalecenia pielęgnacji dopasowane do wykonanej stylizacji. Wyjaśnij, jak zgłosić problem: telefon 662 989 534 lub salon@noblu.pl. Nie deklaruj nowego okresu gwarancji ani nie ograniczaj praw klientki tym dokumentem.
3. Zaproponuj kolejny termin bez nacisku, dobrany do stanu paznokci i wybranej usługi.
4. Poproś o szczerą opinię o konkretnej wizycie i stylistce. Bez nagród za ocenę, bez sugerowania pięciu gwiazdek i bez selekcjonowania wyłącznie zadowolonych osób.
5. Za zgodą klientki zapisz zdjęcie realizacji wraz z autorką, usługą, widocznymi dodatkami i podstawą publikacji. Nie publikuj nazwiska lub danych klientki.

## Obsługa zapytania bez konta

- Wyznacz osobę sprawdzającą salon@noblu.pl w godzinach pracy. Nie ma jeszcze liczbowej obietnicy czasu odpowiedzi.
- Prośba z formularza nie rezerwuje czasu w kalendarzu. Najpierw sprawdź wariant, stylistkę, zakres i dostępność.
- Jeżeli preferowany termin jest zajęty, zaproponuj alternatywy i poczekaj na wybór klientki. Dopiero uzgodnioną wizytę oznacz jako potwierdzoną.
- Jedno zapytanie przesłane telefonem i formularzem to nie dwie nowe klientki ani dwie wizyty.
- Powód rezygnacji wpisuj tylko, jeśli klientka sama go poda. W innym wypadku `niepodany`, nie domniemana cena lub brak zaufania.

## Oferta wejściowa

Pierwsza hybryda w Noblu oznacza przejrzysty wybór, a nie rabat. Nie wprowadzono darmowego zdobienia ani promocji cenowej.

Ewentualny test dodatku wymaga osobnego zatwierdzenia: dokładny wzór i liczba paznokci, limit dodatkowych minut i materiałów, terminy, uprawnione warianty, sposób zapisu w Booksy i limit dostępnych wizyt. French/ombre/babyboomer pozostaje płatne zgodnie z katalogiem. Nie łącz dodatku z prośbą o opinię.

## Co tydzień przez 30-60 dni

Korzystaj z prywatnej kopii `docs/templates/first-visits.csv`. Repozytorium zawiera tylko pusty szablon. Nie zapisuj tu imion, telefonów, zdjęć, maili ani rzeczywistej historii klientek.

- Jeden wiersz = jedno pierwsze zapytanie lub bezpośrednia pierwsza rezerwacja; dla formularza `lead_id` przepisz z pola „Identyfikator zgłoszenia” w mailu, a dla wejścia bez formularza nadaj losowy identyfikator. `client_ref` to prywatny pseudonim pozwalający rozpoznać powrót, nie kontakt ani hash telefonu.
- Osobno `natalia` i `julia`; źródła: `google_maps`, `google_ads`, `instagram`, `polecenie`, `booksy`, `strona`, `inne`, `nieznane`. Zapisz, czy źródło podała klientka czy pochodzi z potwierdzonego pomiaru. Sam klik Booksy nie dowodzi źródła wizyty.
- Statusy: `zapytanie`, `potwierdzona`, `odbyta`, `odwolana`, `nieobecnosc`, `niezarezerwowana`. Zmieniaj istniejący wiersz, nie dopisuj go do każdej fazy.
- `first_return_date` uzupełniaj dopiero po odbytym powrocie; nowa rezerwacja nie jest jeszcze powrotem.
- Kwoty i czas dotyczą rzeczywistej wizyty, nie ceny wyświetlonej na stronie. Koszt dodatku oddziel od całkowitego kosztu zmiennego, aby nie odjąć go dwa razy.

### Wskaźniki

| Wskaźnik | Sposób obliczenia |
| --- | --- |
| Nowe klientki | Unikalne `client_ref` ze statusem `odbyta`, osobno dla stylistek |
| Zapytanie -> odbyta wizyta | Odbyte pierwsze wizyty / pierwsze zapytania z tej samej zamkniętej kohorty |
| Realizacja | Odbyte / potwierdzone terminy, których data już minęła |
| Powrót po pierwszej | Odbyte powroty / odbyte pierwsze wizyty z pełnym okresem obserwacji, np. 60 dni |
| Koszt pozyskania nowej wizyty | Wydatki kanału / nowe odbyte wizyty przypisane do kanału; przy zerze wynik nieokreślony, nie 0 zł |
| Marża pokrycia wizyty | Otrzymana kwota minus koszt zmienny; to nie zysk netto, bo pozostają koszty stałe i podatki |
| Efekt dodatku | Dodatkowe minuty, materiały, marża i powroty vs porównywalne wizyty bez dodatku |

Nie oznaczaj zdarzenia `generate_lead` ani kliknięcia Booksy jako sprzedaży. Ta wersja nie zmienia celów w kontach GA4/Ads, nie importuje konwersji offline i nie uruchamia kampanii.

Trzymaj rejestr w miejscu z ograniczonym dostępem. Przed rzeczywistym użyciem ustal uprawnienia, okres przechowywania i przegląd danych. Raporty zespołowe udostępniaj zagregowane.
