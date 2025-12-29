<?php
// Включаем буферизацию вывода, чтобы избежать случайных выводов перед JSON
ob_start();

// Подключаем config.php из того же каталога
require __DIR__ . '/config.php';
$to = $username; // from config

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

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// More headers
$headers .= 'From: Horecoff <' . $username . '>' . "\r\n";
// $headers .= 'Cc: ' . 'web@ostkost.ru' . "\r\n";

// Mail it
if(mail($to,$subject,$message,$headers)){
    $response = [ 'success' => TRUE, 'message' => 'Mail success' ];
} else {
    $response = [ 'success' => FALSE, 'message' => 'Mail failed' ];
}

ob_clean(); // Очищаем буфер перед выводом JSON
header('Content-Type: application/json; charset=utf-8');
echo json_encode( $response, JSON_UNESCAPED_UNICODE );
ob_end_flush();
?>