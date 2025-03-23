<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\CodeSnippet;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CodeSnippet>
 */
class CodeSnippetFactory extends Factory
{

    protected $model = CodeSnippet::class;
    public function definition(): array
    {
        $userIds = User::pluck('id')->toArray();
        $languages = ['PHP', 'Javascript', 'Python','Java','Typescript'];
        return [
            'user_id' => $userIds[array_rand($userIds)],
            'title' => $this->faker->unique()->sentence,
            'description' => $this->faker->paragraph,
            'code' => $this->faker->text(200),
            'language' => $languages[array_rand($languages)],
        ];
    }
}
