<?php

namespace App\Repositories;

use App\Models\AnggotaOtomasi;

class AnggotaOtomasiRepositories
{
    public static function store($params)
    {
        $data = AnggotaOtomasi::create([
            'perpustakaan_id' => $params['perpustakaan_id'],
            'pelajar' => $params['pelajar'] ?? null,
            'guru' => $params['guru'] ?? null,
            'pengunjung_perbulan' => $params['pengunjung_perbulan'] ?? null,
            'pinjaman_perbulan' => $params['pinjaman_perbulan'] ?? null,
            'perpustakaan_digital' => $params['perpustakaan_digital'] ?? null,
        ]);

        return $data;
    }

    public static function update($params)
    {
        $data = AnggotaOtomasi::where('perpustakaan_id', $params['perpustakaan_id'])
                              ->update([
                                    'pelajar' => $params['pelajar'] ?? null,
                                    'guru' => $params['guru'] ?? null,
                                    'pengunjung_perbulan' => $params['pengunjung_perbulan'] ?? null,
                                    'pinjaman_perbulan' => $params['pinjaman_perbulan'] ?? null,
                                    'perpustakaan_digital' => $params['perpustakaan_digital'] ?? null,
                                ]);

        return $data;
    }
}
