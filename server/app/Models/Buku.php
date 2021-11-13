<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Buku extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $with = ['perpustakaan'];

    public function perpustakaan()
    {
        return $this->belongsTo(Perpustakaan::class);
    }
}
