<?php

namespace App\Http\Controllers;

use App\Repositories\DataGedungRepositories;
use App\Repositories\JenisPerpusRepositories;
use App\Repositories\KabupatenRepositories;
use App\Repositories\KecamatanRepositories;
use App\Repositories\KelurahanRepositories;
use App\Repositories\KoleksiMateriRepositories;
use App\Repositories\MendapatKoleksiRepositories;
use App\Repositories\PerpustakaanRepositories;
use App\Repositories\ProvinsiRepositories;
use App\Repositories\SumberDayaManusiaRepositories;
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
        $params = $request->toArray();

        $perpustakaan = PerpustakaanRepositories::store($params);

        $params['perpustakaan_id'] = $perpustakaan->id;

        $gedung = DataGedungRepositories::store($params);
        $sdm = SumberDayaManusiaRepositories::store($params);
        $koleksi = KoleksiMateriRepositories::store($params);

        foreach ($params['sumber_koleksi'] as $key => $value) {
            $params['sumber'] = 'sumber_koleksi';
            $params['deskripsi'] = $value;

            MendapatKoleksiRepositories::store($params);
        }

        $data = [
            'perpustakaan' => $perpustakaan,
            'gedung' => $gedung,
            'sdm' => $sdm,
            'koleksi' => $koleksi,
        ];

        return response()->json($data);
    }
}
