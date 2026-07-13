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

            // Alterado para corresponder ao tipo INT UNSIGNED de players e guilds
            $table->unsignedInteger('player_id');
            $table->foreign('player_id')->references('id')->on('players')->cascadeOnDelete();

            $table->unsignedInteger('guild_id');
            $table->foreign('guild_id')->references('id')->on('guilds')->cascadeOnDelete();

            $table->timestamps();
        });
    }
    
    public function down()
    {
        Schema::dropIfExists('guild_memberships');
    }
};
