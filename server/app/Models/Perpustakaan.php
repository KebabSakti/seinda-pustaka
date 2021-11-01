<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Perpustakaan extends Model
{
    use HasFactory;

    /**
     * Get the user associated with the Perpustakaan.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function jenis_perpustakaan()
    {
        return $this->hasOne(JenisPerpustakaan::class);
    }
}
