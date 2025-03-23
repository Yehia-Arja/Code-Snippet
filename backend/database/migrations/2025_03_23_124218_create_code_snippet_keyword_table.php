<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('code_snippet_keyword', function (Blueprint $table) {
            $table->foreignId('code_snippet_id')
                ->constrained()
                ->onDelete('cascade');
            $table->foreignId('keyword_id')
                ->constrained()
                ->onDelete('cascade');
            $table->primary(['code_snippet_id', 'keyword_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('code_snippet_keyword');
    }
};
