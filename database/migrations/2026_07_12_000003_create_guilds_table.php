<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('guilds', function (Blueprint $table) {
            $table->id();
            $table->unsignedTinyInteger('world_id')->default(0);
            $table->string('name')->unique();
            $table->string('motd')->nullable();
            $table->foreignId('ownerid')->constrained('players')->cascadeOnDelete();
            $table->integer('creationdata')->nullable();
            $table->integer('checkdata')->nullable();
            $table->unsignedBigInteger('balance')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('guilds');
    }
};
