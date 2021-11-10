<?php

namespace App\Repositories;

use App\Models\KoleksiMateri;

class KoleksiMateriRepositories
{
    public static function store($params)
    {
        $data = KoleksiMateri::create([
            'perpustakaan_id' => $params['perpustakaan_id'],
            'jumlah_buku_nonfiksi' => $params['jumlah_buku_nonfiksi'] ?? null,
            'jumlah_buku_referensi' => $params['jumlah_buku_referensi'] ?? null,
            'jumlah_buku_fiksi' => $params['jumlah_buku_fiksi'] ?? null,
            'jumlah_sk_lokal' => $params['jumlah_sk_lokal'] ?? null,
            'jumlah_terbitan_pemerintah' => $params['jumlah_terbitan_pemerintah'] ?? null,
            'jumlah_terbitan_daerah' => $params['jumlah_terbitan_daerah'] ?? null,
            'jumlah_peta' => $params['jumlah_peta'] ?? null,
        ]);

        return $data;
    }

    public static function update($params)
    {
        $data = KoleksiMateri::where('perpustakaan_id', $params['perpustakaan_id'])
                             ->update([
                                    'jumlah_buku_nonfiksi' => $params['jumlah_buku_nonfiksi'] ?? null,
                                    'jumlah_buku_referensi' => $params['jumlah_buku_referensi'] ?? null,
                                    'jumlah_buku_fiksi' => $params['jumlah_buku_fiksi'] ?? null,
                                    'jumlah_sk_lokal' => $params['jumlah_sk_lokal'] ?? null,
                                    'jumlah_terbitan_pemerintah' => $params['jumlah_terbitan_pemerintah'] ?? null,
                                    'jumlah_terbitan_daerah' => $params['jumlah_terbitan_daerah'] ?? null,
                                    'jumlah_peta' => $params['jumlah_peta'] ?? null,
                                ]);

        return $data;
    }

    public static function delete($params)
    {
        KoleksiMateri::where('perpustakaan_id', $params['perpustakaan_id'])->delete();
    }
}
