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

    public static function fetchMany($keyword = null, $sortKey = null, $sortMode = null, $dStart = null, $dEnd = null)
    {
        $columns = Schema::getColumnListing('perpustakaans');

        $query = Perpustakaan::with(['jenis_perpustakaan']);

        if (!empty($dStart) && !empty($dEnd)) {
            $query->where('tahun_berdiri_perpustakaan', '>=', $dStart)
                ->where('tahun_berdiri_perpustakaan', '<=', $dEnd);
        }

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

        $datas = $query->paginate(10);

        return $datas;
    }
}
