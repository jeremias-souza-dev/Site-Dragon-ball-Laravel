<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('forums', function (Blueprint $table) {
            $table->id();
            $table->string('name', 120)->nullable();
            $table->text('description')->nullable();
            $table->smallInteger('access')->default(1);
            $table->boolean('closed')->default(false);
            $table->text('moderators')->nullable();
            $table->integer('order')->nullable();
            $table->boolean('requireLogin')->default(false);

            $table->unsignedInteger('guild')->nullable();
            $table->foreign('guild')->references('id')->on('guilds')->nullOnDelete();
        });
        
        Schema::create('threads', function (Blueprint $table) {
            $table->id();
            $table->string('name', 120)->nullable();
            $table->boolean('sticked')->default(false);
            $table->boolean('closed')->default(false);
            $table->string('author', 64)->nullable();
            $table->integer('time')->default(0);
            $table->foreignId('board_id')->nullable()->constrained('forums')->cascadeOnDelete();

            $table->index(['board_id', 'sticked', 'time']);
        });

        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title', 120)->nullable();
            $table->text('text')->nullable();
            $table->integer('time')->default(0);
            $table->string('author', 64)->nullable();
            $table->foreignId('board_id')->nullable()->constrained('forums')->cascadeOnDelete();
            $table->foreignId('thread_id')->nullable()->constrained('threads')->cascadeOnDelete();

            $table->index(['thread_id', 'time']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
        Schema::dropIfExists('threads');
        Schema::dropIfExists('forums');
    }
};
