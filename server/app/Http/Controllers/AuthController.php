<?php

namespace App\Http\Controllers;

use App\Modules\AuthModule;
use Exception;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function token(Request $request)
    {
        try {
            $token = AuthModule::token($request->username, $request->password);

            return response()->json($token);
        } catch (Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }
}
