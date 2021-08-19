# TestyNaFrontendzie

Do uruchomienia aplikacji potrzebujesz mieć zainstalowany oraz uruchomiony **Docker**!

#### https://www.docker.com/products/docker-desktop

### Płatność:
By uruchomić aplikację konieczne jest założenie konta na Stripe, w celu obsługi płatności (w środowisku testowym). 

Konto stworzyć można tutaj: https://dashboard.stripe.com/register

Po utworzeniu konta, w sekcji: Developers > API keys znajdziesz klucze, które należy użyć w aplikacji.
W folderze `web` jest plik `.env.example`, który należy skopiować i nazwać `.env`. Następnie 
uzupełnić w nim wartość `SNOWPACK_PUBLIC_STRIPE_PUBLIC` kopiując `Publishable key` z interfejsu Stripe’a.
Plik `.env` ma wyglądać tak:
```
SNOWPACK_PUBLIC_STRIPE_PUBLIC=pk_test_reszta_klucza
```

W folderze `server` również należy skopiować istniejący tam plik `.env.example`, nazwać go `.env` i uzupełnić wartością `Secret key` z dashboardu Stripe.
Plik `.env` ma wyglądać tak:
```
STRIPE_SECRET=sk_test_reszta_klucza
```

Oba pliki .env są uwzględnione w .gitignore, nie należy ich dołączać do repozytorium. W szczególności secret key nie powinien być publiczny, np. znaleźć się na Githubie.

### W celu uruchomienia aplikacji:

1. Zainstaluj paczki
```
    npm install
```

2. Uruchom aplikację
```
    npm start
```

### W celu uruchomienia testów e2e:

1. Uruchom apliakcję
2. Uruchom testy
```text
    npm test:e2e
```