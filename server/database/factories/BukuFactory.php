<?php

namespace Database\Factories;

use App\Models\Buku;
use Illuminate\Database\Eloquent\Factories\Factory;

class BukuFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Buku::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'judul' => $this->faker->realText(50),
            'nomor' => mt_rand(100000, 999999),
            'stok' => mt_rand(0, 100),
            'download' => 'https://doc.lagout.org/Others/Beginning%20Programming%20for%20Dummies%2C%203rd%20Edition.pdf',
        ];
    }
}
