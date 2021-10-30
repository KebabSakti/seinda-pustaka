<?php

namespace App\Repositories;

use App\Models\User;

class UserRepositories
{
    public static function fetchOne($id, $username)
    {
        $query = User::with('userProfile');

        if (!empty($id)) {
            $query->where('id', $id);
        }

        if (!empty($username)) {
            $query->where('username', $username);
        }

        $data = $query->first();

        return $data;
    }

    public static function fetchMany($id, $username, $limit)
    {
        $query = User::with('userProfile');

        if (!empty($id)) {
            $query->where('id', $id);
        }

        if (!empty($username)) {
            $query->where('username', $username);
        }

        if (!empty($limit)) {
            $datas = $query->simplePaginate($limit);
        } else {
            $datas = $query->get();
        }

        return $datas;
    }
}
