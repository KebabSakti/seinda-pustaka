<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePerpustakaanRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('perpustakaan_roles', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('perpustakaan_id');
            $table->bigInteger('user_id');
            $table->enum('role', ['member', 'operator'])->default('member');
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
        Schema::dropIfExists('perpustakaan_roles');
    }
}
