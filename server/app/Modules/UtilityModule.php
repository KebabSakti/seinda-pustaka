<?php

namespace App\Modules;

class UtilityModule
{
    public static function sorter($sort)
    {
        if ($sort == 'ascend' || $sort == 'asc') {
            return 'asc';
        }

        if ($sort == 'descend' || $sort == 'desc') {
            return 'desc';
        }
    }

    public static function toArrayPreserve($params)
    {
        foreach ($params as $key => $value) {
            $param[$key] = $value;
        }

        return $param;
    }
}
