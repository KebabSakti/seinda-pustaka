<?php

namespace App\Repositories;

use App\Models\User;
use App\Modules\UtilityModule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class UserRepositories
{
    public static function fetchOne($params)
    {
        $query = User::with(['userProfile', 'perpustakaan_role']);

        if (!empty($params['id'])) {
            $query->where('id', $params['id']);
        }

        if (!empty($params['username'])) {
            $query->where('username', $params['username']);
        }

        $data = $query->first();

        return $data;
    }

    public static function fetchManyTmp($params)
    {
        $columns = Schema::getColumnListing('users');

        $query = User::with(['userProfile', 'perpustakaan_role']);

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

    public static function fetchMany($params)
    {
        $tbMain = 'users';
        $tbOne = 'user_profils';
        $tbTwo = 'perpustakaan_roles';
        $tbThree = 'perpustakaans';

        $colOne = UtilityModule::arrayPrefix($tbOne, Schema::getColumnListing($tbOne));
        $colTwo = UtilityModule::arrayPrefix($tbTwo, Schema::getColumnListing($tbTwo));
        $colThree = UtilityModule::arrayPrefix($tbThree, Schema::getColumnListing($tbThree));
        $cols = array_merge($colOne, $colTwo, $colThree);

        $query = DB::table($tbMain)
                   ->leftJoin($tbOne, $tbOne.'.user_id', $tbMain.'.id')
                   ->leftJoin($tbTwo, $tbTwo.'.user_id', $tbMain.'.id')
                   ->leftJoin($tbThree, $tbTwo.'.perpustakaan_id', $tbThree.'.id')
                   ->select(
                       $tbMain.'.id as '.$tbMain.'.id',
                       $tbMain.'.username as '.$tbMain.'.username',
                       $tbMain.'.role as '.$tbMain.'.role',
                       $tbMain.'.aktif as '.$tbMain.'.aktif',
                       $tbThree.'.nama as '.$tbThree.'.nama',
                       $tbOne.'.*',
                       $tbOne.'.nama as '.$tbOne.'.nama',
                       $tbOne.'.email as '.$tbOne.'.email',
                       $tbTwo.'.*',
                    );

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
        $data = User::create([
            'username' => $params['username'],
            'password' => Hash::make($params['password']),
            'role' => $params['role'],
            'aktif' => $params['aktif'],
        ]);

        return $data;
    }

    public static function update($params)
    {
        $data = User::find($params['id']);

        if (!empty($params['password'])) {
            $data->password = Hash::make($params['password']);
        }

        $data->aktif = $params['aktif'];

        $data->save();

        return $data;
    }
}
