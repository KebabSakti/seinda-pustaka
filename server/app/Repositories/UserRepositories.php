<?php

namespace App\Repositories;

use App\Models\User;
use App\Modules\UtilityModule;
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

    public static function fetchMany($params)
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
