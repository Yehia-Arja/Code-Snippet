<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CodeSnippetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     * Adjust the logic if you need to restrict who can create or update snippets.
     *
     * @return bool
     */
    public function authorize()
    {
        // Allow all users for now; update with your own authorization logic if needed.
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'code'        => 'required|string',
            'language'    => 'required|string|max:50',
            'tags'        => 'nullable|string',
            'keywords'    => 'nullable|string',
        ];
    }
}
