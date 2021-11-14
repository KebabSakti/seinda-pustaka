<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\KabupatenRepositories;
use Illuminate\Http\Request;

class KabupatenController extends Controller
{
    public function index(Request $request)
    {
        $datas = KabupatenRepositories::fetchMany($request);

        return response()->json($datas);
    }

    public function add(Request $request)
    {
    }

    public function store(Request $request)
    {
        $params = $request->toArray();

        $query = KabupatenRepositories::store($params);

        $data = KabupatenRepositories::fetchOne(['id' => $query->id]);

        return response()->json($data);
    }

    public function update(Request $request)
    {
        $params = $request->toArray();

        $query = KabupatenRepositories::update($params);

        $data = KabupatenRepositories::fetchOne(['id' => $query]);

        return response()->json($data);
    }

    public function delete(Request $request)
    {
        $params = $request->toArray();

        KabupatenRepositories::delete($params);

        return response()->json();
    }
}
