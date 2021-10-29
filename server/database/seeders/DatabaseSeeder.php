<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

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
                'user_id' => $user->id,
                'perpustakaan_id' => ($role == 'public') ? 1 : null,
            ]);
        }
    }
}
