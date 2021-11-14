<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\KonfigurasiRepositories;
use Illuminate\Http\Request;

class KonfigurasiController extends Controller
{
    public function index(Request $request)
    {
        $datas = KonfigurasiRepositories::fetchMany($request);

        return response()->json($datas);
    }

    public function show(Request $request)
    {
        $datas = KonfigurasiRepositories::fetchOne($request);

        return response()->json($datas);
    }

    public function update(Request $request)
    {
        $params = $request->toArray();

        KonfigurasiRepositories::update($params);

        $data = KonfigurasiRepositories::fetchMany();

        return response()->json($data);
    }
}
