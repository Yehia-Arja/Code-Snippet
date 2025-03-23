<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\CodeSnippet;

class FavoriteSeeder extends Seeder
{
    public function run(): void
    {
       
        $snippetIds = CodeSnippet::pluck('id')->toArray();

        
        User::all()->each(function ($user) use ($snippetIds) {
            $count = rand(1, 5);

            $favoriteIds = array_rand(array_flip($snippetIds), $count);
    
            if (!is_array($favoriteIds)) {
                $favoriteIds = [$favoriteIds];
            }

            $user->favorites()->attach($favoriteIds);
        });
    }
}
