<?php

namespace App\Http\Controllers;

use App\Repositories\UserRepositories;
use Exception;
use Illuminate\Http\Request;

class UtilityController extends Controller
{
    public function userExist(Request $request)
    {
        $user = UserRepositories::fetchOne($request);

        if (!empty($user)) {
            throw new Exception('Username sudah terdaftar');
        }

        return response()->json();
    }
}
