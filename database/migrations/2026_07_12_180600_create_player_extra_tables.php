<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('account_viplist', function (Blueprint $table) {
            $table->foreignId('account_id')->constrained('accounts')->cascadeOnDelete();
            $table->unsignedTinyInteger('world_id')->default(0);
            $table->foreignId('player_id')->constrained('players')->cascadeOnDelete();
            $table->unique(['account_id', 'player_id']);
        });

        Schema::create('player_depotitems', function (Blueprint $table) {
            $table->foreignId('player_id')->constrained('players')->cascadeOnDelete();
            $table->integer('sid');
            $table->integer('pid')->default(0);
            $table->integer('itemtype');
            $table->integer('count')->default(0);
            $table->binary('attributes');
            $table->unique(['player_id', 'sid']);
        });

        Schema::create('player_items', function (Blueprint $table) {
            $table->foreignId('player_id')->default(0)->constrained('players')->cascadeOnDelete();
            $table->integer('pid')->default(0);
            $table->integer('sid')->default(0);
            $table->integer('itemtype')->default(0);
            $table->integer('count')->default(0);
            $table->binary('attributes');
            $table->unique(['player_id', 'sid']);
        });

        Schema::create('player_namelocks', function (Blueprint $table) {
            $table->foreignId('player_id')->default(0)->constrained('players')->cascadeOnDelete();
            $table->string('name');
            $table->string('new_name');
            $table->bigInteger('date')->default(0);
        });

        Schema::create('player_skills', function (Blueprint $table) {
            $table->foreignId('player_id')->default(0)->constrained('players')->cascadeOnDelete();
            $table->tinyInteger('skillid')->default(0);
            $table->unsignedInteger('value')->default(0);
            $table->unsignedInteger('count')->default(0);
            $table->unique(['player_id', 'skillid']);
        });

        Schema::create('player_spells', function (Blueprint $table) {
            $table->foreignId('player_id')->constrained('players')->cascadeOnDelete();
            $table->string('name');
            $table->unique(['player_id', 'name']);
        });

        Schema::create('player_storage', function (Blueprint $table) {
            $table->foreignId('player_id')->default(0)->constrained('players')->cascadeOnDelete();
            $table->unsignedInteger('key')->default(0);
            $table->string('value')->default('0');
            $table->unique(['player_id', 'key']);
        });

        Schema::create('player_viplist', function (Blueprint $table) {
            $table->foreignId('player_id')->constrained('players')->cascadeOnDelete();
            $table->foreignId('vip_id')->constrained('players')->cascadeOnDelete();
            $table->unique(['player_id', 'vip_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('player_viplist');
        Schema::dropIfExists('player_storage');
        Schema::dropIfExists('player_spells');
        Schema::dropIfExists('player_skills');
        Schema::dropIfExists('player_namelocks');
        Schema::dropIfExists('player_items');
        Schema::dropIfExists('player_depotitems');
        Schema::dropIfExists('account_viplist');
    }
};
