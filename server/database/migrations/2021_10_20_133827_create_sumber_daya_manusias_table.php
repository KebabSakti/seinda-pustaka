<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSumberDayaManusiasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sumber_daya_manusias', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('perpustakaan_id');
            $table->integer('seluruh_pegawai')->default(0);
            $table->integer('pns')->default(0);
            $table->integer('pejabat_fungsional')->default(0);
            $table->integer('honorer')->default(0);
            $table->integer('kepala_perpustakaan')->default(0);
            $table->integer('tenaga_teknis_perpustakaan')->default(0);
            $table->integer('tenaga_administrasi')->default(0);
            $table->integer('sd')->default(0);
            $table->integer('smp')->default(0);
            $table->integer('diklat')->default(0);
            $table->integer('s1_perpustakaan')->default(0);
            $table->integer('s1_diklat')->default(0);
            $table->integer('s1_non_perpustakaan')->default(0);
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
        Schema::dropIfExists('sumber_daya_manusias');
    }
}
