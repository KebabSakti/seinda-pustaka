<?php

namespace App\Repositories;

use App\Modules\UtilityModule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class JenisPerpusRepositories
{
    public static function fetchOne($keyword)
    {
        $columns = Schema::getColumnListing('jenis_perpustakaans');

        $query = DB::table('jenis_perpustakaans');

        if (!empty($keyword)) {
            $query->where(function ($query) use ($columns, $keyword) {
                foreach ($columns as $column) {
                    $query->orWhere($column, $keyword);
                }
            });
        }

        $data = $query->first();

        return $data;
    }

    public static function fetchMany($params)
    {
        $columns = Schema::getColumnListing('jenis_perpustakaans');

        $query = DB::table('jenis_perpustakaans');

        if (!empty($keyword)) {
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
}
