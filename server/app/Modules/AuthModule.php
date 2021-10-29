<?php

namespace App\Modules;

use App\Repositories\UserRepositories;
use Exception;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class AuthModule
{
    public static function token($username, $password)
    {
        if (empty($username) || empty($password)) {
            throw new Exception('Username dan password tidak boleh kosong');
        }

        if (!Auth::attempt(['username' => $username, 'password' => $password])) {
            throw new Exception('Username atau password anda salah');
        }

        $user = UserRepositories::index($username);
        $user->token = $user->createToken($username)->plainTextToken;

        return $user;
    }
}
