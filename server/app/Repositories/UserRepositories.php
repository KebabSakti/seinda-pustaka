<?php

namespace App\Repositories;

use App\Models\User;
use Exception;

class UserRepositories
{
    public static function index($username)
    {
        $user = User::with('userProfile')->where('username', $username)->first();

        if (empty($user)) {
            throw new Exception('User tidak ditemukan');
        }

        return $user;
    }
}
