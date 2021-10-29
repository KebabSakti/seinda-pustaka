<?php

namespace Database\Factories;

use App\Models\Perpustakaan;
use Illuminate\Database\Eloquent\Factories\Factory;

class PerpustakaanFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Perpustakaan::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'nama' => 'Perpustakaan '.$this->faker->name(),
            'alamat' => $this->faker->address(),
            'kecamatan' => $this->faker->state(),
            'kelurahan' => $this->faker->city(),
            'kode_pos' => $this->faker->postcode(),
            'telp' => $this->faker->phoneNumber(),
            'email' => $this->faker->email(),
            'website' => $this->faker->domainName(),
            'provinsi' => $this->faker->country(),
            'kabupaten_kota' => $this->faker->streetName(),
        ];
    }
}
