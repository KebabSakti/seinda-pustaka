<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PerpustakaanRepositories
{
    public static function fetchOne($id)
    {
        $data = DB::table('perpustakaans')->find($id);

        return $data;
    }

    public static function fetchMany($keyword, $sortKey = null, $sortMode = null, $dStart = null, $dEnd = null, $limit = null)
    {
        $columns = Schema::getColumnListing('perpustakaans');

        $query = DB::table('perpustakaans');

        if (!empty($keyword)) {
            foreach ($columns as $column) {
                $query->orWhere($column, 'like', '%'.$keyword.'%');
            }
        }

        if (!empty($dStart) && !empty($dEnd)) {
            $query->whereDate('created_at', '>=', $dStart)
                ->whereDate('created_at', '<=', $dEnd);
        }

        if (!empty($sortKey) && !empty($sortMode)) {
            $query->orderBy($sortKey, $sortMode);
        }

        if (!empty($limit)) {
            $datas = $query->simplePaginate($limit);
        } else {
            $datas = $query->get();
        }

        return $datas;
    }
}
