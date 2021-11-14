<?php

namespace App\Repositories;

use App\Models\Buku;
use App\Modules\UtilityModule;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;

class BukuRepositories
{
    public static function fetchOne($id)
    {
        $data = Buku::with(['perpustakaan', 'status_buku'])->find($id);

        return $data;
    }

    public static function fetchMany($params)
    {
        $columns = Schema::getColumnListing('bukus');

        $query = Buku::with(['perpustakaan', 'status_buku']);

        if (!empty($params['d_start']) && !empty($params['d_end'])) {
            $query->whereDate('created_at', '>=', $params['d_start'])
                ->whereDate('created_at', '<=', $params['d_end']);
        }

        if (!empty($params['keyword'])) {
            $query->where(function ($query) use ($columns, $params) {
                foreach ($columns as $column) {
                    $query->orWhere($column, 'like', '%'.$params['keyword'].'%');
                }
            });
        }

        if (!empty($params['sort_key']) && !empty($params['sort_mode'])) {
            $query->orderBy($params['sort_key'], UtilityModule::sorter($params['sort_mode']));
        }

        if (!empty($params['paging_size'])) {
            $datas = $query->paginate($params['paging_size']);
        } else {
            $datas = $query->get();
        }

        return $datas;
    }

    public static function store($params)
    {
        $data = Buku::create([
            'perpustakaan_id' => $params['perpustakaan_id'],
            'judul' => $params['judul'],
            'stok' => $params['stok'] ?? 0,
            'nomor' => $params['nomor'] ?? null,
            'catatan' => $params['catatan'] ?? null,
            'sampul' => $params['sampul'] ?? null,
            'download' => $params['download'] ?? null,
            'aktif' => $params['aktif'],
        ]);

        return $data;
    }

    public static function update($params)
    {
        $buku = Buku::find($params['id']);

        $buku->perpustakaan_id = $params['perpustakaan_id'];
        $buku->judul = $params['judul'];
        $buku->nomor = $params['nomor'] ?? null;
        $buku->stok = $params['stok'] ?? 0;
        $buku->catatan = $params['catatan'] ?? null;
        $buku->aktif = $params['aktif'];

        if (!empty($params['sampul'])) {
            Storage::delete(basename($buku->sampul));

            $buku->sampul = $params['sampul'];
        }

        if (!empty($params['download'])) {
            Storage::delete(basename($buku->download));

            $buku->download = $params['download'];
        }

        $buku->save();

        return $buku;
    }

    public static function delete($params)
    {
        $buku = Buku::find($params['id']);

        if (!empty($buku->sampul)) {
            Storage::delete(basename($buku->sampul));
        }

        if (!empty($buku->download)) {
            Storage::delete(basename($buku->download));
        }

        $buku->delete();
    }
}
