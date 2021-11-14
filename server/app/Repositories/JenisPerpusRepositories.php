<?php

namespace App\Repositories;

use App\Models\JenisPerpustakaan;
use App\Modules\UtilityModule;
use Illuminate\Support\Facades\Schema;

class JenisPerpusRepositories
{
    public static function fetchOne($params)
    {
        $data = JenisPerpustakaan::find($params['id']);

        return $data;
    }

    public static function fetchMany($params = null)
    {
        $columns = Schema::getColumnListing('jenis_perpustakaans');

        $query = JenisPerpustakaan::query();

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
        $data = JenisPerpustakaan::create([
            'nama_jenis_perpustakaan' => $params['nama_jenis_perpustakaan'],
            'level' => $params['level'],
            'aktif' => $params['aktif'],
        ]);

        return $data;
    }

    public static function update($params)
    {
        $data = JenisPerpustakaan::where('id', $params['id'])
                                 ->update([
                                    'nama_jenis_perpustakaan' => $params['nama_jenis_perpustakaan'],
                                    'level' => $params['level'],
                                    'aktif' => $params['aktif'],
                                 ]);

        return $data;
    }

    public static function delete($params)
    {
        JenisPerpustakaan::where('id', $params['id'])->delete();
    }
}
