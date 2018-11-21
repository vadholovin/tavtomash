<?php

// email address
$to = "spheric.zoo@gmail.com"; //вставить свой имейл
$from = "info@tavtomash.ru"; //отправитель

$subject = "Заявка на обратный звонок";
$phone = $_POST['user-phone'];
$time = $_POST['user-time'];

$message = "Телефон: {$phone}<br>\r\n";
$message .= "Время: {$time}<br>\r\n";
  
$headers = "MIME-Version: 1.0\r\nContent-type: text/html; charset=utf-8\r\n";
$headers .= "From: {$from}\r\n";
$headers .= "X-Priority: 1\r\n";


$sentMail = mail($to, $subject, $message, $headers);
if($sentMail) //output success or failure messages
{ 
  echo 'done';
}else{
  echo 'error';
}
