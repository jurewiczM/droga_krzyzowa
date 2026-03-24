# Droga Krzyżowa — wersja web (Vercel)

## Struktura

```
droga-krzyzowa-web/
├── public/
│   ├── index.html
│   └── audio/
│       ├── stacja_01.mp3   ← wrzuć tutaj pliki MP3
│       └── ... (stacja_01 do stacja_14)
├── src/
│   ├── App.js              ← główna nawigacja
│   ├── App.css             ← style
│   ├── stacje.js           ← teksty stacji
│   └── pages/
│       ├── ListaStacji.js
│       ├── WidokStacji.js  ← odtwarzacz audio
│       └── Mapa.js
└── package.json
```

## Lokalne uruchomienie

```bash
npm install
npm start
```

## Dodawanie plików audio

Wrzuć pliki MP3 do folderu `public/audio/`:
- `stacja_01.mp3` ... `stacja_14.mp3`

## Zmiana współrzędnych mapy

W `src/pages/Mapa.js` podmień wartości `lat` i `lng` w tablicy `WSPOLRZEDNE`
na rzeczywiste współrzędne GPS Twojej trasy.

## Wdrożenie na Vercel

1. Załóż konto na vercel.com (bezpłatne)
2. Zainstaluj Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. W folderze projektu:
   ```bash
   vercel
   ```
4. Postępuj zgodnie z instrukcjami — wybierz "Create React App"
5. Gotowe! Otrzymasz link np. https://droga-krzyzowa.vercel.app

## Alternatywnie — przez GitHub

1. Wrzuć projekt na GitHub
2. Na vercel.com kliknij "Import Project"
3. Wybierz repo — Vercel automatycznie wykryje React i wdroży

Każda zmiana w repozytorium automatycznie aktualizuje stronę.
