<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('player_deaths', function (Blueprint $table) {
            $table->id();
            $table->foreignId('player_id')->constrained('players')->cascadeOnDelete();
            $table->unsignedBigInteger('date')->index();
            $table->unsignedInteger('level');
        });

        Schema::create('killers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('death_id')->constrained('player_deaths')->cascadeOnDelete();
            $table->boolean('final_hit')->default(false);
            $table->boolean('unjustified')->default(false);
            $table->integer('war')->default(0);
        });

        Schema::create('player_killers', function (Blueprint $table) {
            $table->foreignId('kill_id')->constrained('killers')->cascadeOnDelete();
            $table->foreignId('player_id')->constrained('players')->cascadeOnDelete();
        });

        Schema::create('environment_killers', function (Blueprint $table) {
            $table->foreignId('kill_id')->constrained('killers')->cascadeOnDelete();
            $table->string('name');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('environment_killers');
        Schema::dropIfExists('player_killers');
        Schema::dropIfExists('killers');
        Schema::dropIfExists('player_deaths');
    }
};
