<?php

declare(strict_types=1);

final class Mailer
{
    public static function notify(string $subject, array $fields, string $intro): void
    {
        if (Config::get('MAIL_ENABLED') !== 'true') {
            return;
        }

        self::sendSmtp(
            Config::get('MAIL_TO') ?? '',
            Config::get('MAIL_FROM') ?? '',
            $subject,
            $fields,
            $intro
        );
    }

    private static function sendSmtp(string $to, string $from, string $subject, array $fields, string $intro): void
    {
        $host = Config::get('SMTP_HOST') ?? '';
        $port = (int) Config::get('SMTP_PORT', '587');
        $timeout = (int) Config::get('SMTP_TIMEOUT', '20');
        $username = Config::get('SMTP_USERNAME') ?? '';
        $password = Config::get('SMTP_PASSWORD') ?? '';

        if ($host === '' || $to === '' || $from === '' || $username === '' || $password === '') {
            throw new RuntimeException('SMTP is not fully configured.');
        }

        $socketHost = Config::get('SMTP_SECURE') === 'ssl' ? 'ssl://' . $host : $host;
        $socket = @fsockopen($socketHost, $port, $errno, $errstr, $timeout);
        if (!$socket) {
            throw new RuntimeException("SMTP connection failed: {$errstr}");
        }

        stream_set_timeout($socket, $timeout);
        self::expect($socket, [220]);
        self::command($socket, 'EHLO ' . ($_SERVER['SERVER_NAME'] ?? 'localhost'), [250]);

        if (Config::get('SMTP_SECURE') === 'tls') {
            self::command($socket, 'STARTTLS', [220]);
            if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                fclose($socket);
                throw new RuntimeException('SMTP TLS negotiation failed.');
            }
            self::command($socket, 'EHLO ' . ($_SERVER['SERVER_NAME'] ?? 'localhost'), [250]);
        }

        self::command($socket, 'AUTH LOGIN', [334]);
        self::command($socket, base64_encode($username), [334]);
        self::command($socket, base64_encode($password), [235]);
        self::command($socket, 'MAIL FROM:<' . $from . '>', [250]);
        self::command($socket, 'RCPT TO:<' . $to . '>', [250, 251]);
        self::command($socket, 'DATA', [354]);

        $message = self::message($to, $from, $subject, $fields, $intro);
        fwrite($socket, $message . "\r\n.\r\n");
        self::expect($socket, [250]);
        self::command($socket, 'QUIT', [221]);
        fclose($socket);
    }

    private static function message(string $to, string $from, string $subject, array $fields, string $intro): string
    {
        $boundary = 'jaykhar-' . bin2hex(random_bytes(12));
        $headers = [
            'From: Jay-Khar Website <' . $from . '>',
            'To: ' . $to,
            'Subject: ' . self::header($subject),
            'Date: ' . date(DATE_RFC2822),
            'MIME-Version: 1.0',
            'Content-Type: multipart/alternative; boundary="' . $boundary . '"',
        ];

        $text = self::plainText($intro, $fields);
        $html = self::html($subject, $intro, $fields);

        return implode("\r\n", $headers)
            . "\r\n\r\n--{$boundary}\r\n"
            . "Content-Type: text/plain; charset=UTF-8\r\n\r\n"
            . $text
            . "\r\n\r\n--{$boundary}\r\n"
            . "Content-Type: text/html; charset=UTF-8\r\n\r\n"
            . $html
            . "\r\n\r\n--{$boundary}--";
    }

    private static function command($socket, string $command, array $expected): string
    {
        fwrite($socket, $command . "\r\n");
        return self::expect($socket, $expected);
    }

    private static function expect($socket, array $expected): string
    {
        $response = '';
        while (($line = fgets($socket, 515)) !== false) {
            $response .= $line;
            if (preg_match('/^\d{3}\s/', $line)) {
                break;
            }
        }

        $code = (int) substr($response, 0, 3);
        if (!in_array($code, $expected, true)) {
            throw new RuntimeException('SMTP error: ' . trim($response));
        }

        return $response;
    }

    private static function header(string $value): string
    {
        return str_replace(["\r", "\n"], '', $value);
    }

    private static function plainText(string $intro, array $fields): string
    {
        $lines = [$intro, ''];
        foreach ($fields as $label => $value) {
            $lines[] = $label . ': ' . self::stringValue($value);
        }
        return implode("\n", $lines);
    }

    private static function html(string $subject, string $intro, array $fields): string
    {
        $rows = '';
        foreach ($fields as $label => $value) {
            $rows .= '<tr>'
                . '<td style="padding:12px 16px;border-bottom:1px solid #e7e2d8;color:#6b7280;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;width:34%;">' . self::escape($label) . '</td>'
                . '<td style="padding:12px 16px;border-bottom:1px solid #e7e2d8;color:#17202a;font-size:15px;line-height:1.6;">' . nl2br(self::escape(self::stringValue($value))) . '</td>'
                . '</tr>';
        }

        return '<!doctype html><html><body style="margin:0;background:#f4f1eb;font-family:Arial,Helvetica,sans-serif;color:#17202a;">'
            . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1eb;padding:28px 12px;"><tr><td align="center">'
            . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;background:#ffffff;border:1px solid #e7e2d8;border-radius:10px;overflow:hidden;">'
            . '<tr><td style="background:#17202a;padding:28px 32px;color:#ffffff;">'
            . '<div style="color:#b8833a;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.16em;">Jay-Khar Construction</div>'
            . '<h1 style="margin:10px 0 0;font-size:26px;line-height:1.25;">' . self::escape($subject) . '</h1>'
            . '</td></tr>'
            . '<tr><td style="padding:26px 32px 10px;"><p style="margin:0;color:#53616f;font-size:16px;line-height:1.7;">' . self::escape($intro) . '</p></td></tr>'
            . '<tr><td style="padding:14px 32px 32px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e7e2d8;border-radius:8px;border-collapse:separate;border-spacing:0;overflow:hidden;">' . $rows . '</table></td></tr>'
            . '<tr><td style="background:#fbfaf7;padding:18px 32px;color:#6b7280;font-size:12px;line-height:1.6;">This email was sent from the Jay-Khar Construction website enquiry form.</td></tr>'
            . '</table>'
            . '</td></tr></table></body></html>';
    }

    private static function stringValue(mixed $value): string
    {
        $value = trim((string) $value);
        return $value === '' ? 'Not provided' : $value;
    }

    private static function escape(string $value): string
    {
        return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    }
}
