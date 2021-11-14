<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\KelurahanRepositories;
use Illuminate\Http\Request;

class KelurahanController extends Controller
{
    public function index(Request $request)
    {
        $datas = KelurahanRepositories::fetchMany($request);

        return response()->json($datas);
    }

    public function add(Request $request)
    {
    }

    public function store(Request $request)
    {
        $params = $request->toArray();

        $query = KelurahanRepositories::store($params);

        $data = KelurahanRepositories::fetchOne(['id' => $query->id]);

        return response()->json($data);
    }

    public function update(Request $request)
    {
        $params = $request->toArray();

        $query = KelurahanRepositories::update($params);

        $data = KelurahanRepositories::fetchOne(['id' => $query]);

        return response()->json($data);
    }

    public function delete(Request $request)
    {
        $params = $request->toArray();

        KelurahanRepositories::delete($params);

        return response()->json();
    }
}
