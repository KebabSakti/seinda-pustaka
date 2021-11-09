<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDataGedungsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('data_gedungs', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('perpustakaan_id');
            $table->decimal('luas_tanah', 12, 3)->default(0.000)->nullable();
            $table->decimal('luas_gedung', 12, 3)->default(0.000)->nullable();
            $table->decimal('luas_ruang_tamu', 12, 3)->default(0.000)->nullable();
            $table->decimal('luas_ruang_sirkulasi', 12, 3)->default(0.000)->nullable();
            $table->decimal('luas_ruang_baca', 12, 3)->default(0.000)->nullable();
            $table->decimal('luas_ruang_koleksi', 12, 3)->default(0.000)->nullable();
            $table->decimal('luas_toilet', 12, 3)->default(0.000)->nullable();
            $table->decimal('luas_kantin', 12, 3)->default(0.000)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('data_gedungs');
    }
}
