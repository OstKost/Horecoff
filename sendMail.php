<?php
require_once '../config.php';
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
require '../PHPMailer/src/Exception.php';
require '../PHPMailer/src/PHPMailer.php';
require '../PHPMailer/src/SMTP.php';

//Load Composer's autoloader
// require 'vendor/autoload.php';

//Create an instance; passing `true` enables exceptions
try {
//     $mail = new PHPMailer();
    echo 'success3';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$e}";
}

//
// try {
//     // Form
//     $name = $_POST['name'];
//     $email = $_POST['email'];
//     $comment = $_POST['comment'];
//
//     //Server settings
//     $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
//     $mail->isSMTP();                                            //Send using SMTP
//     $mail->Host       = 'smtp.mail.ru';                         //Set the SMTP server to send through
//     $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
//     $mail->Username   = $username;                              //SMTP username
//     $mail->Password   = $password;                              //SMTP password
//     $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
//     $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
//
//     // Localization
// //     $mail->setLanguage('ru', '/PHPMailer/language');
//
//     //Recipients
//     $mail->setFrom('sale@horecoffsochi.ru', 'Horecoff Sale');
//     $mail->addAddress('sale@horecoffsochi.ru', 'Horecoff Sale');     //Add a recipient
// //     $mail->addAddress('ellen@example.com');               //Name is optional
// //     $mail->addReplyTo('info@example.com', 'Information');
// //     $mail->addCC('cc@example.com');
// //     $mail->addBCC('bcc@example.com');
//
//     //Attachments
// //     $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
// //     $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name
//
//     //Content
//     $mail->isHTML(true);                                  //Set email format to HTML
//     $mail->Subject = 'Here is the subject';
//     $mail->Body    = 'This is the HTML message body <b>in bold!</b>' . $name . $email . $comment;
//     $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
//
//     $mail->send();
//     echo 'Message has been sent';
// } catch (Exception $e) {
//     echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
// }
?>
