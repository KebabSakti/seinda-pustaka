<?php

namespace App\Http\Controllers;

use App\Modules\AuthModule;
use Exception;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $token = AuthModule::login($request->username, $request->password);

            return response()->json($token);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }
}
