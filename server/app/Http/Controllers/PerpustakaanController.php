<?php

namespace App\Http\Controllers;

use App\Repositories\JenisPerpusRepositories;
use App\Repositories\KabupatenRepositories;
use App\Repositories\KecamatanRepositories;
use App\Repositories\KelurahanRepositories;
use App\Repositories\PerpustakaanRepositories;
use App\Repositories\ProvinsiRepositories;
use Illuminate\Http\Request;

class PerpustakaanController extends Controller
{
    public function index(Request $request)
    {
        $datas = PerpustakaanRepositories::fetchMany($request);

        return response()->json($datas);
    }

    public static function add(Request $request)
    {
        $datas = [
            'kecamatan' => KecamatanRepositories::fetchMany(),
            'kabupaten' => KabupatenRepositories::fetchMany(),
            'kelurahan' => KelurahanRepositories::fetchMany(),
            'provinsi' => ProvinsiRepositories::fetchMany(),
            'jenis_perpustakaan' => JenisPerpusRepositories::fetchMany(['sort_key' => 'level', 'sort_mode' => 'desc']),
        ];

        return response()->json($datas);
    }

    public static function store(Request $request)
    {
        $data = PerpustakaanRepositories::store($request);

        return response()->json($data);
    }
}
