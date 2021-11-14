<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\PerpustakaanRepositories;
use App\Repositories\PerpustakaanRoleRepositories;
use App\Repositories\UserProfileRepositories;
use App\Repositories\UserRepositories;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $datas = UserRepositories::fetchMany($request);

        return response()->json($datas);
    }

    public function add(Request $request)
    {
        $datas = PerpustakaanRepositories::fetchMany($request);

        return $datas;
    }

    public function store(Request $request)
    {
        $params = $request->toArray();

        $user = UserRepositories::store($params);

        $params['user_id'] = $user->id;
        $params['role'] = ($user->role == 'perpustakaan') ? 'operator' : 'member';

        UserProfileRepositories::store($params);

        if (!empty($params['perpustakaan_id'])) {
            PerpustakaanRoleRepositories::store($params);
        }

        $data = UserRepositories::fetchOne(['id' => $user->id]);

        return response()->json($data);
    }

    public function update(Request $request)
    {
        $params = $request->toArray();

        $user = UserRepositories::update($params);

        $params['user_id'] = $user->id;

        UserProfileRepositories::update($params);

        if (!empty($params['perpustakaan_id'])) {
            PerpustakaanRoleRepositories::update($params);
        }

        $data = UserRepositories::fetchOne(['id' => $user->id]);

        return response()->json($data);
    }

    public function delete(Request $request)
    {
        // $params = $request->toArray();

        // UserRepositories::delete($params);

        // return response()->json();
    }
}
