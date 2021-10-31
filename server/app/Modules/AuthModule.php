<?php

namespace App\Modules;

use App\Repositories\UserRepositories;
use Exception;
use Illuminate\Support\Facades\Auth;

class AuthModule
{
    public static function check($user)
    {
        $message = 'Akses tidak di izinkan, login untuk melanjutkan';

        if ($user->role == 'admin') {
            if (!$user->tokenCan('role-admin')) {
                throw new Exception($message);
            }
        } elseif ($user->role == 'perpustakaan') {
            if ($user->tokenCan('role-perpustakaan')) {
                throw new Exception($message);
            }
        } elseif ($user->role == 'public') {
            if ($user->tokenCan('role-public')) {
                throw new Exception($message);
            }
        } else {
            throw new Exception($message);
        }
    }

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

    public static function logout($id)
    {
        $user = UserRepositories::fetchOne($id, null);

        $user->tokens()->delete();
    }
}
