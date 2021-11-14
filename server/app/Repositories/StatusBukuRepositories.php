<?php

namespace App\Repositories;

use App\Models\StatusBuku;
use App\Modules\UtilityModule;
use Illuminate\Support\Facades\Schema;

class StatusBukuRepositories
{
    public static function fetchOne($params)
    {
        $query = StatusBuku::query();

        if (!empty($params['id'])) {
            $query->where('id', $params['id']);
        }

        if (!empty($params['perpustakaan_id'])) {
            $query->where('perpustakaan_id', $params['perpustakaan_id']);
        }

        if (!empty($params['buku_id'])) {
            $query->where('buku_id', $params['buku_id']);
        }

        if (!empty($params['member_id'])) {
            $query->where('member_id', $params['member_id']);
        }

        if (!empty($params['operator_id'])) {
            $query->where('operator_id', $params['operator_id']);
        }

        if (!empty($params['status'])) {
            $query->where('status', $params['status']);
        }

        $data = $query->first();

        return $data;
    }

    public static function fetchMany($params = null)
    {
        $columns = Schema::getColumnListing('status_bukus');

        $query = StatusBuku::with(['member', 'operator', 'perpustakaan', 'buku']);

        if (!empty($params['d_start']) && !empty($params['d_end'])) {
            $query->whereDate('created_at', '>=', $params['d_start'])
                ->whereDate('created_at', '<=', $params['d_end']);
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
        $data = StatusBuku::create([
            'perpustakaan_id' => $params['perpustakaan_id'],
            'buku_id' => $params['buku_id'],
            'member_id' => $params['member_id'],
            'operator_id' => $params['operator_id'] ?? null,
            'status' => $params['status'] ?? null,
            'jatuh_tempo' => $params['jatuh_tempo'] ?? null,
        ]);

        return $data;
    }

    public static function update($params)
    {
        $data = StatusBuku::where('id', $params['id'])
                          ->update([
                            'operator_id' => $params['operator_id'] ?? null,
                            'status' => $params['status'] ?? null,
                            'jatuh_tempo' => $params['jatuh_tempo'] ?? null,
                          ]);

        return $data;
    }

    public static function delete($params)
    {
        StatusBuku::where('id', $params['id'])->delete();
    }
}
