<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Colunas usadas pelo App\Models\Player (fillable/defaultStats) que ficaram
 * de fora da migration original de `players` — sem elas o cadastro pelo
 * site (RegisteredUserController) falha com "Column not found".
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('players', function (Blueprint $table) {
            $table->integer('loss_containers')->default(10)->after('loss_skills')->comment('NOT IN USE BY THE SERVER');
            $table->boolean('marriage')->default(false)->after('loss_containers');
            $table->boolean('promotion')->default(false)->after('marriage');
            $table->boolean('worldtransfer')->default(false)->after('promotion');
            $table->boolean('nick_verify')->default(false)->after('worldtransfer');
        });
    }

    public function down(): void
    {
        Schema::table('players', function (Blueprint $table) {
            $table->dropColumn(['loss_containers', 'marriage', 'promotion', 'worldtransfer', 'nick_verify']);
        });
    }
};
