<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\JenisPerpusRepositories;
use Illuminate\Http\Request;

class JenisPerpusController extends Controller
{
    public function index(Request $request)
    {
        $datas = JenisPerpusRepositories::fetchMany($request);

        return response()->json($datas);
    }

    public function add(Request $request)
    {
    }

    public function store(Request $request)
    {
        $params = $request->toArray();

        $query = JenisPerpusRepositories::store($params);

        $data = JenisPerpusRepositories::fetchOne(['id' => $query->id]);

        return response()->json($data);
    }

    public function update(Request $request)
    {
        $params = $request->toArray();

        $query = JenisPerpusRepositories::update($params);

        $data = JenisPerpusRepositories::fetchOne(['id' => $query]);

        return response()->json($data);
    }

    public function delete(Request $request)
    {
        $params = $request->toArray();

        JenisPerpusRepositories::delete($params);

        return response()->json();
    }
}
