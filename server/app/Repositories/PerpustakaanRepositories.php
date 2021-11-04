<?php

namespace App\Repositories;

use App\Models\Perpustakaan;
use App\Modules\UtilityModule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PerpustakaanRepositories
{
    public static function fetchOne($id)
    {
        $data = DB::table('perpustakaans')->find($id);

        return $data;
    }

    public static function fetchMany($params)
    {
        $columns = Schema::getColumnListing('perpustakaans');

        $query = Perpustakaan::with(['jenis_perpustakaan']);

        if (!empty($params['d_start']) && !empty($params['d_end'])) {
            $query->where('tahun_berdiri_perpustakaan', '>=', $params['d_start'])
                ->where('tahun_berdiri_perpustakaan', '<=', $params['d_end']);
        }

        if (!empty($params['keyword'])) {
            $query->where(function ($query) use ($columns, $params) {
                foreach ($columns as $column) {
                    $query->orWhere($column, 'like', '%' . $params['keyword'] . '%');
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
            'alamat' => $params['alamat'],
            'kecamatan' => $params['kecamatan'],
            'kelurahan' => $params['kelurahan'],
            'kode_pos' => $params['kode_pos'],
            'telp' => $params['telp'],
            'email' => $params['email'],
            'website' => $params['website'],
            'provinsi' => $params['provinsi'],
            'kabupaten_kota' => $params['kabupaten_kota'],
            'status_perpustakaan' => $params['status_perpustakaan'],
            'npsn' => $params['npsn'],
            'nis' => $params['nis'],
            'struktur_organisasi' => $params['struktur_organisasi'],
            'nama_kepala_perpustakaan' => $params['nama_kepala_perpustakaan'],
            'nama_kepala_instansi_induk' => $params['nama_kepala_instansi_induk'],
            'tahun_berdiri_perpustakaan' => $params['tahun_berdiri_perpustakaan']
        ]);

        return $data;
    }
}
