<?php

namespace App\Repositories;

use App\Models\Perpustakaan;
use App\Modules\UtilityModule;
use Illuminate\Support\Facades\Schema;

class PerpustakaanRepositories
{
    public static function fetchOne($id)
    {
        $data = Perpustakaan::find($id);

        return $data;
    }

    public static function fetchMany($params)
    {
        $columns = Schema::getColumnListing('perpustakaans');

        $query = Perpustakaan::query();

        if (!empty($params['d_start']) && !empty($params['d_end'])) {
            $query->where('tahun_berdiri_perpustakaan', '>=', $params['d_start'])
                ->where('tahun_berdiri_perpustakaan', '<=', $params['d_end']);
        }

        if (!empty($params['keyword'])) {
            $query->where(function ($query) use ($columns, $params) {
                foreach ($columns as $column) {
                    $query->orWhere($column, 'like', '%'.$params['keyword'].'%');
                }
            });
        }

        if (!empty($params['sort_key']) && !empty($params['sort_mode'])) {
            $query->orderBy($params['sort_key'], UtilityModule::sorter($params['sort_mode']));
        }

        if (!empty($params['paging_size'])) {
            $datas = $query->paginate($params['paging_size']);
        } else {
            $datas = $query->get();
        }

        return $datas;
    }

    public static function store($params)
    {
        $data = Perpustakaan::create([
            'user_id' => $params['user_id'],
            'jenis_perpustakaan_id' => $params['jenis_perpustakaan_id'],
            'nama' => $params['nama'],
            'alamat' => $params['alamat'] ?? null,
            'kecamatan' => $params['kecamatan'] ?? null,
            'kelurahan' => $params['kelurahan'] ?? null,
            'kode_pos' => $params['kode_pos'] ?? null,
            'telp' => $params['telp'] ?? null,
            'email' => $params['email'] ?? null,
            'website' => $params['website'] ?? null,
            'provinsi' => $params['provinsi'] ?? null,
            'kabupaten_kota' => $params['kabupaten_kota'] ?? null,
            'status_perpustakaan' => $params['status_perpustakaan'] ?? null,
            'npsn' => $params['npsn'] ?? null,
            'nis' => $params['nis'] ?? null,
            'struktur_organisasi' => $params['struktur_organisasi'] ?? null,
            'nama_kepala_perpustakaan' => $params['nama_kepala_perpustakaan'] ?? null,
            'nama_kepala_instansi_induk' => $params['nama_kepala_instansi_induk'] ?? null,
            'tahun_berdiri_perpustakaan' => $params['tahun_berdiri_perpustakaan'] ?? null,
        ]);

        return $data;
    }

    public static function update($params)
    {
        $data = Perpustakaan::where('id', $params['id'])
                            ->update([
                                'user_id' => $params['user_id'],
                                'jenis_perpustakaan_id' => $params['jenis_perpustakaan_id'],
                                'nama' => $params['nama'],
                                'alamat' => $params['alamat'] ?? null,
                                'kecamatan' => $params['kecamatan'] ?? null,
                                'kelurahan' => $params['kelurahan'] ?? null,
                                'kode_pos' => $params['kode_pos'] ?? null,
                                'telp' => $params['telp'] ?? null,
                                'email' => $params['email'] ?? null,
                                'website' => $params['website'] ?? null,
                                'provinsi' => $params['provinsi'] ?? null,
                                'kabupaten_kota' => $params['kabupaten_kota'] ?? null,
                                'status_perpustakaan' => $params['status_perpustakaan'] ?? null,
                                'npsn' => $params['npsn'] ?? null,
                                'nis' => $params['nis'] ?? null,
                                'struktur_organisasi' => $params['struktur_organisasi'] ?? null,
                                'nama_kepala_perpustakaan' => $params['nama_kepala_perpustakaan'] ?? null,
                                'nama_kepala_instansi_induk' => $params['nama_kepala_instansi_induk'] ?? null,
                                'tahun_berdiri_perpustakaan' => $params['tahun_berdiri_perpustakaan'] ?? null,
                            ]);

        return $data;
    }

    public static function delete($params)
    {
        Perpustakaan::where('id', $params['perpustakaan_id'])->delete();
    }
}
