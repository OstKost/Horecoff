# Horecoff v2

Рефакторенная версия сайта Horecoff с модульной архитектурой.

## Структура проекта

```
horecoff_v2/
├── backup/              # Резервная копия оригинальной версии
├── src/                 # Исходный код
│   ├── index.html      # Главный HTML файл
│   ├── templates/      # Handlebars шаблоны
│   ├── styles/         # SCSS стили
│   ├── js/             # JavaScript модули
│   ├── assets/         # Ресурсы
│   └── data/           # Конфигурация
├── public/             # Публичные статические файлы
├── dist/               # Собранный проект (генерируется)
└── vite.config.js      # Конфигурация Vite
```

## Технологии

- **Vite** - Сборщик и dev сервер
- **Handlebars** - Шаблонизатор
- **SCSS** - Препроцессор CSS
- **Vanilla JS** - Без фреймворков, ES6 модули

## Установка

```bash
npm install
```

## Разработка

```bash
npm run dev
```

Запускает dev сервер на http://localhost:3000

## Сборка

```bash
npm run build
```

Создает production версию в папке `dist/`

## Предпросмотр production сборки

```bash
npm run preview
```

## Архитектура

Подробное описание архитектуры см. в [ARCHITECTURE.md](./ARCHITECTURE.md)

## Лицензия

Все права защищены © Horecoff

