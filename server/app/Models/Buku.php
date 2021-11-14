<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Buku extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function perpustakaan()
    {
        return $this->belongsTo(Perpustakaan::class);
    }

    public function status_buku()
    {
        return $this->hasMany(StatusBuku::class);
    }
}
