<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('videos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('author')->nullable()->constrained('players')->cascadeOnDelete();
            $table->string('title', 120)->nullable();
            $table->text('description')->nullable();
            $table->string('youtube', 45)->nullable();
            $table->integer('views')->default(0);
            $table->integer('time')->default(0);
        });

        Schema::create('video_comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('author')->nullable()->constrained('players')->cascadeOnDelete();
            $table->foreignId('video')->nullable()->constrained('videos')->cascadeOnDelete();
            $table->integer('time')->default(0);
            $table->text('text')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('video_comments');
        Schema::dropIfExists('videos');
    }
};
