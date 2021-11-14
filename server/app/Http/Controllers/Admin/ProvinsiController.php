<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\ProvinsiRepositories;
use Illuminate\Http\Request;

class ProvinsiController extends Controller
{
    public function index(Request $request)
    {
        $datas = ProvinsiRepositories::fetchMany($request);

        return response()->json($datas);
    }

    public function add(Request $request)
    {
    }

    public function store(Request $request)
    {
        $params = $request->toArray();

        $query = ProvinsiRepositories::store($params);

        $data = ProvinsiRepositories::fetchOne(['id' => $query->id]);

        return response()->json($data);
    }

    public function update(Request $request)
    {
        $params = $request->toArray();

        $query = ProvinsiRepositories::update($params);

        $data = ProvinsiRepositories::fetchOne(['id' => $query]);

        return response()->json($data);
    }

    public function delete(Request $request)
    {
        $params = $request->toArray();

        ProvinsiRepositories::delete($params);

        return response()->json();
    }
}
