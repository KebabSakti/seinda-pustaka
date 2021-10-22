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
            $table->integer('pelajar')->default(0);
            $table->integer('guru')->default(0);
            $table->integer('pengunjung_perbulan')->default(0);
            $table->integer('pinjaman_perbulan')->default(0);
            $table->enum('perpustakaan_digital', ['Sudah', 'Belum'])->default(0);
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
