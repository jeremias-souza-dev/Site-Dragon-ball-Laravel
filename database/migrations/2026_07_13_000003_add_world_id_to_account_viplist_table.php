<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * A source multi-world do servidor filtra `account_viplist` por `world_id`
 * (ver players.world_id), mas o schema.sql original nao tem essa coluna aqui.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('account_viplist', function (Blueprint $table) {
            $table->unsignedTinyInteger('world_id')->default(0)->after('player_id');
        });
    }

    public function down(): void
    {
        Schema::table('account_viplist', function (Blueprint $table) {
            $table->dropColumn('world_id');
        });
    }
};
