<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StatusBuku extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function member()
    {
        return $this->belongsTo(UserProfil::class, 'member_id', 'user_id');
    }

    public function operator()
    {
        return $this->belongsTo(UserProfil::class, 'operator_id', 'user_id');
    }

    public function perpustakaan()
    {
        return $this->belongsTo(Perpustakaan::class);
    }

    public function buku()
    {
        return $this->belongsTo(Buku::class);
    }
}
