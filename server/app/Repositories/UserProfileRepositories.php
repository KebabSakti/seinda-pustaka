<?php

namespace App\Repositories;

use App\Models\UserProfil;

class UserProfileRepositories
{
    public static function store($params)
    {
        $data = UserProfil::create([
            'user_id' => $params['user_id'],
            'nama' => $params['nama'],
            'no_identitas' => $params['no_identitas'] ?? null,
            'npsn' => $params['npsn'] ?? null,
            'email' => $params['email'] ?? null,
            'no_hp' => $params['no_hp'] ?? null,
            'sekolah' => $params['sekolah'] ?? null,
            'kelas' => $params['kelas'] ?? null,
            'alamat' => $params['alamat'] ?? null,
            'catatan' => $params['catatan'] ?? null,
        ]);

        return $data;
    }

    public static function update($params)
    {
        $data = UserProfil::where('user_id', $params['user_id'])
                          ->update([
                                'nama' => $params['nama'],
                                'no_identitas' => $params['no_identitas'] ?? null,
                                'npsn' => $params['npsn'] ?? null,
                                'email' => $params['email'] ?? null,
                                'no_hp' => $params['no_hp'] ?? null,
                                'sekolah' => $params['sekolah'] ?? null,
                                'kelas' => $params['kelas'] ?? null,
                                'alamat' => $params['alamat'] ?? null,
                                'catatan' => $params['catatan'] ?? null,
                          ]);

        return $data;
    }
}
