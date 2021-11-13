<?php

namespace App\Repositories;

use App\Models\SaranaPrasarana;

class SaranaPrasaranaRepositories
{
    public static function store($params)
    {
        $data = SaranaPrasarana::create([
            'perpustakaan_id' => $params['perpustakaan_id'] ?? 0,
            'operasional_roda_empat' => $params['operasional_roda_empat'] ?? 0,
            'operasional_roda_dua' => $params['operasional_roda_dua'] ?? 0,
            'rak_buku' => $params['rak_buku'] ?? 0,
            'rak_majalah' => $params['rak_majalah'] ?? 0,
            'rak_surat_kabar' => $params['rak_surat_kabar'] ?? 0,
            'rak_penitipan_barang' => $params['rak_penitipan_barang'] ?? 0,
            'filling_kabinet' => $params['filling_kabinet'] ?? 0,
            'meja_baca' => $params['meja_baca'] ?? 0,
            'meja_sirkulasi' => $params['meja_sirkulasi'] ?? 0,
            'meja_kerja' => $params['meja_kerja'] ?? 0,
            'kursi_kerja' => $params['kursi_kerja'] ?? 0,
            'kursi_tamu' => $params['kursi_tamu'] ?? 0,
            'komputer' => $params['komputer'] ?? 0,
            'sarana_tv' => $params['sarana_tv'] ?? 0,
            'ac' => $params['ac'] ?? 0,
        ]);

        return $data;
    }

    public static function update($params)
    {
        $data = SaranaPrasarana::updateOrCreate(
                                ['perpustakaan_id' => $params['perpustakaan_id']],
                                [
                                    'operasional_roda_empat' => $params['operasional_roda_empat'] ?? 0,
                                    'operasional_roda_dua' => $params['operasional_roda_dua'] ?? 0,
                                    'rak_buku' => $params['rak_buku'] ?? 0,
                                    'rak_majalah' => $params['rak_majalah'] ?? 0,
                                    'rak_surat_kabar' => $params['rak_surat_kabar'] ?? 0,
                                    'rak_penitipan_barang' => $params['rak_penitipan_barang'] ?? 0,
                                    'filling_kabinet' => $params['filling_kabinet'] ?? 0,
                                    'meja_baca' => $params['meja_baca'] ?? 0,
                                    'meja_sirkulasi' => $params['meja_sirkulasi'] ?? 0,
                                    'meja_kerja' => $params['meja_kerja'] ?? 0,
                                    'kursi_kerja' => $params['kursi_kerja'] ?? 0,
                                    'kursi_tamu' => $params['kursi_tamu'] ?? 0,
                                    'komputer' => $params['komputer'] ?? 0,
                                    'sarana_tv' => $params['sarana_tv'] ?? 0,
                                    'ac' => $params['ac'] ?? 0,
                                ]);

        return $data;
    }

    public static function delete($params)
    {
        SaranaPrasarana::where('perpustakaan_id', $params['perpustakaan_id'])->delete();
    }
}
