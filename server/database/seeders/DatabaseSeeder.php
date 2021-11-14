<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //USER FACTORY
        // $roles = ['admin', 'perpustakaan', 'public'];

        // foreach ($roles as $role) {
        //     $user = \App\Models\User::factory()->create([
        //         'role' => $role,
        //     ]);

        //     \App\Models\UserProfil::factory()->create([
        //         'user_id' => $user->id,
        //     ]);
        // }

        // //MASTER DATA FACTORY
        // \App\Models\Kecamatan::factory()->count(5)->create();
        // \App\Models\Kelurahan::factory()->count(5)->create();
        // \App\Models\Provinsi::factory()->count(5)->create();
        // \App\Models\Kabupaten::factory()->count(5)->create();
        // \App\Models\JenisPerpustakaan::factory()->count(5)->create();

        // //PERPUSTAKAAN FACTORY
        // for ($i = 0; $i <= 50; ++$i) {
        //     \App\Models\Perpustakaan::factory()->create([
        //         'user_id' => $user->id,
        //         'jenis_perpustakaan_id' => \App\Models\JenisPerpustakaan::inRandomOrder()->first()->id,
        //         'kecamatan' => \App\Models\Kecamatan::inRandomOrder()->first()->nama_kecamatan,
        //         'kelurahan' => \App\Models\Kelurahan::inRandomOrder()->first()->nama_kelurahan,
        //         'provinsi' => \App\Models\Provinsi::inRandomOrder()->first()->nama_provinsi,
        //         'kabupaten_kota' => \App\Models\Kabupaten::inRandomOrder()->first()->nama_kabupaten,
        //     ]);
        // }

        // //PERPUS ROLE [member / operator]
        // \App\Models\PerpustakaanRole::factory()->create([
        //     'perpustakaan_id' => \App\Models\Perpustakaan::inRandomOrder()->first()->id,
        //     'user_id' => \App\Models\User::where('role', 'perpustakaan')->inRandomOrder()->first()->id,
        //     'role' => 'operator',
        // ]);

        // \App\Models\PerpustakaanRole::factory()->create([
        //     'perpustakaan_id' => \App\Models\Perpustakaan::inRandomOrder()->first()->id,
        //     'user_id' => \App\Models\User::where('role', 'public')->inRandomOrder()->first()->id,
        //     'role' => 'member',
        // ]);

        // for ($i = 0; $i <= 1000; ++$i) {
        //     $id = \App\Models\Perpustakaan::inRandomOrder()->first()->id;

        //     \App\Models\Buku::factory()->create([
        //         'perpustakaan_id' => $id,
        //         'sampul' => 'https://loremflickr.com/200/200/book_cover?random='.$i,
        //     ]);
        // }

        for ($i = 0; $i <= 100; ++$i) {
            $status = Arr::random(['Pengajuan', 'Dipinjam', 'Dikembalikan']);

            $buku = \App\Models\Buku::inRandomOrder()->first();
            $member = \App\Models\User::where('role', 'public')->inRandomOrder()->first();
            $operator = \App\Models\User::where('role', 'perpustakaan')->inRandomOrder()->first();
            $tempo = Carbon::now()->addDays(3);

            if ($status == 'Pengajuan') {
                \App\Models\StatusBuku::create([
                    'perpustakaan_id' => $buku->perpustakaan_id,
                    'buku_id' => $buku->id,
                    'member_id' => $member->id,
                    'status' => $status,
                ]);
            } else {
                \App\Models\StatusBuku::create([
                    'perpustakaan_id' => $buku->perpustakaan_id,
                    'buku_id' => $buku->id,
                    'member_id' => $member->id,
                    'operator_id' => $operator->id,
                    'status' => $status,
                    'jatuh_tempo' => $tempo,
                ]);
            }
        }
    }
}
