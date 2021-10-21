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
            $table->decimal('pns', 12, 3)->default(0.000);
            $table->decimal('pejabat_fungsional', 12, 3)->default(0.000);
            $table->decimal('honorer', 12, 3)->default(0.000);
            $table->decimal('kepala_perpustakaan', 12, 3)->default(0.000);
            $table->decimal('tenaga_teknis_perpustakaan', 12, 3)->default(0.000);
            $table->decimal('tenaga_administrasi', 12, 3)->default(0.000);
            $table->decimal('sd', 12, 3)->default(0.000);
            $table->decimal('smp', 12, 3)->default(0.000);
            $table->decimal('diklat', 12, 3)->default(0.000);
            $table->decimal('s1_perpustakaan', 12, 3)->default(0.000);
            $table->decimal('s1_diklat', 12, 3)->default(0.000);
            $table->decimal('s1_non_perpustakaan', 12, 3)->default(0.000);
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
