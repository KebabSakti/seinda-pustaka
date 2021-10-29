<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $roles = ['admin', 'perpustakaan', 'public'];

        foreach ($roles as $role) {
            $user = \App\Models\User::factory()->create([
                'role' => $role,
            ]);

            \App\Models\UserProfil::factory()->create([
                'perpustakaan_id',
            ]);
        }
    }
}
