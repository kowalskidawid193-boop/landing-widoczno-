BizBox Widocznosc - landing page

Pliki:
  index.html     cala strona (jeden plik, bez bibliotek)
  api/lead.ts    funkcja Vercel: przyjmuje formularz i przekazuje do webhooka Make
  .env.example   nazwy zmiennych srodowiskowych

Wdrozenie na Vercel:
  1. Wrzuc ten folder jako projekt (Framework: Other).
  2. W Settings -> Environment Variables dodaj LEAD_WEBHOOK_URL i LEAD_WEBHOOK_SECRET.
  3. Redeploy.
  4. W Make dodaj filtr: secret = LEAD_WEBHOOK_SECRET.

Do uzupelnienia w index.html: dane w stopce ([E-MAIL KONTAKTOWY], [TELEFON]),
dane administratora w polityce prywatnosci (nazwa, adres, NIP, data, dostawcy, okres),
oraz calUrl (link do Cal.com) w skrypcie na dole pliku.
