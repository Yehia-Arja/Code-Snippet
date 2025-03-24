<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Tag;
use App\Models\Keyword;
class CodeSnippet extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'code',
        'language'
    ];

    /**
     * The user who created the snippet.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * The tags associated with the snippet.
     */
    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'code_snippet_tag');
    }

    /**
     * The keywords associated with the snippet.
     */
    public function keywords()
    {
        return $this->belongsToMany(Keyword::class, 'code_snippet_keyword');
    }

    /**
     * Users who favorited the snippet.
     */
    public function favoritedBy()
    {
        return $this->belongsToMany(User::class, 'favorites');
    }
    // In App\Models\CodeSnippet.php

    protected $appends = ['tag_names'];
    protected $hidden = ['tags'];

    public function getTagNamesAttribute()
    {
        return $this->tags->pluck('name');
    }

    public function getKeywordNamesAttribute()
    {
        return $this->keywords->pluck('name');
    }

}
