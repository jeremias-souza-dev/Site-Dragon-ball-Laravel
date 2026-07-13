<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->string('title', 150)->default('');
            $table->text('body')->nullable();
            $table->integer('time')->default(0)->index();
        });

        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('news_id')->nullable()->constrained('news')->cascadeOnDelete();
            $table->text('body')->nullable();
            $table->integer('time')->default(0);

            $table->unsignedInteger('author')->nullable();
            $table->foreign('author')->references('id')->on('players')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('comments');
        Schema::dropIfExists('news');
    }
};
