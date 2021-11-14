<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Perpustakaan extends Model
{
    use HasFactory;

    protected $guarded = [];

    // protected $with = ['jenis_perpustakaan', 'data_gedung', 'sumber_daya_manusia', 'koleksi_materi', 'mendapat_koleksi', 'jam_operasional', 'anggota_otomasi', 'sarana_prasarana', 'fasilitas_anggaraan'];

    public function jenis_perpustakaan()
    {
        return $this->belongsTo(JenisPerpustakaan::class);
    }

    public function data_gedung()
    {
        return $this->hasOne(DataGedung::class);
    }

    public function sumber_daya_manusia()
    {
        return $this->hasOne(SumberDayaManusia::class);
    }

    public function koleksi_materi()
    {
        return $this->hasOne(KoleksiMateri::class);
    }

    public function mendapat_koleksi()
    {
        return $this->hasMany(MendapatKoleksi::class);
    }

    public function jam_operasional()
    {
        return $this->hasOne(JamOperasional::class);
    }

    public function anggota_otomasi()
    {
        return $this->hasOne(AnggotaOtomasi::class);
    }

    public function sarana_prasarana()
    {
        return $this->hasOne(SaranaPrasarana::class);
    }

    public function fasilitas_anggaraan()
    {
        return $this->hasOne(FasilitasAnggaran::class);
    }

    public function buku()
    {
        return $this->hasMany(Buku::class);
    }
}
