# Покупочка Mobile (React Native + Expo)

Мобильная версия магазина на React Native с локальным хранением данных на устройстве.

## Стек

- Expo
- React Native
- TypeScript
- React Navigation (Bottom Tabs + Native Stack)
- AsyncStorage

## Запуск

```bash
cd mobile-app
npm install
npx expo start
```

Дополнительно:

```bash
npx expo start --localhost -c
npx expo run:android --device
```

## Экраны

### Нижние вкладки

- **Главная**
  - Hero-блок
  - Кнопки перехода: Каталог, Акции, Избранное
- **О нас**
  - Описание сервиса
  - Блоки про доставку/оплату и вакансии
- **Корзина/Checkout**
  - Форма заказа
  - Сохраненные адреса (выбрать/удалить)
  - Итоги заказа
- **Скидочная карта**
  - Внутренний стек: вход по телефону + страница баллов

### Stack-экраны (открываются с Главной)

- **Каталог**
  - Фильтры по категориям (горизонтальный скролл)
  - Карточки товаров, остатки, избранное, `- / +`
- **Акции**
  - Товары со скидкой
- **Избранное**
  - Избранные товары
  - Очистка избранного

### Скидочная карта (внутренний стек)

- **LoyaltyLogin**
  - Телефон с маской `+7 (XXX) XXX-XX-XX`
  - Вход и создание локального профиля карты
- **LoyaltyCard**
  - Уровень карты (Silver/Gold)
  - Баллы
  - До Gold
  - Выход

## Хранение данных (AsyncStorage)

- `shop.favoriteIds` — избранные товары
- `shop.cart` — корзина (`id`, `qty`)
- `shop.addresses` — сохраненные адреса
- `shop.checkoutProfile` — имя + телефон для checkout
- `shop.loyaltyProfile` — профиль скидочной карты

## Структура проекта

```text
mobile-app/
├─ assets/
│  ├─ hero.png
│  ├─ logo.svg
│  └─ products/
│     ├─ vegetables.png
│     ├─ fruits.png
│     ├─ milk.png
│     ├─ bread.png
│     ├─ grocery.png
│     ├─ meat.png
│     ├─ fish.png
│     ├─ drinks.png
│     ├─ frozen.png
│     └─ sweets.png
├─ src/
│  ├─ components/
│  │  ├─ ProductList.tsx
│  │  └─ ui/
│  │     ├─ AppButton.tsx
│  │     ├─ AppInput.tsx
│  │     ├─ Card.tsx
│  │     └─ Screen.tsx
│  ├─ context/
│  │  └─ StoreContext.tsx
│  ├─ data/
│  │  └─ shopData.ts
│  ├─ screens/
│  │  ├─ HomeScreen.tsx
│  │  ├─ CatalogScreen.tsx
│  │  ├─ SaleScreen.tsx
│  │  ├─ WishlistScreen.tsx
│  │  ├─ InfoScreens.tsx
│  │  ├─ CheckoutScreen.tsx
│  │  └─ LoyaltyScreens.tsx
│  ├─ utils/
│  │  ├─ phone.ts
│  │  └─ haptics.ts
│  ├─ types/
│  │  └─ svg.d.ts
│  ├─ theme.ts
│  └─ types.ts
├─ App.tsx
├─ app.json
├─ babel.config.js
├─ metro.config.js
├─ tsconfig.json
└─ package.json
```
