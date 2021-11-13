<?php

namespace App\Repositories;

use App\Models\DataGedung;

class DataGedungRepositories
{
    public static function store($params)
    {
        $data = DataGedung::create([
            'perpustakaan_id' => $params['perpustakaan_id'],
            'luas_tanah' => $params['luas_tanah'] ?? 0,
            'luas_gedung' => $params['luas_gedung'] ?? 0,
            'luas_ruang_tamu' => $params['luas_ruang_tamu'] ?? 0,
            'luas_ruang_sirkulasi' => $params['luas_ruang_sirkulasi'] ?? 0,
            'luas_ruang_baca' => $params['luas_ruang_baca'] ?? 0,
            'luas_ruang_koleksi' => $params['luas_ruang_koleksi'] ?? 0,
            'luas_toilet' => $params['luas_toilet'] ?? 0,
            'luas_kantin' => $params['luas_kantin'] ?? 0,
        ]);

        return $data;
    }

    public static function update($params)
    {
        $data = DataGedung::updateOrCreate(
                            ['perpustakaan_id' => $params['perpustakaan_id']],
                            [
                                'luas_tanah' => $params['luas_tanah'] ?? 0,
                                'luas_gedung' => $params['luas_gedung'] ?? 0,
                                'luas_ruang_tamu' => $params['luas_ruang_tamu'] ?? 0,
                                'luas_ruang_sirkulasi' => $params['luas_ruang_sirkulasi'] ?? 0,
                                'luas_ruang_baca' => $params['luas_ruang_baca'] ?? 0,
                                'luas_ruang_koleksi' => $params['luas_ruang_koleksi'] ?? 0,
                                'luas_toilet' => $params['luas_toilet'] ?? 0,
                                'luas_kantin' => $params['luas_kantin'] ?? 0,
                            ]);

        return $data;
    }

    public static function upsert($params)
    {
        $data = DataGedung::where('perpustakaan_id', $params['perpustakaan_id'])
                          ->upsert([
                                'luas_tanah' => $params['luas_tanah'] ?? 0,
                                'luas_gedung' => $params['luas_gedung'] ?? 0,
                                'luas_ruang_tamu' => $params['luas_ruang_tamu'] ?? 0,
                                'luas_ruang_sirkulasi' => $params['luas_ruang_sirkulasi'] ?? 0,
                                'luas_ruang_baca' => $params['luas_ruang_baca'] ?? 0,
                                'luas_ruang_koleksi' => $params['luas_ruang_koleksi'] ?? 0,
                                'luas_toilet' => $params['luas_toilet'] ?? 0,
                                'luas_kantin' => $params['luas_kantin'] ?? 0,
                            ]);

        return $data;
    }

    public static function delete($params)
    {
        DataGedung::where('perpustakaan_id', $params['perpustakaan_id'])->delete();
    }
}
