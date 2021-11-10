<?php

use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [App\Http\Controllers\AuthController::class, 'login']);
    Route::post('logout', [App\Http\Controllers\AuthController::class, 'logout']);

    Route::group(['middleware' => 'auth:sanctum'], function () {
        Route::post('check', [App\Http\Controllers\AuthController::class, 'check']);
    });
});

Route::group(['prefix' => 'admin', 'middleware' => ['auth:sanctum', 'abilities:role-admin']], function () {
    Route::prefix('perpus')->group(function () {
        Route::post('index', [App\Http\Controllers\PerpustakaanController::class, 'index']);
        Route::post('add', [App\Http\Controllers\PerpustakaanController::class, 'add']);
        Route::post('store', [App\Http\Controllers\PerpustakaanController::class, 'store']);
        Route::post('update', [App\Http\Controllers\PerpustakaanController::class, 'update']);
        Route::post('delete', [App\Http\Controllers\PerpustakaanController::class, 'delete']);
    });
});

Route::group(['prefix' => 'perpustakaan', 'middleware' => ['auth:sanctum', 'abilities:role-perpustakaan']], function () {
    //perpus route
});

Route::group(['prefix' => 'public', 'middleware' => ['auth:sanctum', 'abilities:role-public']], function () {
    //public route
});

//GLOBAL ROUTE [need auth]
Route::group(['prefix' => 'global', 'middleware' => ['auth:sanctum']], function () {
    Route::post('index', [App\Http\Controllers\ExtraDataContoller::class, 'index']);
});
