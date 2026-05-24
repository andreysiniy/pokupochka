# Покупочка — Web + Mobile

В репозитории теперь две версии приложения:

- Web (React + Vite) — текущий сайт в корне проекта.
- Mobile (React Native + Expo) — новое мобильное приложение в папке `mobile-app`.

## Mobile (React Native)

Путь: `mobile-app`

### Стек

- Expo + React Native + TypeScript
- React Navigation (tabs + stack)
- AsyncStorage для хранения данных на устройстве

### Запуск

```bash
cd mobile-app
npm install
npm run start
```

Дополнительно:

```bash
npm run android
npm run ios
```

### Что реализовано в mobile-app

- Экраны: Главная, Каталог, Акции, Избранное, Доставка, О нас, Вакансии, Checkout.
- Скидочная карта:
  - `LoyaltyLogin` (вход по телефону с валидацией)
  - `LoyaltyCard` (баллы/уровень)
- Локальное хранение на устройстве (AsyncStorage):
  - избранное
  - корзина
  - сохраненные адреса
  - профиль checkout (имя + телефон)
  - профиль скидочной карты

### Ассеты для mobile-app

- Категорийные изображения перенесены из web-версии в:
  - `mobile-app/assets/products/*.png`
- Hero-изображение перенесено в:
  - `mobile-app/assets/hero.png`
- Иконки вкладок реализованы через `@expo/vector-icons` (Ionicons)

### UI-система в mobile-app

- Общая тема цветов и типографики: `mobile-app/src/theme.ts`
- Переиспользуемые UI-примитивы:
  - `mobile-app/src/components/ui/Card.tsx`
  - `mobile-app/src/components/ui/AppButton.tsx`
  - `mobile-app/src/components/ui/AppInput.tsx`
  - `mobile-app/src/components/ui/Screen.tsx`
- Ключевые экраны и списки переведены на единый стиль карточек/кнопок/отступов.

## Web (React + Vite)

Ниже остается описание веб-версии.

## Стек

- React 18
- TypeScript
- Vite
- React Router
- LocalStorage для сохранения пользовательских данных

## Запуск

```bash
npm install
npm run dev
```

Сборка production:

```bash
npm run build
npm run preview
```

## Страницы

### `/` — Главная

- Hero-блок с формой подписки на email (UI-форма)
- Слайдер категорий (переход в каталог с фильтром)
- Карточка перехода на вакансии
- Блок популярных товаров
- Расширенный footer: логотип, ссылки, личный кабинет, контакты

### `/catalog` — Каталог

- Полный список товаров
- Фильтрация по категориям через query-параметр `?category=`
- Карточки товаров с:
  - ценой и скидкой
  - статусом наличия
  - управлением количеством (`В корзину` / `- qty +`)
- Переход в модалку товара

### `/sale` — Акции

- Товары только со скидкой (`oldPrice > 0`)
- Те же действия, что в каталоге: избранное и корзина

### `/wishlist` — Избранное

- Товары, добавленные в избранное
- Кнопка очистки избранного
- Управление количеством и добавление в корзину

### `/jobs` — Вакансии

- Описание вакансий
- Карточки позиций
- Модалка быстрого отклика с валидацией телефона по маске `+7 (XXX) XXX-XX-XX`
- Доступна из навбара, карточки на главной и footer

### `/checkout` — Оформление заказа

- Форма данных получателя:
  - имя
  - телефон (маска + валидация)
- Адрес доставки по полям:
  - город, улица, дом, квартира, этаж, подъезд
- Сохраненные адреса (выбор/удаление)
- Итоги заказа:
  - стоимость товаров
  - стоимость доставки
  - ориентировочное время доставки
  - итоговая сумма
- После подтверждения заказа: корзина очищается, имя и телефон сохраняются

### `/delivery` — Доставка и оплата

- Условия доставки по зоне
- Стоимость и порог бесплатной доставки
- Время доставки и способы оплаты
- Блок про возврат и замену

### `/about` — О нас

- Кратко о сервисе Покупочка
- Блоки про качество, скорость и программу лояльности

### `/loyalty/login` — Вход в скидочную карту

- Вход по номеру телефона
- Маска и валидация телефона: `+7 (XXX) XXX-XX-XX`
- После успешного входа создается локальный профиль карты

### `/loyalty` — Баллы скидочной карты

- Просмотр уровня карты (Silver/Gold)
- Текущий баланс баллов
- Прогресс до уровня Gold
- История начислений/списаний баллов (localStorage)
- Кнопки перехода в каталог и выхода из карты

### `/home` — Redirect

- Редирект на `/` (совместимость со старыми ссылками)

### `*` — 404

- Страница «не найдено» с переходом на главную

## Модалки

- **Модалка товара**: детали товара и управление количеством
- **Модалка корзины**:
  - список товаров
  - `- qty +` на каждой позиции
  - мини-summary (товары, доставка, ETA, итого)
  - кнопки `Оформить заказ` и `Очистить корзину`

## Сохранение данных (LocalStorage)

- `shop.favoriteIds` — массив `number[]` с `id` избранных товаров
- `shop.cart` — массив `{ id: number, qty: number }[]`
- `shop.addresses` — массив сохраненных адресов: `id`, `label`, `city`, `street`, `house`, `apartment`, `floor`, `entrance`
- `shop.checkoutProfile` — объект профиля: `name: string`, `phoneDigits: string` (11 цифр, начинается с `7`)
- `shop.loyaltyProfile` — профиль скидочной карты: `phoneDigits`, `points`, `tier`
- `shop.loyaltyHistory.<phoneDigits>` — история операций по баллам (`title`, `delta`, `createdAt`)

Примечание: форма подписки на email в hero-блоке сейчас UI-only и не пишет данные в LocalStorage.

## Структура проекта

```text
gilka/
├─ public/
│  ├─ images/
│  │  ├─ background/
│  │  │  └─ image.png                  # фоновая картинка hero-блока
│  │  └─ products/                     # изображения товаров/категорий
│  └─ placeholders/
│     ├─ logo.svg                      # логотип (nav + footer)
│     ├─ back.svg                      # паттерн для hero
│     └─ *.svg                         # прочие заглушки
├─ src/
│  ├─ assets/
│  │  └─ footer-icons/
│  │     ├─ vk.svg
│  │     ├─ telegram.svg
│  │     ├─ youtube.svg
│  │     ├─ office.svg
│  │     ├─ phone.svg
│  │     └─ email.svg                  # SVG-иконки футера
│  ├─ components/
│  │  ├─ NavBar.tsx                    # верхняя навигация + кнопка корзины
│  │  ├─ Footer.tsx                    # 3-колоночный футер
│  │  ├─ CategorySlider.tsx            # слайдер категорий
│  │  ├─ ProductCard.tsx               # карточка товара
│  │  ├─ ProductsGrid.tsx              # сетка карточек
│  │  └─ modals/
│  │     ├─ ProductModal.tsx           # модалка товара
│  │     ├─ CartModal.tsx              # модалка корзины
│  │     └─ JobQuickModal.tsx          # быстрый отклик на вакансию
│  ├─ context/
│  │  └─ ShopContext.tsx               # глобальный state: cart, favorites, modal state
│  ├─ data/
│  │  ├─ shopData.ts                   # мок-данные товаров и категорий
│  │  └─ footerData.ts                 # конфиг ссылок и контактов футера
│  ├─ pages/
│  │  ├─ HomePage.tsx                  # главная
│  │  ├─ CatalogPage.tsx               # каталог
│  │  ├─ SalePage.tsx                  # акции
│  │  ├─ WishlistPage.tsx              # избранное
│  │  ├─ JobsPage.tsx                  # вакансии
│  │  ├─ CheckoutPage.tsx              # оформление заказа
│  │  ├─ DeliveryPage.tsx              # доставка и оплата
│  │  ├─ AboutPage.tsx                 # о сервисе
│  │  ├─ LoyaltyLoginPage.tsx           # вход в скидочную карту
│  │  ├─ LoyaltyCardPage.tsx            # просмотр баллов и уровня карты
│  │  └─ NotFoundPage.tsx              # 404
│  ├─ App.tsx                          # маршруты, общий layout, модалки
│  ├─ main.tsx                         # точка входа (BrowserRouter + ShopProvider)
│  ├─ styles.css                       # глобальные стили
│  ├─ types.ts                         # общие типы приложения
│  └─ vite-env.d.ts                    # типы для Vite и импорта SVG
├─ index.html                          # корневой HTML для Vite
├─ vite.config.js                      # конфигурация Vite
├─ tsconfig.json                       # конфигурация TypeScript
└─ README.md
```

### Как устроено приложение

- `main.tsx` поднимает `BrowserRouter` и `ShopProvider`, затем рендерит `App`.
- `App.tsx` содержит роутинг (`/`, `/catalog`, `/sale`, `/wishlist`, `/jobs`, `/checkout`, `/delivery`, `/about`, `/loyalty/login`, `/loyalty`, `*`) и общие элементы layout: `NavBar`, `Footer`, глобальные модалки.
- `pages/*` отвечают за контент конкретных экранов и собирают UI из переиспользуемых компонентов.
- `components/*` — независимые UI-блоки (карточки, сетки, слайдер, шапка, футер).
- `components/modals/*` — оверлеи поверх страниц, управляются через состояние в `ShopContext`.

### Данные и состояние

- `data/shopData.ts` — источник каталога (товары, цены, скидки, наличие, категории).
- `data/footerData.ts` — конфигурация для футера (ссылки, контакты).
- `context/ShopContext.tsx` — единый state слоя магазина:
  - `favoriteIds`
  - `cart`
  - `openedProduct`
  - `cartOpen`
  - методы изменения (`toggleFavorite`, `addToCart`, `decreaseCartItem`, `clearCart`, `clearFavorites`, и т.д.).

### Стили и ассеты

- `styles.css` содержит общую дизайн-систему на CSS-переменных (`--bg`, `--brand`, `--line` и т.д.), responsive-брейкпоинты и стили страниц/компонентов.
- `public/*` используется для статических ресурсов по прямым URL (`/placeholders/...`, `/images/...`).
- `src/assets/footer-icons/*` — SVG-иконки, импортируемые в React-компоненты (через `vite-env.d.ts`).
