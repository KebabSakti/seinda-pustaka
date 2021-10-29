<?php

use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('token', [App\Http\Controllers\AuthController::class, 'token']);
});
