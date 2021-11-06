<?php

namespace App\Repositories;

use App\Models\SumberDayaManusia;

class SumberDayaManusiaRepositories
{
    public static function store($params)
    {
        $data = SumberDayaManusia::create([
            'perpustakaan_id' => $params['perpustakaan_id'],
            'seluruh_pegawai' => $params['seluruh_pegawai'] ?? 0,
            'pns' => $params['pns'] ?? 0,
            'pejabat_fungsional' => $params['pejabat_fungsional'] ?? 0,
            'honorer' => $params['honorer'] ?? 0,
            'kepala_perpustakaan' => $params['kepala_perpustakaan'] ?? 0,
            'tenaga_teknis_perpustakaan' => $params['tenaga_teknis_perpustakaan'] ?? 0,
            'tenaga_administrasi' => $params['tenaga_administrasi'] ?? 0,
            'sd' => $params['sd'] ?? 0,
            'smp' => $params['smp'] ?? 0,
            'diklat' => $params['diklat'] ?? 0,
            's1_perpustakaan' => $params['s1_perpustakaan'] ?? 0,
            's1_diklat' => $params['s1_diklat'] ?? 0,
            's1_non_perpustakaan' => $params['s1_non_perpustakaan'] ?? 0,
        ]);

        return $data;
    }
}
