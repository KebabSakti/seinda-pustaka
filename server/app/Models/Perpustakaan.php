<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Perpustakaan extends Model
{
    use HasFactory;

    public function jenis_perpustakaan()
    {
        return $this->hasOne(\App\Models\JenisPerpustakaan::class, 'id', 'jenis_perpustakaan_id');
    }
}
