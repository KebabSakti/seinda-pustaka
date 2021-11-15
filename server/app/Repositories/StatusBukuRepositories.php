<?php

namespace App\Repositories;

use App\Models\StatusBuku;
use App\Modules\UtilityModule;
use Illuminate\Support\Facades\DB;
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

    public static function fetchManytmp($params = null)
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

    public static function fetchMany($params)
    {
        $tbMain = 'status_bukus';
        $tbOne = 'perpustakaans';
        $tbTwo = 'bukus';
        $tbThree = 'user_profils';

        $colOne = UtilityModule::arrayPrefix($tbOne, Schema::getColumnListing($tbOne));
        $colTwo = UtilityModule::arrayPrefix($tbTwo, Schema::getColumnListing($tbTwo));
        $colThree = UtilityModule::arrayPrefix($tbThree, Schema::getColumnListing($tbThree));
        $cols = array_merge($colOne, $colTwo, $colThree);

        $query = DB::table($tbMain)
                   ->leftJoin($tbOne, $tbOne.'.id', $tbMain.'.perpustakaan_id')
                   ->leftJoin($tbTwo, $tbTwo.'.id', $tbMain.'.buku_id')
                   ->leftJoin($tbThree, $tbThree.'.user_id', $tbMain.'.member_id')
                   ->select(
                       $tbOne.'.*',
                       $tbTwo.'.*',
                       $tbMain.'.id as '.$tbMain.'.id',
                       $tbMain.'.member_id as '.$tbMain.'.member_id',
                       $tbMain.'.operator_id as '.$tbMain.'.operator_id',
                       $tbMain.'.status as '.$tbMain.'.status',
                       $tbMain.'.jatuh_tempo as '.$tbMain.'.jatuh_tempo',
                       $tbMain.'.created_at as '.$tbMain.'.created_at',
                       $tbOne.'.id as '.$tbOne.'.id',
                       $tbOne.'.nama as '.$tbOne.'.nama',
                       $tbTwo.'.id as '.$tbTwo.'.id',
                       $tbTwo.'.judul as '.$tbTwo.'.judul',
                       $tbTwo.'.sampul as '.$tbTwo.'.sampul',
                       $tbThree.'.id as '.$tbThree.'.id',
                       $tbThree.'.nama as '.$tbThree.'.nama',
                    );

        if (!empty($params['id'])) {
            $query->where($tbMain.'.id', $params['id']);
        }

        if (!empty($params['perpustakaan_id'])) {
            $query->where($tbMain.'.perpustakaan_id', $params['perpustakaan_id']);
        }

        if (!empty($params['buku_id'])) {
            $query->where($tbMain.'.buku_id', $params['buku_id']);
        }

        if (!empty($params['member_id'])) {
            $query->where($tbMain.'.member_id', $params['member_id']);
        }

        if (!empty($params['operator_id'])) {
            $query->where($tbMain.'.operator_id', $params['operator_id']);
        }

        if (!empty($params['status'])) {
            $query->where($tbMain.'.status', $params['status']);
        }

        if (!empty($params['d_start']) && !empty($params['d_end'])) {
            $query->whereDate($tbMain.'.created_at', '>=', $params['d_start'])
                  ->whereDate($tbMain.'.created_at', '<=', $params['d_end']);
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
