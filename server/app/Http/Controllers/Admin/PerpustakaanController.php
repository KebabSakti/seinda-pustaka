<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\AnggotaOtomasiRepositories;
use App\Repositories\DataGedungRepositories;
use App\Repositories\FasilitasAnggaranRepositories;
use App\Repositories\JamOperasionalRepositories;
use App\Repositories\JenisPerpusRepositories;
use App\Repositories\KabupatenRepositories;
use App\Repositories\KecamatanRepositories;
use App\Repositories\KelurahanRepositories;
use App\Repositories\KoleksiMateriRepositories;
use App\Repositories\MendapatKoleksiRepositories;
use App\Repositories\PerpustakaanRepositories;
use App\Repositories\PerpustakaanRoleRepositories;
use App\Repositories\ProvinsiRepositories;
use App\Repositories\SaranaPrasaranaRepositories;
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
        $params['user_id'] = $perpustakaan->user_id;

        DataGedungRepositories::store($params);
        SumberDayaManusiaRepositories::store($params);
        KoleksiMateriRepositories::store($params);
        JamOperasionalRepositories::store($params);
        AnggotaOtomasiRepositories::store($params);
        SaranaPrasaranaRepositories::store($params);
        FasilitasAnggaranRepositories::store($params);
        PerpustakaanRoleRepositories::store($params);

        if (!empty($params['sumber_koleksi'])) {
            foreach ($params['sumber_koleksi'] as $param) {
                $params['sumber'] = 'sumber_koleksi';
                $params['deskripsi'] = $param;

                MendapatKoleksiRepositories::store($params);
            }
        }

        if (!empty($params['alat_seleksi'])) {
            foreach ($params['alat_seleksi'] as $param) {
                $params['sumber'] = 'alat_seleksi';
                $params['deskripsi'] = $param;

                MendapatKoleksiRepositories::store($params);
            }
        }

        if (!empty($params['sistem_layanan'])) {
            foreach ($params['sistem_layanan'] as $param) {
                $params['sumber'] = 'sistem_layanan';
                $params['deskripsi'] = $param;

                MendapatKoleksiRepositories::store($params);
            }
        }

        if (!empty($params['jenis_layanan'])) {
            foreach ($params['jenis_layanan'] as $param) {
                $params['sumber'] = 'jenis_layanan';
                $params['deskripsi'] = $param;

                MendapatKoleksiRepositories::store($params);
            }
        }

        $data = PerpustakaanRepositories::fetchOne($perpustakaan->id);

        return response()->json($data);
    }

    public static function update(Request $request)
    {
        $params = $request->toArray();

        PerpustakaanRepositories::update($params);

        $params['perpustakaan_id'] = $params['id'];

        DataGedungRepositories::update($params);
        SumberDayaManusiaRepositories::update($params);
        KoleksiMateriRepositories::update($params);
        JamOperasionalRepositories::update($params);
        AnggotaOtomasiRepositories::update($params);
        SaranaPrasaranaRepositories::update($params);
        FasilitasAnggaranRepositories::update($params);

        if (!empty($params['sumber_koleksi'])) {
            foreach ($params['sumber_koleksi'] as $param) {
                $params['sumber'] = 'sumber_koleksi';
                $params['deskripsi'] = $param;

                MendapatKoleksiRepositories::update($params);
            }
        }

        if (!empty($params['alat_seleksi'])) {
            foreach ($params['alat_seleksi'] as $param) {
                $params['sumber'] = 'alat_seleksi';
                $params['deskripsi'] = $param;

                MendapatKoleksiRepositories::update($params);
            }
        }

        if (!empty($params['sistem_layanan'])) {
            foreach ($params['sistem_layanan'] as $param) {
                $params['sumber'] = 'sistem_layanan';
                $params['deskripsi'] = $param;

                MendapatKoleksiRepositories::update($params);
            }
        }

        if (!empty($params['jenis_layanan'])) {
            foreach ($params['jenis_layanan'] as $param) {
                $params['sumber'] = 'jenis_layanan';
                $params['deskripsi'] = $param;

                MendapatKoleksiRepositories::update($params);
            }
        }

        $data = PerpustakaanRepositories::fetchOne($params['perpustakaan_id']);

        return response()->json($data);
    }

    public static function delete(Request $request)
    {
        $params = $request->toArray();

        $params['perpustakaan_id'] = $params['id'];

        DataGedungRepositories::delete($params);
        SumberDayaManusiaRepositories::delete($params);
        KoleksiMateriRepositories::delete($params);
        JamOperasionalRepositories::delete($params);
        AnggotaOtomasiRepositories::delete($params);
        SaranaPrasaranaRepositories::delete($params);
        FasilitasAnggaranRepositories::delete($params);
        MendapatKoleksiRepositories::delete($params);

        PerpustakaanRepositories::delete($params);

        return response()->json();
    }
}
