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
            'kode_pos' => $this->faker->postcode(),
            'telp' => $this->faker->phoneNumber(),
            'email' => $this->faker->email(),
            'website' => $this->faker->domainName(),
            'status_perpustakaan' => 'Negeri',
            'npsn' => $this->faker->creditCardNumber(),
            'struktur_organisasi' => $this->faker->word(),
            'nama_kepala_perpustakaan' => $this->faker->name(),
            'nama_kepala_instansi_induk' => $this->faker->name(),
            'tahun_berdiri_perpustakaan' => $this->faker->year(),
        ];
    }
}
