<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JenisPerpustakaan extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function perpustakaan()
    {
        return $this->hasOne(\App\Models\Perpustakaan::class);
    }
}
