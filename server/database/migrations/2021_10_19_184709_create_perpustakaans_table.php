<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePerpustakaansTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('perpustakaans', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id');
            $table->text('jenis_perpustakaan_id');
            $table->text('nama');
            $table->text('alamat')->nullable();
            $table->text('kecamatan')->nullable();
            $table->text('kelurahan')->nullable();
            $table->string('kode_pos')->nullable();
            $table->string('telp')->nullable();
            $table->string('email')->nullable();
            $table->text('website')->nullable();
            $table->text('provinsi')->nullable();
            $table->text('kabupaten_kota')->nullable();
            $table->text('status_perpustakaan')->nullable();
            $table->text('npsn')->nullable();
            $table->text('nis')->nullable();
            $table->text('struktur_organisasi')->nullable();
            $table->text('nama_kepala_perpustakaan')->nullable();
            $table->text('nama_kepala_instansi_induk')->nullable();
            $table->integer('tahun_berdiri_perpustakaan')->nullable();
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
        Schema::dropIfExists('perpustakaans');
    }
}
