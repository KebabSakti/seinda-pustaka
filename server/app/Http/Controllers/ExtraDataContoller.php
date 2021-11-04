<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ExtraDataContoller extends Controller
{
    public function index(Request $request)
    {
        $datas = [
            'kecamatan' => \App\Repositories\KecamatanRepositories::fetchMany(),
            'kabupaten' => \App\Repositories\KabupatenRepositories::fetchMany(),
            'kelurahan' => \App\Repositories\KelurahanRepositories::fetchMany(),
            'provinsi' => \App\Repositories\ProvinsiRepositories::fetchMany(),
            'jenis_perpustakaan' => \App\Repositories\JenisPerpusRepositories::fetchMany(null, 'level', 'desc'),
        ];

        return response()->json($datas);
    }
}
