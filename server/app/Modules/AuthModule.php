<?php

namespace App\Modules;

use Exception;
use Illuminate\Support\Str;

class AuthModule
{
    public static function token($username, $password)
    {
        if (empty($username) || empty($password)) {
            throw new Exception('Username dan password tidak boleh kosong');
        }

        return Str::uuid();
    }
}
