<?php

namespace App\Modules;

use App\Repositories\UserRepositories;
use Exception;
use Illuminate\Support\Facades\Auth;

class AuthModule
{
    public static function login($username, $password)
    {
        if (empty($username) || empty($password)) {
            throw new Exception('Username atau password tidak boleh kosong');
        }

        if (!Auth::attempt(['username' => $username, 'password' => $password])) {
            throw new Exception('Username atau password anda salah');
        }

        $user = UserRepositories::fetchOne(null, $username);

        $user->token = $user->createToken($username, ['role-'.$user->role])->plainTextToken;

        return $user;
    }
}
