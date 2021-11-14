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
        Route::post('index', [App\Http\Controllers\Admin\PerpustakaanController::class, 'index']);
        Route::post('add', [App\Http\Controllers\Admin\PerpustakaanController::class, 'add']);
        Route::post('store', [App\Http\Controllers\Admin\PerpustakaanController::class, 'store']);
        Route::post('update', [App\Http\Controllers\Admin\PerpustakaanController::class, 'update']);
        Route::post('delete', [App\Http\Controllers\Admin\PerpustakaanController::class, 'delete']);
    });

    Route::prefix('buku')->group(function () {
        Route::post('index', [App\Http\Controllers\Admin\BukuController::class, 'index']);
        Route::post('add', [App\Http\Controllers\Admin\BukuController::class, 'add']);
        Route::post('store', [App\Http\Controllers\Admin\BukuController::class, 'store']);
        Route::post('update', [App\Http\Controllers\Admin\BukuController::class, 'update']);
        Route::post('delete', [App\Http\Controllers\Admin\BukuController::class, 'delete']);
    });

    Route::prefix('pinjam')->group(function () {
        Route::post('index', [App\Http\Controllers\Admin\StatusBukuController::class, 'index']);
        Route::post('add', [App\Http\Controllers\Admin\StatusBukuController::class, 'add']);
        Route::post('store', [App\Http\Controllers\Admin\StatusBukuController::class, 'store']);
        Route::post('update', [App\Http\Controllers\Admin\StatusBukuController::class, 'update']);
        Route::post('delete', [App\Http\Controllers\Admin\StatusBukuController::class, 'delete']);
    });

    Route::prefix('user')->group(function () {
        Route::post('index', [App\Http\Controllers\Admin\UserController::class, 'index']);
        Route::post('add', [App\Http\Controllers\Admin\UserController::class, 'add']);
        Route::post('store', [App\Http\Controllers\Admin\UserController::class, 'store']);
        Route::post('update', [App\Http\Controllers\Admin\UserController::class, 'update']);
        Route::post('delete', [App\Http\Controllers\Admin\UserController::class, 'delete']);
    });

    Route::prefix('kabupaten')->group(function () {
        Route::post('index', [App\Http\Controllers\Admin\KabupatenController::class, 'index']);
        Route::post('add', [App\Http\Controllers\Admin\KabupatenController::class, 'add']);
        Route::post('store', [App\Http\Controllers\Admin\KabupatenController::class, 'store']);
        Route::post('update', [App\Http\Controllers\Admin\KabupatenController::class, 'update']);
        Route::post('delete', [App\Http\Controllers\Admin\KabupatenController::class, 'delete']);
    });

    Route::prefix('kecamatan')->group(function () {
        Route::post('index', [App\Http\Controllers\Admin\KecamatanController::class, 'index']);
        Route::post('add', [App\Http\Controllers\Admin\KecamatanController::class, 'add']);
        Route::post('store', [App\Http\Controllers\Admin\KecamatanController::class, 'store']);
        Route::post('update', [App\Http\Controllers\Admin\KecamatanController::class, 'update']);
        Route::post('delete', [App\Http\Controllers\Admin\KecamatanController::class, 'delete']);
    });

    Route::prefix('kelurahan')->group(function () {
        Route::post('index', [App\Http\Controllers\Admin\KelurahanController::class, 'index']);
        Route::post('add', [App\Http\Controllers\Admin\KelurahanController::class, 'add']);
        Route::post('store', [App\Http\Controllers\Admin\KelurahanController::class, 'store']);
        Route::post('update', [App\Http\Controllers\Admin\KelurahanController::class, 'update']);
        Route::post('delete', [App\Http\Controllers\Admin\KelurahanController::class, 'delete']);
    });

    Route::prefix('provinsi')->group(function () {
        Route::post('index', [App\Http\Controllers\Admin\ProvinsiController::class, 'index']);
        Route::post('add', [App\Http\Controllers\Admin\ProvinsiController::class, 'add']);
        Route::post('store', [App\Http\Controllers\Admin\ProvinsiController::class, 'store']);
        Route::post('update', [App\Http\Controllers\Admin\ProvinsiController::class, 'update']);
        Route::post('delete', [App\Http\Controllers\Admin\ProvinsiController::class, 'delete']);
    });

    Route::prefix('jenis_perpus')->group(function () {
        Route::post('index', [App\Http\Controllers\Admin\JenisPerpusController::class, 'index']);
        Route::post('add', [App\Http\Controllers\Admin\JenisPerpusController::class, 'add']);
        Route::post('store', [App\Http\Controllers\Admin\JenisPerpusController::class, 'store']);
        Route::post('update', [App\Http\Controllers\Admin\JenisPerpusController::class, 'update']);
        Route::post('delete', [App\Http\Controllers\Admin\JenisPerpusController::class, 'delete']);
    });

    Route::prefix('konfigurasi')->group(function () {
        Route::post('index', [App\Http\Controllers\Admin\KonfigurasiController::class, 'index']);
        Route::post('show', [App\Http\Controllers\Admin\KonfigurasiController::class, 'show']);
        Route::post('update', [App\Http\Controllers\Admin\KonfigurasiController::class, 'update']);
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
    Route::post('user_exist', [App\Http\Controllers\UtilityController::class, 'userExist']);
});
