# The Circle – plan dalszego rozwoju

Stan na: 25.10.2026
Legenda: 🟢 mały (do 1–2 h) · 🟡 średni (pół dnia) · 🔴 duży (kilka dni)

---

## 1. Komentarze pod postami 🟡
**Cel:** czytanie i wyświetlanie komentarzy pod postami.

- Appwrite: nowa tabela `comments`:
  - `post`: relacja do `posts`, many-to-one
  - `author`: relacja do `users`, many-to-one, one-way
  - `content`: string, maks. 1000 znaków
  - uprawnienia: Users – Create i Read; autor – Delete
- API: `createComment`, `getComments(postId)`, `deleteComment`
- UI w `PostDetails`:
  - lista komentarzy (avatar, nazwa, treść, data)
  - formularz z polem tekstowym i przyciskiem „Post”
  - usuwanie własnych komentarzy
- Licznik komentarzy na `PostCard` (Home)
- Później: odpowiedzi na komentarze, lajki komentarzy

## 2. Klikalne tagi 🟢
- ✅ Tagi na stronie posta prowadzą do `/explore?search=tag`.
- ⬜ To samo dla tagów na `PostCard` (Home) i w wynikach Explore.
- ⬜ Gdy wyszukiwanie przyszło z tagu, pokazywać nagłówek „#tag” w Explore.

## 3. Wiadomości prywatne 🔴
- Tabele:
  - `conversations`: uczestnicy, ostatnia wiadomość, data
  - `messages`: konwersacja, autor, treść, data, przeczytana
- Uprawnienia na poziomie wierszy: tylko uczestnicy rozmowy widzą wiadomości.
- Aktualizacja na żywo przez Appwrite Realtime (subskrypcja kanału `messages`).
- UI:
  - lista rozmów
  - widok czatu
  - licznik nieprzeczytanych wiadomości w lewym menu
- Zależność: najlepiej po wdrożeniu follow i uprawnień na poziomie wierszy.

## 4. Przycisk „Share” 🟢
- Ikonka `share.svg` już jest w projekcie.
- Na urządzeniach, które obsługują systemowe udostępnianie, wywołać `navigator.share({ url })`. W pozostałych kopiować link do schowka i pokazać toast „Link copied”.
- Miejsce: `PostStats`, czyli Home i szczegóły posta.

## 5. Lepsza wyszukiwarka postów 🟡
**Zasady wyszukiwania:**
- **Tagi:** dopasowanie tylko do **całego** tagu, bez względu na wielkość liter („office” → `#Office`, ale „off” nie znajdzie tagu `#Office`).
- **Opis:** wyniki pokazują się **dynamicznie w trakcie pisania** i pasują też do **fragmentu słowa** („off” → „office”, „fice” → „office”).

**Stan obecny:**
- tagi są już dopasowywane w całości (sprawdzane warianty „office”, „Office”, „OFFICE”);
- opis jest przeszukiwany pełnotekstowo, ale tylko po **początkach** słów („off” → „office” działa, „fice” już nie);
- wyniki pojawiają się dopiero po 500 ms przerwy w pisaniu.

**Do zrobienia:**
- Opis:
  - dodać w `posts` kolumnę `captionSearch` (string) z opisem zapisanym małymi literami;
  - wypełniać ją w `createPost` i `updatePost`, a dla istniejących postów jednorazowo;
  - szukać przez `Query.contains("captionSearch", term.toLowerCase())`, czyli po fragmencie tekstu w dowolnym miejscu.
- Tagi:
  - zapisywać je małymi literami w osobnej kolumnie `tagsSearch` (tablica);
  - szukać przez `Query.contains("tagsSearch", [term.toLowerCase()])`;
  - w UI dalej pokazywać oryginalną pisownię z `tags`.
- Wyszukiwanie dynamiczne:
  - skrócić opóźnienie (debounce) z 500 do około 250 ms;
  - szukać od 2 znaków;
  - poprzednie wyniki zostają na ekranie, dopóki nie przyjdą nowe (`placeholderData: keepPreviousData` w React Query), więc lista nie miga.
- Dodatkowo:
  - podświetlanie dopasowanego fragmentu w opisie;
  - zakładki wyników „Posts / People / Tags”.

## 6. Wyszukiwarka i paginacja w People 🟡
- Pole wyszukiwania po imieniu i nazwie użytkownika: indeks fulltext na `name` i `username`, `Query.search`.
- Infinite scroll jak na Home (`useInfiniteQuery` + `cursorAfter`).
- Opcjonalnie sortowanie: najnowsi, najpopularniejsi (liczba obserwujących).

## 7. Skeleton loadery 🟢
- Szare, pulsujące „szkielety” w kształcie elementów zamiast kółka ładowania:
  - `PostCardSkeleton` (Home)
  - `GridSkeleton` (Explore, Saved, profil)
  - `UserCardSkeleton` (People)
  - `ProfileSkeleton`
- Tailwind: `animate-pulse bg-dark-4 rounded-…`.

## 8. Potwierdzenie usunięcia posta 🟢
- ✅ `PostDetails` pyta przed usunięciem (`window.confirm`).
- ⬜ Zamienić na ostylowany modal (np. shadcn `AlertDialog`) w stylu aplikacji.
- ⬜ Po usunięciu: toast „Post deleted” i powrót na Home zamiast `navigate(-1)`.

## 9. Error boundary 🟢
- Komponent `ErrorBoundary` wokół `<Outlet />` w `RootLayout`. Błąd jednego widoku pokaże komunikat „Something went wrong” z przyciskiem „Try again” zamiast czarnego ekranu.
- Można użyć gotowej paczki `react-error-boundary`.
- Dodatkowo obsłużyć `isError` w zapytaniach (Home, Explore, Profile) z komunikatem i przyciskiem „Retry”.

---

## 10. Akceptowanie i odrzucanie follow (konta prywatne) 🟡
- Ustawienie w profilu: „Konto prywatne” (kolumna `isPrivate` w `users`).
- W `follows` kolumna `status`: `pending` lub `accepted`.
- Obserwowanie konta publicznego od razu dostaje `accepted`, a prywatnego `pending`.
- **Accept** zmienia status na `accepted`, **Decline** usuwa wiersz.
- Posty konta prywatnego widzą tylko obserwujący ze statusem `accepted`.
- Przycisk w `FollowButton`: „Follow” → „Requested” → „Unfollow”.
- Liczniki Followers i Following liczą tylko `accepted`.

## 11. Działający prawy sidebar: Requests i Suggestions 🟡
- **Requests:**
  - lista oczekujących próśb (`follows` ze statusem `pending`, gdzie `following` = ja) z avatarem i nazwą;
  - działające Accept / Decline (patrz punkt 10);
  - badge z liczbą próśb, ukryty, gdy jest 0;
  - sekcja ukryta, gdy nie ma próśb.
- **Suggestions for you:**
  - osoby, których jeszcze nie obserwuję, np. obserwowane przez moich znajomych albo najpopularniejsze;
  - avatar, nazwa i bio z bazy, ikonka follow podpięta pod `useFollowUser`;
  - kliknięcie w osobę otwiera jej profil;
  - „View all” prowadzi do People.
- Skeleton loadery podczas ładowania obu sekcji.

---

## Do dokończenia
- Listy „Followers / Following” po kliknięciu w liczniki na profilu.
- Feed „Following”: na Home przełącznik „Wszyscy / Obserwowani”.
- Uprawnienia na poziomie wierszy w `follows`: wiersz może usunąć tylko osoba, która obserwuje.
