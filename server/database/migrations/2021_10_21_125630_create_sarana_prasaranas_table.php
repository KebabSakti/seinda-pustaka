<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSaranaPrasaranasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sarana_prasaranas', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('perpustakaan_id');
            $table->integer('operasional_roda_empat')->default(0)->nullable();
            $table->integer('operasional_roda_dua')->default(0)->nullable();
            $table->integer('rak_buku')->default(0)->nullable();
            $table->integer('rak_majalah')->default(0)->nullable();
            $table->integer('rak_surat_kabar')->default(0)->nullable();
            $table->integer('rak_penitipan_barang')->default(0)->nullable();
            $table->integer('filling_kabinet')->default(0)->nullable();
            $table->integer('meja_baca')->default(0)->nullable();
            $table->integer('meja_sirkulasi')->default(0)->nullable();
            $table->integer('meja_kerja')->default(0)->nullable();
            $table->integer('kursi_kerja')->default(0)->nullable();
            $table->integer('kursi_tamu')->default(0)->nullable();
            $table->integer('komputer')->default(0)->nullable();
            $table->integer('sarana_tv')->default(0)->nullable();
            $table->integer('ac')->default(0)->nullable();
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
        Schema::dropIfExists('sarana_prasaranas');
    }
}
