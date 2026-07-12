<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('guild_invites', function (Blueprint $table) {
            $table->foreignId('player_id')->default(0)->constrained('players')->cascadeOnDelete();
            $table->foreignId('guild_id')->default(0)->constrained('guilds')->cascadeOnDelete();
            $table->unique(['player_id', 'guild_id']);
        });

        Schema::create('guild_ranks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('guild_id')->constrained('guilds')->cascadeOnDelete();
            $table->string('name');
            $table->integer('level')->comment('1 - leader, 2 - vice leader, 3 - member');
        });

        Schema::create('guild_wars', function (Blueprint $table) {
            $table->id();
            $table->foreignId('guild_id')->constrained('guilds')->cascadeOnDelete();
            $table->foreignId('enemy_id')->constrained('guilds')->cascadeOnDelete();
            $table->bigInteger('begin')->default(0);
            $table->bigInteger('end')->default(0);
            $table->unsignedInteger('frags')->default(0);
            $table->unsignedBigInteger('payment')->default(0);
            $table->unsignedInteger('guild_kills')->default(0);
            $table->unsignedInteger('enemy_kills')->default(0);
            $table->unsignedTinyInteger('status')->default(0)->index();
        });

        Schema::create('guild_kills', function (Blueprint $table) {
            $table->id();
            $table->foreignId('guild_id')->constrained('guilds')->cascadeOnDelete();
            $table->foreignId('war_id')->constrained('guild_wars')->cascadeOnDelete();
            $table->foreignId('death_id')->constrained('player_deaths')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('guild_kills');
        Schema::dropIfExists('guild_wars');
        Schema::dropIfExists('guild_ranks');
        Schema::dropIfExists('guild_invites');
    }
};
