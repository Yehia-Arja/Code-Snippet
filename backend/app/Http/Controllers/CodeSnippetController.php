<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CodeSnippet;
use App\Services\ApiResponseService;
use Illuminate\Support\Facades\Auth;
use App\Models\Tag;
use App\Models\User;
use App\Models\Keyword;
class CodeSnippetController extends Controller
{
   public function index(Request $request)
{
    $query = CodeSnippet::query();

   
    if ($request->filled('tag')) {
        $tag = $request->input('tag');
        $query->whereHas('tags', function ($q) use ($tag) {
            $q->where('name', 'like', "%{$tag}%");
        });
    }

   
    if ($request->filled('keyword')) {
        $keyword = $request->input('keyword');
            $query->whereHas('keywords', function ($q) use ($keyword) {
                $q->where('name', 'like', "%{$keyword}%")
                ->orWhere('language', 'like', "%{$keyword}%");
        });
    }

    if ($request->boolean('favorites') && Auth::check()) {
        $userId = Auth::id();
        $query->whereHas('favoritedBy', function ($q) use ($userId) {
            $q->where('user_id', $userId);
        });
    }

    $snippets = $query->with(['tags','user'])->get();
    return ApiResponseService::success('Snippets retrieved', $snippets);
}
    public function store(Request $request)
{   //validate the request
    $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'code' => 'required|string',
        'language' => 'required|string|max:50',
        'tags' => 'nullable|string',      
        'keywords' => 'nullable|string',  
    ]);

    $snippet = CodeSnippet::create([
        'user_id' => Auth::id(),
        'title' => $request->title,
        'description' => $request->description,
        'code' => $request->code,
        'language' => $request->language,
    ]);

    //attach tags and keywords to the snippet
    if ($request->filled('tags')) {
        $tagNames = array_map('trim', explode(',', $request->tags));
        $tagIds = [];
        foreach ($tagNames as $tagName) {
            $tag = Tag::firstOrCreate(['name' => $tagName]);
            $tagIds[] = $tag->id;
        }
        $snippet->tags()->sync($tagIds);
    }
    
    if ($request->filled('keywords')) {
        $keywordNames = array_map('trim', explode(',', $request->keywords));
        $keywordIds = [];
        foreach ($keywordNames as $keywordName) {
            $keyword = Keyword::firstOrCreate(['name' => $keywordName]);
            $keywordIds[] = $keyword->id;
        }
        $snippet->keywords()->sync($keywordIds);
    }

    return ApiResponseService::success('Snippet added successfully', $snippet);
}
public function destroy($id)
{
    $snippet = CodeSnippet::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
    $snippet->delete();

    return ApiResponseService::success('Snippet deleted successfully');
}



}
 