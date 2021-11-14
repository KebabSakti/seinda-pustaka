<?php

namespace App\Repositories;

use App\Models\Konfigurasi;
use App\Modules\UtilityModule;
use Illuminate\Support\Facades\Schema;

class KonfigurasiRepositories
{
    public static function fetchOne($params)
    {
        $query = Konfigurasi::query();

        if (!empty($params['id'])) {
            $query->where('id', $params['id']);
        }

        if (!empty($params['nama'])) {
            $query->where('nama', $params['nama']);
        }

        $data = $query->first();

        return $data;
    }

    public static function fetchMany($params = null)
    {
        $columns = Schema::getColumnListing('konfigurasis');

        $query = Konfigurasi::query();

        if (!empty($params['d_start']) && !empty($params['d_end'])) {
            $query->where('created_at', '>=', $params['d_start'])
                ->where('created_at', '<=', $params['d_end']);
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

        $datas = $query->get();

        return $datas;
    }

    public static function update($params)
    {
        $data = Konfigurasi::where('id', $params['id'])
                           ->update(['nilai' => $params['nilai']]);

        return $data;
    }
}
