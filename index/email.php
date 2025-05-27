<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Autoload do Composer (ou caminho manual se baixou sem Composer)
require 'vendor/autoload.php'; // ou 'PHPMailer/src/PHPMailer.php' se for manual

$mail = new PHPMailer(true);

try {
    // Configurações do servidor SMTP do Outlook
    $mail->isSMTP();
    $mail->Host       = 'smtp.office365.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'FourDeskSolutions@outlook.com'; // seu e-mail Outlook
    $mail->Password   = 'banana777'; // sua senha ou senha de app
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    // Remetente e destinatário
    $mail->setFrom('FourDeskSolutions@outlook.com', 'Formulário do Site');
    $mail->addAddress('FourDeskSolutions@outlook.com'); // Você mesmo recebe o email

    // Conteúdo
    $mail->isHTML(false);
    $mail->Subject = 'Nova solicitação de simulação de TI';
    $mail->Body    =
        "Nome: {$_POST['nome']}\n" .
        "Empresa: {$_POST['empresa']}\n" .
        "Telefone: {$_POST['telefone']}\n" .
        "Email: {$_POST['email']}\n" .
        "Mensagem:\n{$_POST['mensagem']}";

    $mail->send();
    echo 'Mensagem enviada com sucesso!';
} catch (Exception $e) {
    echo "Erro ao enviar a mensagem: {$mail->ErrorInfo}";
}
