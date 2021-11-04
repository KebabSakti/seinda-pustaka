<?php

namespace App\Http\Controllers;

use App\Repositories\PerpustakaanRepositories;
use Illuminate\Http\Request;

class PerpustakaanController extends Controller
{
    public function index(Request $request)
    {
        $datas = PerpustakaanRepositories::fetchMany($request);

        return response()->json($datas);
    }

    public static function store(Request $request)
    {
        $data = PerpustakaanRepositories::store($request);

        return response()->json($data);
    }
}
