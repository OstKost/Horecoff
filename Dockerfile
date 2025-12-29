FROM php:8.2-fpm

# Установка необходимых расширений PHP
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    libonig-dev \
    && docker-php-ext-install zip \
    && docker-php-ext-install mbstring

# Установка рабочей директории
WORKDIR /var/www/html

# Копирование файлов проекта
COPY . /var/www/html

# Установка прав доступа
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

EXPOSE 9000

CMD ["php-fpm"]

