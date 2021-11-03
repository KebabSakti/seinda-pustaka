<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserProfilsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_profils', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id');
            $table->text('nama')->nullable();
            $table->text('no_identitas')->nullable();
            $table->text('npsn')->nullable();
            $table->text('email')->nullable();
            $table->text('no_hp')->nullable();
            $table->text('sekolah')->nullable();
            $table->text('kelas')->nullable();
            $table->text('alamat')->nullable();
            $table->text('catatan')->nullable();
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
        Schema::dropIfExists('user_profils');
    }
}
