<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStatusBukusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('status_bukus', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('perpustakaan_id');
            $table->bigInteger('buku_id');
            $table->bigInteger('user_id');
            $table->boolean('pinjam')->default(true);
            $table->boolean('internal')->default(true);
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
        Schema::dropIfExists('status_bukus');
    }
}
