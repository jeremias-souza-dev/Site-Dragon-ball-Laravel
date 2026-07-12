<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('houses', function (Blueprint $table) {
            $table->id();
            $table->integer('owner');
            $table->unsignedInteger('paid')->default(0);
            $table->text('warnings');
        });

        Schema::create('house_lists', function (Blueprint $table) {
            $table->foreignId('house_id')->constrained('houses')->cascadeOnDelete();
            $table->integer('listid');
            $table->text('list');
        });

        Schema::create('tiles', function (Blueprint $table) {
            $table->id();
            $table->integer('x');
            $table->integer('y');
            $table->integer('z');
            $table->index(['x', 'y', 'z']);
        });

        Schema::create('tile_items', function (Blueprint $table) {
            $table->foreignId('tile_id')->constrained('tiles')->cascadeOnDelete();
            $table->integer('sid')->index();
            $table->integer('pid')->default(0);
            $table->integer('itemtype');
            $table->integer('count')->default(0);
            $table->binary('attributes');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tile_items');
        Schema::dropIfExists('tiles');
        Schema::dropIfExists('house_lists');
        Schema::dropIfExists('houses');
    }
};
