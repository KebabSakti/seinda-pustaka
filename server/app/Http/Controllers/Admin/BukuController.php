<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\BukuRepositories;
use App\Repositories\PerpustakaanRepositories;
use Illuminate\Http\Request;

class BukuController extends Controller
{
    public function index(Request $request)
    {
        $datas = BukuRepositories::fetchMany($request);

        return response()->json($datas);
    }

    public function add(Request $request)
    {
        $datas = PerpustakaanRepositories::fetchMany($request);

        return $datas;
    }

    public function store(Request $request)
    {
        $params = $request->toArray();

        if ($request->hasFile('sampul')) {
            $request->validate([
                'sampul' => 'image',
            ]);

            $params['sampul'] = url('files/'.$request->sampul->store(''));
        }

        if ($request->hasFile('download')) {
            $request->validate([
                'download' => 'mimes:pdf',
            ]);

            $params['download'] = url('files/'.$request->download->store(''));
        }

        $buku = BukuRepositories::store($params);

        $data = BukuRepositories::fetchOne($buku->id);

        return response()->json($data);
    }

    public function update(Request $request)
    {
        $params = $request->except(['sampul', 'download']);

        if ($request->hasFile('sampul')) {
            $request->validate([
                'sampul' => 'image',
            ]);

            $params['sampul'] = url('files/'.$request->sampul->store(''));
        }

        if ($request->hasFile('download')) {
            $request->validate([
                'download' => 'mimes:pdf',
            ]);

            $params['download'] = url('files/'.$request->download->store(''));
        }

        $buku = BukuRepositories::update($params);

        $data = BukuRepositories::fetchOne($buku->id);

        return response()->json($data);
    }

    public function delete(Request $request)
    {
        $params = $request->toArray();

        BukuRepositories::delete($params);

        return response()->json();
    }
}
