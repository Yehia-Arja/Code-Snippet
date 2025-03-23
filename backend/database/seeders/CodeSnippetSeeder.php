<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CodeSnippet;
use App\Models\User;
use App\Models\Tag;
use App\Models\Keyword;

class CodeSnippetSeeder extends Seeder
{
    public function run(): void
    {
        
        $userIds = User::pluck('id')->toArray();

        
        CodeSnippet::factory()
            ->count(20)
            ->create(function () use ($userIds) {
                return ['user_id' => $userIds[array_rand($userIds)]];
            })
            ->each(function ($snippet) {
                $tags = Tag::all();
                $keywords = Keyword::all();

                $snippet->tags()->attach(
                    $tags->random(rand(1, 3))->pluck('id')->toArray()
                );

                $snippet->keywords()->attach(
                    $keywords->random(rand(1, 3))->pluck('id')->toArray()
                );
            });
    }
}
