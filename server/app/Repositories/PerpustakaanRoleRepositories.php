<?php

namespace App\Repositories;

use App\Models\PerpustakaanRole;

class PerpustakaanRoleRepositories
{
    public static function store($params)
    {
        $data = PerpustakaanRole::create([
            'perpustakaan_id' => $params['perpustakaan_id'],
            'user_id' => $params['user_id'],
            'role' => $params['role'],
        ]);

        return $data;
    }

    public static function update($params)
    {
        $data = PerpustakaanRole::updateOrCreate(
            ['user_id' => $params['user_id']],
            [
                'perpustakaan_id' => $params['perpustakaan_id'],
            ]
        );

        return $data;
    }
}
