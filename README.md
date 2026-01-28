# Star Wars Characters — React SPA

<!-- Badges (auto-updated) -->
<p>
  <a href="https://app.netlify.com/sites/rift-frontend-app/deploys">
    <img alt="Netlify Status" src="https://api.netlify.com/api/v1/badges/8ecd8d87-2517-470c-ac0b-37126e216f9f/deploy-status" />
  </a>
</p>

## Демо

Demo: https://rift-frontend-app.netlify.app

---

SPA на React + TypeScript с данными из [SWAPI](https://swapi.py4e.com/).

## Стек

- **React 18** + **TypeScript**
- **Vite**
- **Vitest** — unit-тесты
- **Biome** — линт и форматирование
- **FSD** (Feature-Sliced Design) — структура и алиасы
- **Material-UI** (в т.ч. `@mui/icons-material`) — UI
- **date-fns** — работа с датами в форме
- **React Query** — работа с API
- **React Hook Form** + **Zod** — формы и валидация
- **Zustand** — локальное состояние (редакции персонажей в localStorage)

## Запуск

```bash
npm install
npm run dev
```

Приложение: http://localhost:3000

## Скрипты

- `npm run dev` — dev-сервер
- `npm run build` — сборка
- `npm run preview` — превью сборки
- `npm run test` — тесты (watch)
- `npm run test:run` — тесты один раз
- `npm run test:ui` — тесты в UI-режиме
- `npm run lint` — проверка Biome
- `npm run lint:fix` — авто-исправления
- `npm run format` — форматирование

## Функциональность

1. **Главная** — список персонажей (карточки), поиск и пагинация через SWAPI; при загрузке — грид скелетонов.
2. **Страница персонажа** — детали и форма редактирования; изменения сохраняются локально (Zustand + localStorage), без запросов на сервер.

## Структура (FSD)

- `app` — инициализация, провайдеры (Query, Theme), роутинг
- `pages` — `characters` (список), `character-detail`
- `widgets` — `CharacterList` (поиск, пагинация сверху, сетка карточек/скелетонов)
- `features` — `character-edit` (форма, `useCharacterWithEdits`, store в localStorage, `lib` — форматы, константы селектов)
- `entities` — `character` (типы, API-хуки, `CharacterCard`, `CharacterCardSkeleton`, хелперы)
- `shared` — `api` (client, types), `config` (SWAPI URL, endpoints, query keys)

## Переменные окружения

- `VITE_SWAPI_BASE_URL` — базовый URL SWAPI (по умолчанию `https://swapi.py4e.com/api`)

## TODO / Улучшения

- **Синхронизация поиска и локальных правок** — данные поиска на главной и сохранённые в форме правки (Zustand + localStorage) не синхронизированы: в списке отображаются «сырые» данные SWAPI, на странице деталей — с учётом правок. Синхронизация не входила в задачу; в будущем можно показывать в карточках на главной уже «смерженные» с правками данные.
- **Покрытие тестами** — расширить unit‑тесты (виджеты, страницы, интеграционные сценарии).
- **Переиспользуемые UI-компоненты, Storybook и Chromatic** — вынести переиспользуемые компоненты в отдельный пакет (дизайн‑система), подключить Storybook и Chromatic для документации и визуального регрессионного тестирования.
