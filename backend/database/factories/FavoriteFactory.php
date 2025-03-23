<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Favorite;
use App\Models\User;
use App\Models\CodeSnippet;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Favorite>
 */
class FavoriteFactory extends Factory
{
    protected $model = Favorite::class;

    public function definition(): array
    {
        
        $userIds = User::pluck('id')->toArray();
        $snippetIds = CodeSnippet::pluck('id')->toArray();

        return [
            'user_id' => $userIds[array_rand($userIds)],
            'code_snippet_id' => $snippetIds[array_rand($snippetIds)],
        ];
    }
}
