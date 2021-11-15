<?php

namespace App\Http\Controllers\Perpus;

use App\Http\Controllers\Controller;
use App\Modules\UtilityModule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class BukuController extends Controller
{
    public function index(Request $request)
    {
        $params = $request->toArray();

        $bukuCol = UtilityModule::arrayPrefix('bukus', Schema::getColumnListing('bukus'));
        $perpusCol = UtilityModule::arrayPrefix('perpustakaans', Schema::getColumnListing('perpustakaans'));
        $cols = array_merge($bukuCol, $perpusCol);

        $query = DB::table('bukus')
                   ->leftJoin('perpustakaans', 'bukus.perpustakaan_id', 'perpustakaans.id')
                   ->select(
                       'bukus.*',
                       'bukus.id as bukus.id',
                       'bukus.judul as bukus.judul',
                       'bukus.aktif as bukus.aktif',
                       'bukus.stok as bukus.stok',
                       'perpustakaans.*',
                       'perpustakaans.nama as perpustakaans.nama'
                    );

        if (!empty($params['d_start']) && !empty($params['d_end'])) {
            $query->whereDate('bukus.created_at', '>=', $params['d_start'])
                  ->whereDate('bukus.created_at', '<=', $params['d_end']);
        }

        if (!empty($params['keyword'])) {
            $query->where(function ($query) use ($cols, $params) {
                foreach ($cols as $column) {
                    $query->orWhere($column, 'like', '%'.$params['keyword'].'%');
                }
            });
        }

        if (!empty($params['sort_key']) && !empty($params['sort_mode'])) {
            $query->orderBy($params['sort_key'], UtilityModule::sorter($params['sort_mode']));
        }

        if (!empty($params['paging_size'])) {
            $datas = $query->paginate($params['paging_size']);
        } else {
            $datas = $query->get();
        }

        return $datas;
    }
}
