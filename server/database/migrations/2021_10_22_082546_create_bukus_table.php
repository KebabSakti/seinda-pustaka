<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBukusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bukus', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('perpustakaan_id');
            $table->bigInteger('kategori_id');
            $table->text('sampul')->nullable();
            $table->text('judul')->nullable();
            $table->text('nomor')->nullable();
            $table->integer('stok')->default(0);
            $table->text('catatan')->nullable();
            $table->text('download')->nullable();
            $table->boolean('aktif')->default(true);
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
        Schema::dropIfExists('bukus');
    }
}
