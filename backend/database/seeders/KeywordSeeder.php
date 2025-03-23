<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Keyword;

class KeywordSeeder extends Seeder
{
    public function run(): void
    {
        Keyword::factory()->count(10)->create();
    }
}
