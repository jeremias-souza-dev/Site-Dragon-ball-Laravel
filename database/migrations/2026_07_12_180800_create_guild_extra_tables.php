<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Tabelas de guild — schema.sql (linhas 156-170) + formato PÓS-migração do TFS 0.4
 * para guild_wars. A source C++ real (ioguild.cpp) usa guild_id/enemy_id/begin/end/
 * frags/payment/guild_kills/enemy_kills/status — NÃO guild1/guild2/name1/name2/started/ended
 * (isso é o formato cru pré-migração do schema.sql, incompatível com o binário atual).
 */
return new class extends Migration
{
    public function up(): void
    {
        // schema.sql linhas 156-160
        Schema::create('guild_invites', function (Blueprint $table) {
            $table->unsignedInteger('player_id')->default(0);
            $table->unsignedInteger('guild_id')->default(0);
        });

        // schema.sql linhas 162-170
        Schema::create('guild_ranks', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('guild_id')->comment('guild');
            $table->string('name')->comment('rank name');
            $table->integer('level')->comment('rank level - leader, vice, member, maybe something else');

            $table->foreign('guild_id')->references('id')->on('guilds')->cascadeOnDelete();
        });

        // Formato usado pela source real (ioguild.cpp): guild_id/enemy_id/begin/end/
        // frags/payment/guild_kills/enemy_kills/status.
        Schema::create('guild_wars', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('guild_id');
            $table->unsignedInteger('enemy_id');
            $table->bigInteger('begin')->default(0);
            $table->bigInteger('end')->default(0);
            $table->unsignedInteger('frags')->default(0);
            $table->unsignedBigInteger('payment')->default(0);
            $table->unsignedInteger('guild_kills')->default(0);
            $table->unsignedInteger('enemy_kills')->default(0);
            $table->unsignedTinyInteger('status')->default(0);

            $table->foreign('guild_id')->references('id')->on('guilds')->cascadeOnDelete();
            $table->foreign('enemy_id')->references('id')->on('guilds')->cascadeOnDelete();
            $table->index('status');
        });
        // schema.sql linhas 319-330
        Schema::create('guildwar_kills', function (Blueprint $table) {
            $table->increments('id');
            $table->string('killer', 50);
            $table->string('target', 50);
            $table->integer('killerguild')->default(0);
            $table->integer('targetguild')->default(0);
            $table->unsignedInteger('warid')->default(0);
            $table->bigInteger('time');

            $table->foreign('warid')->references('id')->on('guild_wars')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('guildwar_kills');
        Schema::dropIfExists('guild_wars');
        Schema::dropIfExists('guild_ranks');
        Schema::dropIfExists('guild_invites');
    }
};
