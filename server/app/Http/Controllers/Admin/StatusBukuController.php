<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\StatusBukuRepositories;
use Illuminate\Http\Request;

class StatusBukuController extends Controller
{
    public function index(Request $request)
    {
        $datas = StatusBukuRepositories::fetchMany($request);

        return response()->json($datas);
    }

    public function add(Request $request)
    {
    }

    public function store(Request $request)
    {
        $params = $request->toArray();

        $query = StatusBukuRepositories::store($params);

        $data = StatusBukuRepositories::fetchOne(['id' => $query->id]);

        return response()->json($data);
    }

    public function update(Request $request)
    {
        $params = $request->toArray();

        $query = StatusBukuRepositories::update($params);

        $data = StatusBukuRepositories::fetchOne(['id' => $query]);

        return response()->json($data);
    }

    public function delete(Request $request)
    {
        $params = $request->toArray();

        StatusBukuRepositories::delete($params);

        return response()->json();
    }
}
