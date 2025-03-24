<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CodeSnippet;
use App\Services\ApiResponseService;
use Illuminate\Support\Facades\Auth;
use App\Models\Tag;
use App\Models\Keyword;

class CodeSnippetController extends Controller
{
    public function index(Request $request)
    {
        $query = CodeSnippet::query();

        if ($request->filled('tag')) {
            $tag = $request->input('tag');
            $query->whereHas('tags', fn($q) => $q->where('name', 'like', "%{$tag}%"));
        }

        if ($request->filled('keyword')) {
            $keyword = $request->input('keyword');
            $query->whereHas('keywords', fn($q) =>
                $q->where('name', 'like', "%{$keyword}%")
                  ->orWhere('language', 'like', "%{$keyword}%")
            );
        }

        if ($request->boolean('favorites') && Auth::check()) {
            $userId = Auth::id();
            $query->whereHas('favoritedBy', fn($q) => $q->where('user_id', $userId));
        }

        $snippets = $query->with(['tags', 'user'])->get();
        return ApiResponseService::success('Snippets retrieved', $snippets);
    }

    public function show(CodeSnippet $codeSnippet)
    {
        return ApiResponseService::success('Snippet retrieved', $codeSnippet->load(['tags', 'keywords', 'user']));
    }

    public function store(Request $request)
    {
        return $this->saveSnippet($request);
    }

    public function update(Request $request, CodeSnippet $codeSnippet)
    {
        return $this->saveSnippet($request, $codeSnippet);
    }

    public function destroy($id)
    {
        $snippet = CodeSnippet::where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $snippet->delete();

        return ApiResponseService::success('Snippet deleted successfully');
    }

    private function saveSnippet(Request $request, CodeSnippet $codeSnippet=null)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'code' => 'required|string',
            'language' => 'required|string|max:50',
            'tags' => 'nullable|string',
            'keywords' => 'nullable|string',
        ]);

        $snippet = $codeSnippet ?? new CodeSnippet();
        $snippet->fill($validated);
        $snippet->user_id = Auth::id();
        $snippet->save();

        // Handle tags
        if ($request->filled('tags')) {
            $tagNames = array_map('trim', explode(',', $request->tags));
            $tagIds = collect($tagNames)->map(fn($name) => Tag::firstOrCreate(['name' => $name])->id);
            $snippet->tags()->sync($tagIds);
        }

        // Handle keywords
        if ($request->filled('keywords')) {
            $keywordNames = array_map('trim', explode(',', $request->keywords));
            $keywordIds = collect($keywordNames)->map(fn($name) => Keyword::firstOrCreate(['name' => $name])->id);
            $snippet->keywords()->sync($keywordIds);
        }

        $status = $codeSnippet ? 200 : 201;
        return ApiResponseService::success('Snippet saved successfully', $snippet->load(['tags', 'keywords']), $status);
    }
}
