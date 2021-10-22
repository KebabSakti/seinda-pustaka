<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMendapatKoleksisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mendapat_koleksis', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('perpustakaan_id');
            $table->text('sumber_koleksi')->nullable();
            $table->text('alat_seleksi')->nullable();
            $table->text('layanan')->nullable();
            $table->text('jenis_layanan')->nullable();
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
        Schema::dropIfExists('mendapat_koleksis');
    }
}
