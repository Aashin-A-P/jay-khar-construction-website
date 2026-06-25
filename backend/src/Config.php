<?php

declare(strict_types=1);

final class Config
{
    private static array $values = [];

    public static function load(string $path): void
    {
        self::$values = [
            'APP_ENV' => 'local',
            'APP_URL' => 'http://127.0.0.1:8080',
            'FRONTEND_URL' => 'http://127.0.0.1:5173',
            'MAIL_TO' => 'jay_khar@yahoo.com',
            'MAIL_FROM' => 'no-reply@jaykharconstruction.com',
            'MAIL_ENABLED' => 'false',
            'SMTP_HOST' => 'smtp.gmail.com',
            'SMTP_PORT' => '587',
            'SMTP_SECURE' => 'tls',
            'SMTP_USERNAME' => '',
            'SMTP_PASSWORD' => '',
            'SMTP_TIMEOUT' => '20',
        ];

        if (!is_file($path)) {
            return;
        }

        foreach (file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $line) {
            $line = trim($line);
            if ($line === '' || str_starts_with($line, '#') || !str_contains($line, '=')) {
                continue;
            }
            [$key, $value] = explode('=', $line, 2);
            self::$values[trim($key)] = trim($value);
        }
    }

    public static function get(string $key, ?string $default = null): ?string
    {
        return self::$values[$key] ?? $default;
    }
}
