<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('guild_memberships', function (Blueprint $table) {
            $table->id();
            $table->integer('rank_id');
            $table->foreignId('player_id')->constrained()->cascadeOnDelete();
            $table->foreignId('guild_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('guild_memberships');
    }
};
