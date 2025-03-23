<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    /**
     * The code snippets that have this tag.
     */
    public function codeSnippets()
    {
        return $this->belongsToMany(CodeSnippet::class, 'code_snippet_tag');
    }
}
