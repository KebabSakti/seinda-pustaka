<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\KecamatanRepositories;
use Illuminate\Http\Request;

class KecamatanController extends Controller
{
    public function index(Request $request)
    {
        $datas = KecamatanRepositories::fetchMany($request);

        return response()->json($datas);
    }

    public function add(Request $request)
    {
    }

    public function store(Request $request)
    {
        $params = $request->toArray();

        $query = KecamatanRepositories::store($params);

        $data = KecamatanRepositories::fetchOne(['id' => $query->id]);

        return response()->json($data);
    }

    public function update(Request $request)
    {
        $params = $request->toArray();

        $query = KecamatanRepositories::update($params);

        $data = KecamatanRepositories::fetchOne(['id' => $query]);

        return response()->json($data);
    }

    public function delete(Request $request)
    {
        $params = $request->toArray();

        KecamatanRepositories::delete($params);

        return response()->json();
    }
}
