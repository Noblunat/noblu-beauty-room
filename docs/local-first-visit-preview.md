# Lokalna wersja oferty pierwszej wizyty

Wersja próbna została zatwierdzona przez właścicielkę do publikacji 1 listopada 2026. Gałąź `codex/local-first-visit-preview-20261101`; publikacja wymaga zwykłej kontroli bez flagi podglądu, przetestowania wdrożenia preview i weryfikacji produkcji. Dowody wydania: `docs/releases/2026-11-01-first-visit.md`.

## Zakres

1. Hero: dwie konkretne oferty z ceną i czasem z tego samego katalogu co cennik oraz formularz; parking, adres, opinie i dwie ścieżki wyboru terminu.
2. Pierwsza wizyta: zakres hybrydy, warunkowe bezpłatne zdjęcie obcej stylizacji, płatne dodatki i dodatkowy czas, naprawa; nie zmieniono cen ani Booksy.
3. Wiarygodność: portrety i potwierdzone opisy zespołu, jawny status junior, nawigacja do galerii salonu i istniejących opinii o Natalii. Nie przypisano wspólnej galerii do stylistek i nie dodano fikcyjnych opinii Julii.
4. Formularz: cena/czas/stylistka przy polach, informacja o zapytaniu, kontakcie w godzinach pracy i alternatywnym terminie; krótszy hero bez dużego zdjęcia na mobile. Dotychczasowe zabezpieczenia, identyfikatory i idempotencja bez zmian.
   Dodatkowo skonfigurowano w Next.js dokładnie te jakości obrazów, których już używają galeria i Instagram (70, 72, 75, 76); podgląd nie zgłasza już ich jako nieobsługiwanych ustawień.
5. Oferta wejściowa: przejrzysta pierwsza hybryda bez rabatu. Nie aktywowano darmowego dodatku.
6. Standard wizyty: wewnętrzny dokument `docs/operations/first-visit-standard.md`, do omówienia z zespołem.
7. Pomiar: prywatny rejestr na bazie pustego CSV, identyfikator zgłoszenia w mailu do salonu, identyfikator wariantu przy kliknięciu oferty Booksy, definicje wskaźników, rozróżnienie zapytania i odbytej wizyty. Bez nowej bazy danych, PII w repo i zmian w kontach reklamowych.

## Przed późniejszą publikacją

- Daty rewizji treści i współdzielonego zespołu uaktualniono na zatwierdzoną publikację 1 listopada; samo uruchomienie lokalnego podglądu wcześniej nie było publikacją.
- Wskazać autorstwo zdjęć Natalii i Julii, rodzaj usługi i widoczne dodatki. Dopiero wtedy zamienić link „Zobacz realizacje salonu” na portfolio konkretnej stylistki. Nie zakładać autorstwa na podstawie nazwy pliku.
- Autentyczne opinie Julii można dodać po wskazaniu źródła. Nie przenosić opinii o Natalii pod profil Julii.
- Przyciski Booksy prowadzą do działającego adresu profilu z instrukcją wyboru wariantu. Nie udają wstępnego wybrania stylistki. Linki formularza zachowują dokładny wariant. Bezpośredni link Booksy do stylistki/usługi trzeba otrzymać z obsługiwanej funkcji i zweryfikować przed podmianą.
- Potwierdzić, że polityka usuwania obcej stylizacji obejmuje zamierzony materiał i stan paznokci. Katalog mówi o dodatku do wybranej nowej usługi, nie o bezpłatnej samodzielnej korekcie lub zdjęciu żelu.
- Nie dopisano czasu odpowiedzi w minutach; właścicielka zatwierdziła „w godzinach pracy”.
- Instagram, Booksy Biz, GA4 i Google Ads nie zostały zmienione. Nie uruchomiono promocji, nowych zgód ani płatnych narzędzi.

## Bezpieczeństwo podglądu

Uruchamiaj serwer lokalny z `NOBLU_LOCAL_PREVIEW=1` oraz pustymi `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `BOOKING_RECIPIENT_EMAIL`. Flaga blokuje API przed wywołaniem dostawcy nawet przy przypadkowo obecnym kluczu i wyłącza loadery GoogleTag/ConversionEvents w lokalnym układzie. Formularz zwróci czytelny komunikat podglądu, nie fałszywe potwierdzenie wizyty. Test sukcesu i błędu wykonujemy przez mock w Playwright. Nie wpisuj prawdziwych danych klientek.

Przyciski Booksy otwierają prawdziwy serwis; nie finalizuj próbnej rezerwacji. Nie ustawiaj `NOBLU_LOCAL_PREVIEW` na Vercel. Flaga pozostaje tylko w środowisku procesu lokalnego, a nie w pliku .env konta lub projektu.

Do spokojnego oglądania używamy buildu produkcyjnego lokalnie, bez panelu developerskiego. Flagę trzeba ustawić zarówno podczas budowania statycznej strony, jak i uruchamiania serwera. Nie obniżamy CSP dla narzędzi developerskich.

```powershell
$env:NOBLU_LOCAL_PREVIEW = '1'
npm.cmd run build
# Kontynuuj tylko po kodzie 0:
npm.cmd run start -- --hostname 127.0.0.1 --port 3145
```

Po zakończeniu takiej sesji usuń flagę z bieżącego terminala (`Remove-Item Env:NOBLU_LOCAL_PREVIEW`) przed zwykłą kontrolą wydania. `npm run check` i pełne testy zgód wykonujemy bez tej flagi; kontrole wysyłki w testach mają zamockowanego dostawcę.

## Dowody kontroli

- `output/2026-11-01-first-visit-check.log`: lint, 163 testy jednostkowe, pełny audit, build i kontrola ośmiu tras.
- `output/2026-11-01-first-visit-e2e.log`: pełna regresja przeglądarkowa; nowe przypadki porównują oferty, widoczność obu cen w pierwszym ekranie i wariant przy polach formularza.
- Zrzuty komputer / 375 / 414: `output/playwright/results/first-visit-*/first-visit-home.png` i `first-visit-form.png`.
- Ceny i katalog Booksy nie są edytowane, istniejące mechanizmy zgód oraz zabezpieczenia formularza pozostają aktywne w normalnym trybie.
