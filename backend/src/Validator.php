<?php

declare(strict_types=1);

final class Validator
{
    public static function require(array $data, array $fields): void
    {
        foreach ($fields as $field) {
            if (!isset($data[$field]) || trim((string) $data[$field]) === '') {
                Response::json(['message' => ucfirst(str_replace('_', ' ', $field)) . ' is required.'], 422);
            }
        }
    }

    public static function email(?string $email): void
    {
        if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            Response::json(['message' => 'A valid email address is required.'], 422);
        }
    }
}
