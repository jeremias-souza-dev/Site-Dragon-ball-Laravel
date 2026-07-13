<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Tabela `player_deaths` — formato SIMPLES 1:1 com o schema.sql do TFS 0.4 (linhas 188-196).
 * A TFS 0.4 rev3996 usa `killed_by` VARCHAR + `is_player` TINYINT.
 * NÃO normalizar em tabelas auxiliares (killers/player_killers/environment_killers) —
 * esse formato é de TFS mais novas e quebra o servidor.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('player_deaths', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('player_id');
            $table->unsignedBigInteger('date');
            $table->unsignedInteger('level');

            $table->foreign('player_id')->references('id')->on('players')->cascadeOnDelete();
            $table->index('date');
        });

        Schema::create('killers', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('death_id');
            $table->boolean('final_hit')->default(false);
            $table->boolean('unjustified')->default(false);

            $table->foreign('death_id')->references('id')->on('player_deaths')->cascadeOnDelete();
        });

        Schema::create('player_killers', function (Blueprint $table) {
            $table->unsignedInteger('kill_id');
            $table->unsignedInteger('player_id');

            $table->foreign('kill_id')->references('id')->on('killers')->cascadeOnDelete();
            $table->foreign('player_id')->references('id')->on('players')->cascadeOnDelete();
        });

        Schema::create('environment_killers', function (Blueprint $table) {
            $table->unsignedInteger('kill_id');
            $table->string('name', 255);

            $table->foreign('kill_id')->references('id')->on('killers')->cascadeOnDelete();
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
