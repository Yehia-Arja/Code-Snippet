<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CodeSnippet;
use App\Services\ApiResponseService;
use Illuminate\Support\Facades\Auth;
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
            $q->where('name', 'like', "%{$keyword}%");
        });
    }

    if ($request->boolean('favorites') && Auth::check()) {
        $userId = Auth::id();
        $query->whereHas('favoritedBy', function ($q) use ($userId) {
            $q->where('user_id', $userId);
        });
    }

    $snippets = $query->with(['tags', 'keywords', 'user'])->get();

    return ApiResponseService::success('Snippets retrieved', $snippets);
}


}
 