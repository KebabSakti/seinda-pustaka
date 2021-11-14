<?php

namespace App\Repositories;

use App\Models\Provinsi;
use App\Modules\UtilityModule;
use Illuminate\Support\Facades\Schema;

class ProvinsiRepositories
{
    public static function fetchOne($params)
    {
        $data = Provinsi::find($params['id']);

        return $data;
    }

    public static function fetchMany($params = null)
    {
        $columns = Schema::getColumnListing('provinsis');

        $query = Provinsi::query();

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

        if (!empty($params['paging_size'])) {
            $datas = $query->paginate($params['paging_size']);
        } else {
            $datas = $query->get();
        }

        return $datas;
    }

    public static function store($params)
    {
        $data = Provinsi::create([
            'nama_provinsi' => $params['nama_provinsi'],
        ]);

        return $data;
    }

    public static function update($params)
    {
        $data = Provinsi::where('id', $params['id'])
                                 ->update([
                                    'nama_provinsi' => $params['nama_provinsi'],
                                 ]);

        return $data;
    }

    public static function delete($params)
    {
        Provinsi::where('id', $params['id'])->delete();
    }
}
