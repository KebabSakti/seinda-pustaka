<?php

namespace App\Repositories;

use App\Models\Perpustakaan;
use App\Modules\UtilityModule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PerpustakaanRepositories
{
    public static function fetchOne($id)
    {
        $data = DB::table('perpustakaans')->find($id);

        return $data;
    }

    public static function fetchMany($params)
    {
        $columns = Schema::getColumnListing('perpustakaans');

        $query = Perpustakaan::with(['jenis_perpustakaan']);

        if (!empty($params['d_start']) && !empty($params['d_end'])) {
            $query->where('tahun_berdiri_perpustakaan', '>=', $params['d_start'])
                ->where('tahun_berdiri_perpustakaan', '<=', $params['d_end']);
        }

        if (!empty($params['keyword'])) {
            $query->where(function ($query) use ($columns, $params) {
                foreach ($columns as $column) {
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

    public static function store($params)
    {
        $data = Perpustakaan::create($params);

        return $data;
    }
}
