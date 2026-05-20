# Покупочка — frontend витрина магазина

React + TypeScript приложение интернет-магазина с каталогом, корзиной, избранным, оформлением заказа и страницей вакансий.

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
- `App.tsx` содержит роутинг (`/`, `/catalog`, `/sale`, `/wishlist`, `/jobs`, `/checkout`, `*`) и общие элементы layout: `NavBar`, `Footer`, глобальные модалки.
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
