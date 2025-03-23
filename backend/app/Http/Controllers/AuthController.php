<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\ApiResponseService;
class AuthController extends Controller
{
    public function login(Request $request) {

        $validatedData = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!$token = Auth::attempt($validatedData)) {
            return ApiResponseService::error('Unauthorized', 401);
        }

        $user = Auth::user();
        $user->token = $token;

        return ApiResponseService::success('Login successful', $user);
    }

    public function signup(Request $request) {
        $validatedData = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        $user = new User();
        $user->name = $validatedData['name'];
        $user->email = $validatedData['email'];
        $user->password = bcrypt($validatedData['password']);
        
        $user->save();

        return ApiResponseService::success('Signup successful', $user);
    }
    public function validateToken(Request $request) {
        $user = Auth::user();
        if (!$user) {
            return ApiResponseService::error('Unauthorized', 401);
        }
        return ApiResponseService::success('Token is valid', $user);
    }

}
