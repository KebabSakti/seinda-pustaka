<?php

namespace App\Repositories;

use App\Models\SumberDayaManusia;

class SumberDayaManusiaRepositories
{
    public static function store($params)
    {
        $data = SumberDayaManusia::create([
            'perpustakaan_id' => $params['perpustakaan_id'],
            'seluruh_pegawai' => $params['seluruh_pegawai'] ?? null,
            'pns' => $params['pns'] ?? null,
            'pejabat_fungsional' => $params['pejabat_fungsional'] ?? null,
            'honorer' => $params['honorer'] ?? null,
            'kepala_perpustakaan' => $params['kepala_perpustakaan'] ?? null,
            'tenaga_teknis_perpustakaan' => $params['tenaga_teknis_perpustakaan'] ?? null,
            'tenaga_administrasi' => $params['tenaga_administrasi'] ?? null,
            'sd' => $params['sd'] ?? null,
            'smp' => $params['smp'] ?? null,
            'diklat' => $params['diklat'] ?? null,
            's1_perpustakaan' => $params['s1_perpustakaan'] ?? null,
            's1_diklat' => $params['s1_diklat'] ?? null,
            's1_non_perpustakaan' => $params['s1_non_perpustakaan'] ?? null,
        ]);

        return $data;
    }
}
