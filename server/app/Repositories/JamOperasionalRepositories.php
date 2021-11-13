<?php

namespace App\Repositories;

use App\Models\JamOperasional;

class JamOperasionalRepositories
{
    public static function store($params)
    {
        $data = JamOperasional::create([
            'perpustakaan_id' => $params['perpustakaan_id'],
            'senin_kamis' => $params['senin_kamis'] ?? null,
            'jummat' => $params['jummat'] ?? null,
            'sabtu' => $params['sabtu'] ?? null,
        ]);

        return $data;
    }

    public static function update($params)
    {
        $data = JamOperasional::updateOrCreate(
                                ['perpustakaan_id' => $params['perpustakaan_id']],
                                [
                                    'senin_kamis' => $params['senin_kamis'] ?? null,
                                    'jummat' => $params['jummat'] ?? null,
                                    'sabtu' => $params['sabtu'] ?? null,
                                ]);

        return $data;
    }

    public static function delete($params)
    {
        JamOperasional::where('perpustakaan_id', $params['perpustakaan_id'])->delete();
    }
}
