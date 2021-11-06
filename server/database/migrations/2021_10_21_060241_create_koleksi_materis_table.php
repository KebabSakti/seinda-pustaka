<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKoleksiMaterisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('koleksi_materis', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('perpustakaan_id');
            $table->integer('jumlah_buku_nonfiksi')->default(0);
            $table->integer('jumlah_buku_referensi')->default(0);
            $table->integer('jumlah_buku_fiksi')->default(0);
            $table->integer('jumlah_sk_lokal')->default(0);
            $table->integer('jumlah_terbitan_pemerintah')->default(0);
            $table->integer('jumlah_terbitan_daerah')->default(0);
            $table->integer('jumlah_peta')->default(0);
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
        Schema::dropIfExists('koleksi_materis');
    }
}
