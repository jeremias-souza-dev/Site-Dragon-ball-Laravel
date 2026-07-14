<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Sistema de Ki nativo em C++ (Creature::ki/kiMax) le/grava estas colunas
 * diretamente (ver player.cpp, iologindata.cpp). Nao existiam na migration
 * original porque o binario rodado ate agora nao tinha esse patch compilado.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('players', function (Blueprint $table) {
            $table->integer('ki')->default(0)->after('manamax');
            $table->integer('kimax')->default(0)->after('ki');
        });
    }

    public function down(): void
    {
        Schema::table('players', function (Blueprint $table) {
            $table->dropColumn(['ki', 'kimax']);
        });
    }
};
