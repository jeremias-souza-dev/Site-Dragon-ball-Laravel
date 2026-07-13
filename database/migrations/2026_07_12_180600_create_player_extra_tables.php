<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Tabelas de itens/skills/storage do player — 1:1 com o schema.sql do TFS 0.4.
 * player_namelocks e player_viplist são extras do site (não existem no schema,
 * mas não atrapalham o servidor).
 */
return new class extends Migration
{
    public function up(): void
    {
        // schema.sql linhas 257-267
        Schema::create('account_viplist', function (Blueprint $table) {
            $table->unsignedInteger('account_id')->comment('id of account whose viplist entry it is');
            $table->unsignedInteger('player_id')->comment('id of target player of viplist entry');
            $table->string('description', 128)->default('');
            $table->unsignedTinyInteger('icon')->default(0);
            $table->boolean('notify')->default(false);

            $table->unique(['account_id', 'player_id'], 'account_player_index');
            $table->foreign('account_id')->references('id')->on('accounts')->cascadeOnDelete();
            $table->foreign('player_id')->references('id')->on('players')->cascadeOnDelete();
        });

        // schema.sql linhas 198-208
        Schema::create('player_depotitems', function (Blueprint $table) {
            $table->unsignedInteger('player_id');
            $table->integer('sid')->comment('any given range eg 0-100 will be reserved for depot lockers and all > 100 will be then normal items inside depots');
            $table->integer('pid')->default(0);
            $table->integer('itemtype');
            $table->integer('count')->default(0);
            $table->binary('attributes');

            $table->foreign('player_id')->references('id')->on('players')->cascadeOnDelete();
            $table->unique(['player_id', 'sid']);
        });

        // schema.sql linhas 222-231
        Schema::create('player_items', function (Blueprint $table) {
            $table->unsignedInteger('player_id')->default(0);
            $table->integer('pid')->default(0);
            $table->integer('sid')->default(0);
            $table->integer('itemtype')->default(0);
            $table->integer('count')->default(0);
            $table->binary('attributes');

            $table->foreign('player_id')->references('id')->on('players')->cascadeOnDelete();
        });

        // schema.sql linhas 233-240 (SEM unique player_id+skillid — o trigger insere 7 linhas)
        Schema::create('player_skills', function (Blueprint $table) {
            $table->unsignedInteger('player_id')->default(0);
            $table->tinyInteger('skillid')->default(0);
            $table->unsignedInteger('value')->default(0);
            $table->unsignedInteger('count')->default(0);

            $table->foreign('player_id')->references('id')->on('players')->cascadeOnDelete();
        });

        // schema.sql linhas 242-247
        Schema::create('player_spells', function (Blueprint $table) {
            $table->unsignedInteger('player_id');
            $table->string('name');

            $table->foreign('player_id')->references('id')->on('players')->cascadeOnDelete();
        });

        // schema.sql linhas 249-255 — value é INT, não string!
        Schema::create('player_storage', function (Blueprint $table) {
            $table->unsignedInteger('player_id')->default(0);
            $table->unsignedInteger('key')->default(0);
            $table->integer('value')->default(0);

            $table->foreign('player_id')->references('id')->on('players')->cascadeOnDelete();
        });

        // ===== Extras do site (não existem no schema.sql) =====
        Schema::create('player_namelocks', function (Blueprint $table) {
            $table->unsignedInteger('player_id')->default(0);
            $table->string('name');
            $table->string('new_name');
            $table->bigInteger('date')->default(0);

            $table->foreign('player_id')->references('id')->on('players')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('player_namelocks');
        Schema::dropIfExists('player_storage');
        Schema::dropIfExists('player_spells');
        Schema::dropIfExists('player_skills');
        Schema::dropIfExists('player_items');
        Schema::dropIfExists('player_depotitems');
        Schema::dropIfExists('account_viplist');
    }
};
