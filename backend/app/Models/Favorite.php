<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected $fillable = [
        'user_id',
        'code_snippet_id'
    ];

    /**
     * The user who favorited the snippet.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The favorited code snippet.
     */
    public function codeSnippet()
    {
        return $this->belongsTo(CodeSnippet::class);
    }
}
