<?php

namespace App\Repositories;

use App\Models\MendapatKoleksi;

class MendapatKoleksiRepositories
{
    public static function store($params)
    {
        $data = MendapatKoleksi::create([
            'perpustakaan_id' => $params['perpustakaan_id'],
            'sumber' => $params['sumber'] ?? null,
            'deskripsi' => $params['deskripsi'] ?? null,
        ]);

        return $data;
    }

    public static function update($params)
    {
        $data = MendapatKoleksi::updateOrCreate(
                                [
                                    'perpustakaan_id' => $params['perpustakaan_id'],
                                    'sumber' => $params['sumber'],
                                    'deskripsi' => $params['deskripsi'],
                                ],
                                [
                                    'perpustakaan_id' => $params['perpustakaan_id'],
                                    'sumber' => $params['sumber'] ?? null,
                                    'deskripsi' => $params['deskripsi'] ?? null,
                                ]);

        return $data;
    }

    public static function delete($params)
    {
        MendapatKoleksi::where('perpustakaan_id', $params['perpustakaan_id'])->delete();
    }
}
