<?php

namespace Database\Factories;

use App\Models\PerpustakaanRole;
use Illuminate\Database\Eloquent\Factories\Factory;

class PerpustakaanRoleFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = PerpustakaanRole::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            // 'role' => (mt_rand(0, 1) > 0) ? 'member' : 'operator'
        ];
    }
}
