<?php

namespace Database\Factories;

use App\Models\JenisPerpustakaan;
use Illuminate\Database\Eloquent\Factories\Factory;

class JenisPerpustakaanFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = JenisPerpustakaan::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nama_jenis_perpustakaan' => 'Perpustakaan '.$this->faker->company(),
            'level' => mt_rand(0, 2),
        ];
    }
}
