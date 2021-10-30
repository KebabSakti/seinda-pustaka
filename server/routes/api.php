<?php

use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [App\Http\Controllers\AuthController::class, 'login']);
});

Route::group(['prefix' => 'admin', 'middleware' => ['auth:sanctum', 'abilities:role-admin']], function () {
    //admin route
});

Route::group(['prefix' => 'perpustakaan', 'middleware' => ['auth:sanctum', 'abilities:role-perpustakaan']], function () {
    //perpus route
});

Route::group(['prefix' => 'public', 'middleware' => ['auth:sanctum', 'abilities:role-public']], function () {
    //public route
});
