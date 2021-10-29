<?php

namespace Database\Factories;

use App\Models\UserProfil;
use Illuminate\Database\Eloquent\Factories\Factory;

class UserProfilFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = UserProfil::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'user_id' => $this->faker->uuid(),
            'nama' => $this->faker->name(),
            'no_identitas' => $this->faker->numberBetween(100000000, 999999999),
            'npsn' => $this->faker->uuid(),
            'email' => $this->faker->email(),
            'no_hp' => $this->faker->phoneNumber(),
            'sekolah' => 'Sekolah '.$this->faker->streetName(),
            'kelas' => $this->faker->numberBetween(1, 12),
            'alamat' => $this->faker->address(),
        ];
    }
}
