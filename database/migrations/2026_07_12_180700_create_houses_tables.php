<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // houses, house_auctions, house_lists and house_data already exist
        // (created by the TFS engine itself on first boot) — only tiles and
        // tile_items are still missing.
        Schema::create('tiles', function (Blueprint $table) {
            $table->unsignedInteger('id');
            $table->unsignedTinyInteger('world_id')->default(0);
            $table->unsignedInteger('house_id');
            $table->unsignedInteger('x');
            $table->unsignedInteger('y');
            $table->unsignedTinyInteger('z');
            $table->unique(['id', 'world_id']);
            $table->index(['x', 'y', 'z']);
            $table->foreign(['house_id', 'world_id'])->references(['id', 'world_id'])->on('houses')->cascadeOnDelete();
        });

        Schema::create('tile_items', function (Blueprint $table) {
            $table->unsignedInteger('tile_id');
            $table->unsignedTinyInteger('world_id')->default(0);
            $table->integer('sid');
            $table->integer('pid')->default(0);
            $table->integer('itemtype');
            $table->integer('count')->default(0);
            $table->binary('attributes');
            $table->unique(['tile_id', 'world_id', 'sid']);
            $table->index('sid');
            $table->foreign('tile_id')->references('id')->on('tiles')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tile_items');
        Schema::dropIfExists('tiles');
    }
};
