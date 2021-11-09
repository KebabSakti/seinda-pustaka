<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFasilitasAnggaransTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('fasilitas_anggarans', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('perpustakaan_id');
            $table->boolean('internet')->default(false)->nullable();
            $table->boolean('fasilitas_tv')->default(false)->nullable();
            $table->boolean('kantin')->default(false)->nullable();
            $table->boolean('mushollah')->default(false)->nullable();
            $table->boolean('apbn')->default(false)->nullable();
            $table->boolean('apbd')->default(false)->nullable();
            $table->boolean('yayasan')->default(false)->nullable();
            $table->boolean('bantuan')->default(false)->nullable();
            $table->text('lainnya')->nullable();
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
        Schema::dropIfExists('fasilitas_anggarans');
    }
}
