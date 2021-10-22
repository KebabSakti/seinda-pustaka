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
            $table->boolean('internet')->default(false);
            $table->boolean('tv')->default(false);
            $table->boolean('kantin')->default(false);
            $table->boolean('mushollah')->default(false);
            $table->boolean('apbn')->default(false);
            $table->boolean('apbd')->default(false);
            $table->boolean('yayasan')->default(false);
            $table->boolean('bantuan')->default(false);
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
