<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Perpustakaan extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $with = ['jenis_perpustakaan', 'data_gedung', 'sumber_daya_manusia', 'koleksi_materi', 'mendapat_koleksi'];

    public function jenis_perpustakaan()
    {
        return $this->belongsTo(\App\Models\JenisPerpustakaan::class);
    }

    public function data_gedung()
    {
        return $this->hasOne(\App\Models\DataGedung::class);
    }

    public function sumber_daya_manusia()
    {
        return $this->hasOne(\App\Models\SumberDayaManusia::class);
    }

    public function koleksi_materi()
    {
        return $this->hasOne(\App\Models\KoleksiMateri::class);
    }

    public function mendapat_koleksi()
    {
        return $this->hasMany(\App\Models\MendapatKoleksi::class);
    }
}
