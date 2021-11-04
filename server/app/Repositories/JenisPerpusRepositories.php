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

    public static function fetchMany($keyword = null, $sortKey = null, $sortMode = null, $dStart = null, $dEnd = null, $pagingSize = null)
    {
        $columns = Schema::getColumnListing('jenis_perpustakaans');

        $query = DB::table('jenis_perpustakaans');

        if (!empty($keyword)) {
            $query->where(function ($query) use ($columns, $keyword) {
                foreach ($columns as $column) {
                    $query->orWhere($column, 'like', '%'.$keyword.'%');
                }
            });
        }

        if (!empty($sortKey) && !empty($sortMode)) {
            $query->orderBy($sortKey, UtilityModule::sorter($sortMode));
        }

        if (!empty($pagingSize)) {
            $datas = $query->paginate($pagingSize);
        } else {
            $datas = $query->get();
        }

        return $datas;
    }
}
