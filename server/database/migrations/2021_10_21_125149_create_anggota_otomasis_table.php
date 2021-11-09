<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnggotaOtomasisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('anggota_otomasis', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('perpustakaan_id');
            $table->integer('pelajar')->default(0)->nullable();
            $table->integer('guru')->default(0)->nullable();
            $table->integer('pengunjung_perbulan')->default(0)->nullable();
            $table->integer('pinjaman_perbulan')->default(0)->nullable();
            $table->enum('perpustakaan_digital', ['Sudah', 'Belum'])->nullable();
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
        Schema::dropIfExists('anggota_otomasis');
    }
}
