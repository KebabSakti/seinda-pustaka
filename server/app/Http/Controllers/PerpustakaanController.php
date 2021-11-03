<?php

namespace App\Http\Controllers;

use App\Repositories\PerpustakaanRepositories;
use Illuminate\Http\Request;

class PerpustakaanController extends Controller
{
    public function index(Request $request)
    {
        $datas = PerpustakaanRepositories::fetchMany($request->keyword, $request->sort_key, $request->sort_mode, $request->d_start, $request->d_end, $request->paging_size);

        return response()->json($datas);
    }
}
