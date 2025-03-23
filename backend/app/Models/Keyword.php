<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Keyword extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    /**
     * The code snippets that use this keyword.
     */
    public function codeSnippets()
    {
        return $this->belongsToMany(CodeSnippet::class, 'code_snippet_keyword');
    }
}
