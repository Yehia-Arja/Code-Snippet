<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CodeSnippetController;

Route::group(['prefix' => 'v0.1'], function () {
    Route::group([], function () {
        //authenticated routes
        Route::get('/code-snippets', [CodeSnippetController::class, 'index']);
        Route::post('/add-snippet', [CodeSnippetController::class, 'store']);
        Route::get('/code-snippets/{codeSnippet}', [CodeSnippetController::class, 'show']);
        Route::put('/code-snippets/{codeSnippet}', [CodeSnippetController::class, 'update']);
        Route::delete('/code-snippets/{codeSnippet}', [CodeSnippetController::class, 'destroy']);
    });

    Route::group(['prefix' => 'guest'], function () {
        //unauthenticated routes
        Route::get('validate-token', [AuthController::class, 'validateToken']);
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/signup', [AuthController::class, 'signup']);
    });
});

