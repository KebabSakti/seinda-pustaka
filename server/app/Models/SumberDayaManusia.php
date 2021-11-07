<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SumberDayaManusia extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function perpustakaan()
    {
        return $this->belongsTo(\App\Models\Perpustakaan::class);
    }
}
