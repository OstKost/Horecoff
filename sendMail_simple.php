<?php
// Включаем буферизацию вывода, чтобы избежать случайных выводов перед JSON
ob_start();

// Подключаем config.php из корневой директории проекта
// Используем несколько вариантов пути для совместимости с разными окружениями
$configPath = null;
if (file_exists(__DIR__ . '/config.php')) {
    $configPath = __DIR__ . '/config.php';
} elseif (isset($_SERVER['DOCUMENT_ROOT']) && file_exists($_SERVER['DOCUMENT_ROOT'] . '/config.php')) {
    $configPath = $_SERVER['DOCUMENT_ROOT'] . '/config.php';
} elseif (file_exists('/var/www/html/config.php')) {
    $configPath = '/var/www/html/config.php';
} else {
    // Последняя попытка - ищем в текущей директории
    $configPath = dirname(__FILE__) . '/config.php';
}
if ($configPath && file_exists($configPath)) {
    require $configPath;
} else {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['success' => false, 'message' => 'Configuration file not found'], JSON_UNESCAPED_UNICODE);
    exit;
}
$to = $username; // from config

// Функция для отправки через SMTP (MailHog для Docker)
function sendMailViaSMTP($to, $subject, $message, $headers, &$errorMessage = null) {
    // Для Docker окружения используем MailHog
    $smtpHost = 'mailhog';
    $smtpPort = 1025;
    $timeout = 30;
    
    // Парсим заголовки для получения From адреса
    $fromEmail = $to;
    if (preg_match('/From:\s*(.+?)\s*<(.+?)>/i', $headers, $matches)) {
        $fromEmail = $matches[2];
    } elseif (preg_match('/From:\s*(.+?)\s*$/i', $headers, $matches)) {
        $fromEmail = trim($matches[1]);
    }
    
    // Формируем полное письмо (заголовки + тело)
    $fullMessage = $headers . "\r\n\r\n" . $message;
    
    // Открываем соединение с SMTP сервером
    $socket = @fsockopen($smtpHost, $smtpPort, $errno, $errstr, $timeout);
    if (!$socket) {
        $errorMessage = "Не удалось подключиться к SMTP серверу $smtpHost:$smtpPort. Ошибка: $errstr ($errno)";
        return false;
    }
    
    // Простой SMTP handshake для MailHog
    $response = fgets($socket, 515);
    if (strpos($response, '220') !== 0) {
        $errorMessage = "SMTP сервер не ответил приветствием. Ответ: " . trim($response);
        fclose($socket);
        return false;
    }
    
    // EHLO/HELO - обязательная команда перед MAIL FROM
    fputs($socket, "EHLO localhost\r\n");
    $response = '';
    // Читаем все строки ответа на EHLO (может быть несколько строк)
    while ($line = fgets($socket, 515)) {
        $response .= $line;
        if (substr(trim($line), 3, 1) === ' ') {
            break; // Последняя строка ответа заканчивается пробелом после кода
        }
    }
    if (strpos($response, '250') === false) {
        // Пробуем HELO если EHLO не поддерживается
        fputs($socket, "HELO localhost\r\n");
        $response = fgets($socket, 515);
        if (strpos($response, '250') !== 0) {
            $errorMessage = "Ошибка EHLO/HELO. Ответ: " . trim($response);
            fclose($socket);
            return false;
        }
    }
    
    // MAIL FROM
    fputs($socket, "MAIL FROM: <$fromEmail>\r\n");
    $response = fgets($socket, 515);
    if (strpos($response, '250') !== 0) {
        $errorMessage = "Ошибка MAIL FROM. Ответ: " . trim($response);
        fclose($socket);
        return false;
    }
    
    // RCPT TO
    fputs($socket, "RCPT TO: <$to>\r\n");
    $response = fgets($socket, 515);
    if (strpos($response, '250') !== 0) {
        $errorMessage = "Ошибка RCPT TO. Ответ: " . trim($response);
        fclose($socket);
        return false;
    }
    
    // DATA
    fputs($socket, "DATA\r\n");
    $response = fgets($socket, 515);
    if (strpos($response, '354') !== 0) {
        $errorMessage = "Ошибка DATA. Ответ: " . trim($response);
        fclose($socket);
        return false;
    }
    
    // Отправляем письмо
    fputs($socket, $fullMessage . "\r\n.\r\n");
    $response = fgets($socket, 515);
    if (strpos($response, '250') !== 0) {
        $errorMessage = "Ошибка отправки письма. Ответ: " . trim($response);
        fclose($socket);
        return false;
    }
    
    // QUIT
    fputs($socket, "QUIT\r\n");
    fclose($socket);
    
    return true;
}

// Проверка капчи
$captchaAnswer = isset($_POST['captcha_answer']) ? intval($_POST['captcha_answer']) : 0;
$captchaResult = isset($_POST['captcha_result']) ? intval($_POST['captcha_result']) : 0;

if ($captchaAnswer !== $captchaResult) {
    ob_clean(); // Очищаем буфер
    $response = [ 'success' => FALSE, 'message' => 'Неверный ответ на вопрос безопасности' ];
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode( $response, JSON_UNESCAPED_UNICODE );
    exit;
}

$subject = "Новая заявка с сайта";

$message = 'Пришла новая заявка с сайта<br><br>';
$message .= "Имя: " . $_POST['name'] . "<br>";
$message .= "Контакт: " . $_POST['email'] . "<br>";
$message .= "Комментарий: " . $_POST['comment'] . "<br>";

// Формируем заголовки для стандартной функции mail() (без Subject, т.к. он передается отдельным параметром)
$headersMail = "MIME-Version: 1.0" . "\r\n";
$headersMail .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headersMail .= 'From: Horecoff <' . $username . '>' . "\r\n";
// $headersMail .= 'Cc: ' . 'web@ostkost.ru' . "\r\n";

// Формируем заголовки для SMTP (с Subject)
$headersSMTP = $headersMail . "Subject: $subject" . "\r\n";

// Пробуем отправить через SMTP (MailHog), если не получается - используем стандартную функцию mail()
$errorDetails = '';
$mailSent = sendMailViaSMTP($to, $subject, $message, $headersSMTP, $errorDetails);

if (!$mailSent) {
    // Fallback на стандартную функцию mail() для production окружений
    $mailSent = @mail($to, $subject, $message, $headersMail);
    if (!$mailSent) {
        $lastError = error_get_last();
        $mailError = $lastError ? $lastError['message'] : 'Unknown error';
        $errorDetails = $errorDetails ? $errorDetails . ' | mail() error: ' . $mailError : 'mail() failed: ' . $mailError;
    }
}

if ($mailSent) {
    $response = [ 'success' => TRUE, 'message' => 'Mail success' ];
} else {
    // Включаем подробные ошибки для отладки (в production можно убрать)
    $response = [ 
        'success' => FALSE, 
        'message' => 'Mail failed',
        'error' => $errorDetails ?: 'Unknown error',
        'debug' => [
            'to' => $to,
            'smtp_host' => 'mailhog',
            'smtp_port' => 1025
        ]
    ];
}

ob_clean(); // Очищаем буфер перед выводом JSON
header('Content-Type: application/json; charset=utf-8');
echo json_encode( $response, JSON_UNESCAPED_UNICODE );
ob_end_flush();
?>