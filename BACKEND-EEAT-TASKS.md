# ТЗ для backend (greenbus-backend) — E-E-A-T

> E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) — фреймворк Google
> для оценки качества/надёжности контента в поиске и AI-ответах. Фронтенд уже отдаёт
> сигналы (Schema.org, hreflang, canonical, FAQ, trust-блок, robots/AI-боты, llms.txt),
> но **они питаются данными из бэкенда**. Ниже — что нужно от API, по приоритетам.

Базовый URL: `https://greenbus-backend.onrender.com/api/v1`
Языки контента: `uk` (основной), `ru`, `en`.

---

## P0 — блокеры индексации (делать первыми)

### P0.1 Облегчить `GET /countries/slug/{slug}` → Trust + индексация ⭐ ГЛАВНЫЙ БЛОКЕР
**Замер прода (germany):** весь payload **1727 КБ**, из них **`locations` = 1697 КБ** (76 городов).
Причина: **каждый город тянет полный HTML-`description` ~19.5 КБ** (76 × 19.5 ≈ 1.5 МБ).
Next не кэширует (лимит 2 МБ), TTFB высокий → Германия в GSC = `Discovered, currently not indexed`.

> На хабе страны нужны только **названия городов** (для ссылок). Описания городов используются
> на отдельных страницах `/all-countries/{country}/{city}/`, а не на хабе.

**Сделать:** лёгкий вариант ответа для хаба страны (через `?view=hub`) — в `locations` оставить
**только** `{ id, slug, translations }`, выкинуть `description`, `locationType`, `timezone`, `region`:
```jsonc
GET /countries/slug/germany?view=hub
{
  "id": 12,
  "slug": "germany",
  "isoCode": "DE",                 // NEW — для areaServed/addressCountry
  "priceFrom": 1500,               // NEW — MIN цена по маршрутам страны (см. P0.3)
  "currency": "UAH",               // NEW
  "translations": [{ "language": "uk", "countryName": "Німеччина" }],
  // ВЕРХНИЙ description страны — ОСТАВИТЬ (он рендерится на хабе, ~17 КБ):
  "description": [{ "language": "uk", "description": "<HTML страны>", "updatedAt": "..." }],
  "locations": [
    // у городов оставить ТОЛЬКО id/slug/translations:
    { "id": 85, "slug": "berlin", "translations": [{ "language": "uk", "locationName": "Берлін" }] }
    // ВЫКИНУТЬ у каждого города: description (~19.5 КБ ×76 = 1.5 МБ балласта!), locationType, timezone, region
  ]
}
```
**Ожидаемый результат: 1727 КБ → ~55 КБ** (76 городов × ~0.5 КБ + описание страны 17 КБ).

### P0.2 ~~Контент страны~~ — НЕ требуется (проверено на проде)
`country.description[lang]` **уже адекватный**: germany uk **409 слів**, ru 520, en 498; poland 226-282;
ukraine 255-335. Это нормальная глубина — **не тонко**. Расширение до 700+ слов — опциональная
оптимизация только для приоритетных стран (см. P2.5), не блокер.

### P0.3 Денормализованный `priceFrom` (цена для SEO) → Trust/Accuracy
**Сейчас:** в Offer-schema идёт `route.price ?? 0` (0 = невалидный Offer), валюта `UAH` хардкодом.
Живые цены из поиска для SEO не годятся (меняются ежедневно → рассинхрон со schema).

**Сделать:** cron (раз в сутки) считает и кэширует:
```
Route.priceFrom    = MIN(price) по живым рейсам маршрута за ближайшие N дней
Route.offerCount   = кол-во доступных рейсов (для AggregateOffer)
Route.currency     = валюта (вместо хардкода)
Route.priceUpdatedAt = время пересчёта (для priceValidUntil)
Country.priceFrom  = MIN по маршрутам страны (для хаба)
```
Если рейсов нет → `priceFrom = null` (фронт не выводит Offer, а не 0).

---

## P1 — авторство и доверие

### P1.1 Сущность Author для блога → Expertise/Authoritativeness
**Сейчас:** автор статей анонимный («аналітики GreenBus») — провал теста Google «Who created it».
**Сделать:** модель Author + связь `Article.authorId`, отдавать в API статьи:
```jsonc
"author": {
  "id": 1, "slug": "olena-koval",
  "name": "Олена Коваль",
  "role": "редакторка з подорожей",
  "photoUrl": "https://.../olena.jpg",
  "bio": [{ "language": "uk", "text": "<досвід, кваліфікація>" }],
  "credentials": ["8 років у сфері пасажирських перевезень"],
  "socialLinks": { "linkedin": "https://...", "x": "https://..." }
}
```
Фронт сделает byline + **Person schema** + страницы `/author/{slug}`.

### P1.2 Отзывы/рейтинг → Trust (AggregateRating)
**Сейчас:** в schema нет рейтинга (выдумывать нельзя).
**Сделать:** модель Review + агрегат:
```jsonc
// GET /reviews/aggregate?subjectType=route&subjectId=123
{ "ratingValue": 4.7, "reviewCount": 138 }
// Review: { rating 1..5, authorName, text, lang, createdAt, isPublished }
```
Фронт включит `AggregateRating` в Organization/BusTrip — **только при наличии реальных отзывов**.

### P1.3 Перевозчики и условия → Trust (YMYL-сигналы)
**Сделать:**
```
Carrier        { id, name, licenseNo, logoUrl, translations[] }
RouteCarrier   { routeId, carrierId }        // m2m
RefundPolicy   { id, routeId|carrierId, language, text(HTML) }
PaymentMethod  { id, code(visa|mastercard|applepay|googlepay), title }
```
На странице маршрута фронт покажет перевозчиков, способы оплаты и правила возврата
у точки покупки + дополнит `BusTrip`/`Offer`.

---

## P2 — глубина и свежесть

### P2.1 Структурированные поля маршрута → Experience
```
Route.durationMinutes  int     // BusTrip — длительность
Route.isActive         bool    // quality gate: indexable только true + есть данные
Route.description[lang] (HTML)  // расширить (из него парсится FAQ)
```

### P2.2 Таймстемпы свежести → Trust
`createdAt`/`updatedAt` на описаниях страны, города, маршрута (у статей уже есть).
Фронт отдаёт `datePublished`/`dateModified`.

### P2.3 Article: метаданные → Expertise/Freshness
```
Article.publishedAt  datetime  // отдельно от createdAt → datePublished
Article.status       draft|published
ArticlePhoto.alt     string    // alt-текст для картинок
```

### P2.5 (опционально) Расширение контента приоритетных стран → Experience
Контент уже адекватен (germany ~500 слов). Опционально для топ-спроса (Германия, Польша) —
дотянуть до 700-900 слов: «Документи та кордон», «Багаж», региональные маршруты. Не блокер.

### P2.4 Юр-данные организации → Trust
```
OrgSettings { legalName, address{country,locality,postalCode,street}, phones[], email, socialLinks[] }
```
*(Значения предоставляет владелец; фронт впишет в Organization schema.)*

---

## Маппинг на E-E-A-T

| Столп | Задачи |
|---|---|
| Experience | P0.2 контент страны, P2.1 поля маршрута |
| Expertise | P0.2, P1.1 авторы |
| Authoritativeness | P1.1 авторы (+ внешний линкбилдинг — отдельно) |
| Trustworthiness | P0.1 скорость, P0.3 корректные цены, P1.2 отзывы, P1.3 перевозчики/условия, P2.2 даты, P2.4 юр-данные |

## Затронутые эндпоинты
- `GET /countries/slug/{slug}` → добавить `?view=hub`, isoCode, priceFrom, currency, облегчить
- `GET /countries` → priceFrom на элемент списка (для хабов)
- `GET /locations/slug/{slug}` → description[lang], updatedAt
- `GET /routes/favorite-routes/by-slug` → priceFrom, offerCount, currency, durationMinutes, carriers, refundPolicy, isActive
- `GET /articles` → author, publishedAt, status, photo.alt
- `GET /reviews/aggregate` (NEW)
- `GET /carriers`, `/payment-methods` (NEW, если нужны отдельно)

## Acceptance criteria
1. `/countries/slug/germany?view=hub` ≈ 55 КБ (с 1727 КБ), TTFB заметно ниже; в `locations` нет `description`.
2. У `CountryDescription` есть `updatedAt` (для `dateModified`). Контент уже адекватен — расширение опционально (P2.5).
3. `route.priceFrom` наполняется cron'ом из живых рейсов; при отсутствии рейсов = `null`.
4. Статьи возвращают непустого `author` с bio и credentials.
5. `/reviews/aggregate` отдаёт реальные `ratingValue`/`reviewCount` (или 0 при отсутствии).
6. У маршрута доступны `carriers`, `refundPolicy`, `paymentMethods`.

## Что фронт включит сразу после данных
- P0.1+P0.2 → блок «Популярні маршрути до Німеччини» (ссылки на `/routes/`) + полный контент хаба.
- P0.3 → `Offer`→`AggregateOffer` (lowPrice/offerCount/priceValidUntil), фикс `?? 0`.
- P1.1 → byline + Person schema + `/author/{slug}`.
- P1.2 → `AggregateRating` в schema.
- P2.4 → `legalName`/`address` в Organization.
