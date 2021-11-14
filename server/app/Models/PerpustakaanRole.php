<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PerpustakaanRole extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $with = ['perpustakaan'];

    /**
     * Get the user that owns the PerpustakaanRole.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }

    /**
     * Get the user that owns the PerpustakaanRole.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function perpustakaan()
    {
        return $this->belongsTo(\App\Models\Perpustakaan::class);
    }
}
