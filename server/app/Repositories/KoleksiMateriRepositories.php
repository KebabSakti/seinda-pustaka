<?php

namespace App\Repositories;

use App\Models\KoleksiMateri;

class KoleksiMateriRepositories
{
    public static function store($params)
    {
        $data = KoleksiMateri::create([
            'perpustakaan_id' => $params['perpustakaan_id'],
            'jumlah_buku_nonfiksi' => $params['jumlah_buku_nonfiksi'] ?? 0,
            'jumlah_buku_referensi' => $params['jumlah_buku_referensi'] ?? 0,
            'jumlah_buku_fiksi' => $params['jumlah_buku_fiksi'] ?? 0,
            'jumlah_sk_lokal' => $params['jumlah_sk_lokal'] ?? 0,
            'jumlah_terbitan_pemerintah' => $params['jumlah_terbitan_pemerintah'] ?? 0,
            'jumlah_terbitan_daerah' => $params['jumlah_terbitan_daerah'] ?? 0,
            'jumlah_peta' => $params['jumlah_peta'] ?? 0,
        ]);

        return $data;
    }
}
