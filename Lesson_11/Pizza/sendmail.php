<?php

// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\SMTP;

// require "PHPMailer/src/PHPMailer.php";
// require "PHPMailer/src/SMTP.php";

// $mail = new PHPMailer(true);
// $mail->Charset = 'UTF-8';
// $mail->setLanguage('ru', 'phpmailer/language/');
// $mail->IsHTML(true);

// $mail->setFrom('edgard3635@gmail.com', 'Frontend Developer');
// $mail->addAddress('edgard3635@gmail.com');
// $mail->Subject = "Hello, I'm frontend developer!";

// $body = '<h1>Зустрічай супер листа!</h1>';

// if (trim(!empty($_POST['name']))) {
// 	$body .= "<p><strong>Ім'я:</strong> " . $_POST['name'] . '</p>';
// }

// if (trim(!empty($_POST['email']))) {
// 	$body .= "<p><strong>E-mail:</strong> " . $_POST['email'] . '</p>';
// }

// if (trim(!empty($_POST['phone']))) {
// 	$body .= "<p><strong>Phone:</strong> " . $_POST['phone'] . '</p>';
// }

// if (!$mail->send()) {
// 	$message = 'Помилка';
// } else {
// 	$message = 'Дані відправлені';
// }

// $response = ['message' => $message];
// header('Content-type: application/json');
// echo json_encode($response);

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];

$name = htmlspecialchars($name);
$phone = htmlspecialchars($phone);
$email = htmlspecialchars($email);

$name = urldecode($name);
$phone = urldecode($phone);
$email = urldecode($email);

$name = trim($name);
$phone = trim($phone);
$email = trim($email);

if(mail('Edgard3635@gmail.com',
	'New message from site',
	'Name: ',
	'From: no-reply@mydomain.ru \r\n')
) {
	echo('Ok');
} else {
	echo('Error');
}

?>
