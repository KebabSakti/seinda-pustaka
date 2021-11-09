<?php

namespace App\Repositories;

use App\Models\FasilitasAnggaran;

class FasilitasAnggaranRepositories
{
    public static function store($params)
    {
        $data = FasilitasAnggaran::create([
            'perpustakaan_id' => $params['perpustakaan_id'],
            'internet' => $params['internet'] ?? null,
            'fasilitas_tv' => $params['fasilitas_tv'] ?? null,
            'kantin' => $params['kantin'] ?? null,
            'mushollah' => $params['mushollah'] ?? null,
            'apbn' => $params['apbn'] ?? null,
            'apbd' => $params['apbd'] ?? null,
            'yayasan' => $params['yayasan'] ?? null,
            'bantuan' => $params['bantuan'] ?? null,
            'lainnya' => $params['lainnya'] ?? null,
        ]);

        return $data;
    }

    public static function update($params)
    {
        $data = FasilitasAnggaran::where('perpustakaan_id', $params['perpustakaan_id'])
                                 ->update([
                                        'internet' => $params['internet'] ?? null,
                                        'fasilitas_tv' => $params['fasilitas_tv'] ?? null,
                                        'kantin' => $params['kantin'] ?? null,
                                        'mushollah' => $params['mushollah'] ?? null,
                                        'apbn' => $params['apbn'] ?? null,
                                        'apbd' => $params['apbd'] ?? null,
                                        'yayasan' => $params['yayasan'] ?? null,
                                        'bantuan' => $params['bantuan'] ?? null,
                                        'lainnya' => $params['lainnya'] ?? null,
                                    ]);

        return $data;
    }
}
