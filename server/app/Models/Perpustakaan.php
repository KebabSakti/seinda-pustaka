<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Perpustakaan extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function jenis_perpustakaan()
    {
        return $this->belongsTo(\App\Models\JenisPerpustakaan::class);
    }
}
