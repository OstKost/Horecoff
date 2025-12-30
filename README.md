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

## Запуск через Docker

Для тестирования формы обратной связи с PHP обработкой можно использовать Docker окружение.

### Требования

- Docker
- Docker Compose

### Запуск

1. Соберите проект (если еще не собрали):
```bash
npm run build
```

2. Запустите Docker контейнеры:
```bash
docker-compose up -d
```

3. Откройте в браузере:
- Приложение: http://localhost:8080
- MailHog UI (для просмотра отправленных писем): http://localhost:8025

### Остановка

```bash
docker-compose down
```

### Тестирование формы обратной связи

1. Убедитесь, что контейнеры запущены:
```bash
docker-compose ps
```

2. Откройте http://localhost:8080 в браузере

3. Перейдите к форме обратной связи (секция "Контакты")

4. Заполните форму:
   - Введите имя
   - Введите email или телефон
   - Введите комментарий
   - Решите математическую задачу (капча) - например, "Сколько будет 5 + 3?"

5. Отправьте форму

6. Проверьте отправленные письма в MailHog:
   - Откройте http://localhost:8025
   - Вы увидите все отправленные через форму письма

### Защита от спама

Форма защищена простой математической капчей, которая генерируется случайным образом при каждой загрузке страницы. Капча проверяется как на клиенте, так и на сервере перед отправкой email.

### Настройка отправки почты для production

По умолчанию скрипт использует MailHog для тестирования в Docker окружении. Для production сервера необходимо настроить внешний SMTP сервер.

1. Откройте файл `config.php` (если его нет, создайте на основе `config.php.example`)

2. Раскомментируйте и заполните настройки SMTP:
   ```php
   define('SMTP_HOST', 'smtp.example.com');        // SMTP сервер
   define('SMTP_PORT', 587);                       // Порт (587 для TLS, 465 для SSL)
   define('SMTP_SECURE', 'tls');                   // 'tls', 'ssl' или '' (без шифрования)
   define('SMTP_AUTH', true);                      // Требуется ли аутентификация
   define('SMTP_USERNAME', 'your-email@example.com');  // Логин для SMTP
   define('SMTP_PASSWORD', 'your-password');           // Пароль для SMTP
   ```

3. Примеры популярных почтовых сервисов:
   - **Gmail**: `SMTP_HOST='smtp.gmail.com'`, `SMTP_PORT=587`, `SMTP_SECURE='tls'`, `SMTP_AUTH=true`
   - **Mail.ru**: `SMTP_HOST='smtp.mail.ru'`, `SMTP_PORT=465`, `SMTP_SECURE='ssl'`, `SMTP_AUTH=true`
   - **Yandex**: `SMTP_HOST='smtp.yandex.ru'`, `SMTP_PORT=465`, `SMTP_SECURE='ssl'`, `SMTP_AUTH=true`

4. Альтернативно можно использовать переменные окружения вместо `define()`:
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_AUTH`, `SMTP_USERNAME`, `SMTP_PASSWORD`

**Важно**: В production окружении детали ошибок не возвращаются в ответе API для безопасности.

## Интеграция с Airtable

Интеграция с Airtable API в настоящее время **отключена** по умолчанию. Модуль сохранен в `src/js/modules/airtable.optional.js` и может быть легко включен при необходимости.

### Текущий статус

- ✅ Модуль Airtable сохранен как `airtable.optional.js`
- ❌ Все вызовы Airtable API отключены
- ✅ Код не удален, готов к включению

### Как включить Airtable интеграцию

1. Откройте файл `src/js/modules/apparatus.js`

2. Раскомментируйте импорт модуля (строка 3):
   ```javascript
   import { getApparatus, getTechs, fillModalWindow, getApparatusData, getTechsData } from './airtable.optional.js';
   ```

3. Раскомментируйте вызовы функций в `initApparatusSlider()` (строки 12-14):
   ```javascript
   const apparatusData = await getApparatus();
   await getTechs();
   const machines = (apparatusData && apparatusData.records) || [];
   ```

4. Удалите или закомментируйте строку с пустым массивом (строка 17):
   ```javascript
   // const machines = [];  // Удалить эту строку
   ```

5. Раскомментируйте вызов `fillModalWindow(id)` в функции `openModal()` (строка 63):
   ```javascript
   fillModalWindow(id);
   ```

6. Настройте конфигурацию в `src/data/config.js`:
   - Убедитесь, что `AIRTABLE_CONFIG` содержит правильные значения
   - Для production рекомендуется использовать переменные окружения:
     ```javascript
     API_KEY: import.meta.env.VITE_AIRTABLE_API_KEY || 'your-api-key'
     ```

7. Пересоберите проект:
   ```bash
   npm run build
   ```

### Как отключить Airtable интеграцию

Чтобы отключить Airtable интеграцию, выполните обратные действия:
1. Закомментируйте импорт модуля
2. Закомментируйте все вызовы функций Airtable
3. Установите `machines = []` (пустой массив)
4. Закомментируйте вызов `fillModalWindow(id)`

### Структура данных Airtable

Модуль работает с двумя таблицами Airtable:
- **apparatus** - таблица с оборудованием (кофемашины)
- **techs** - таблица с техническими характеристиками

Подробнее о структуре данных и полях см. в комментариях файла `src/js/modules/airtable.optional.js`.

## Архитектура

Подробное описание архитектуры см. в [ARCHITECTURE.md](./ARCHITECTURE.md)

## Лицензия

Все права защищены © Horecoff

