<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Tabelas do jogo que estavam AUSENTES nas migrations — 1:1 com o schema.sql do TFS 0.4:
 * bans, global_storage, server_config, market_offers, market_history,
 * player_inboxitems, map_store, tile_store.
 * (houses/house_lists/tiles/tile_items já existem em 180700.)
 */
return new class extends Migration
{
    public function up(): void
    {
        // A source C++ (ioban.cpp) usa o formato PÓS-migração do TFS 0.4 (db_version >= 21),
        // não o formato cru do schema.sql. Colunas: id, type, value, param, active, expires,
        // added, admin_id, comment, reason, action, statement.
        Schema::create('bans', function (Blueprint $table) {
            $table->increments('id');
            $table->tinyInteger('type')->comment('1 - ip banishment, 2 - namelock, 3 - account banishment, 4 - notation, 5 - deletion');
            $table->unsignedInteger('value')->comment('ip address (integer), player guid or account number');
            $table->unsignedInteger('param')->default(4294967295)->comment('used only for ip banishment mask (integer)');
            $table->tinyInteger('active')->default(1);
            $table->integer('expires');
            $table->unsignedInteger('added');
            $table->unsignedInteger('admin_id')->default(0);
            $table->text('comment');
            $table->unsignedInteger('reason')->default(0);
            $table->unsignedInteger('action')->default(0);
            $table->string('statement')->default('');

            $table->index(['type', 'value']);
            $table->index('active');
        });

        // Corrigido para comportar chaves alfanuméricas de MODs e adicionada coluna de escape runEventJoining
        Schema::create('global_storage', function (Blueprint $table) {
            $table->string('key', 50); 
            $table->string('value', 255)->default('0');
            $table->unsignedTinyInteger('world_id')->default(0);
            
            // Coluna de escape para contornar a falha de sintaxe da query sem aspas da source/mod
            $table->string('runEventJoining', 50)->nullable(); 
            
            $table->primary(['key', 'world_id']);
        });

        // schema.sql linhas 332-337 (dados iniciais na migration de seeds/triggers)
        Schema::create('server_config', function (Blueprint $table) {
            $table->string('config', 50)->unique();
            $table->string('value', 256)->default('');
        });

        // schema.sql linhas 210-220
        Schema::create('player_inboxitems', function (Blueprint $table) {
            $table->unsignedInteger('player_id');
            $table->integer('sid');
            $table->integer('pid')->default(0);
            $table->integer('itemtype');
            $table->integer('count')->default(0);
            $table->binary('attributes');

            $table->foreign('player_id')->references('id')->on('players')->cascadeOnDelete();
            $table->unique(['player_id', 'sid']);
        });

        // schema.sql linhas 269-274 — Ajustado para refletir a chave composta de houses
        Schema::create('map_store', function (Blueprint $table) {
            $table->integer('house_id');
            $table->unsignedTinyInteger('world_id')->default(0);
            $table->binary('data'); // LONGBLOB — ajustado via raw abaixo

            $table->foreign(['house_id', 'world_id'])->references(['id', 'world_id'])->on('houses')->cascadeOnDelete();
        });

        // schema.sql linhas 297-302 — Corrigido para fazer par com a chave composta de houses
        Schema::create('tile_store', function (Blueprint $table) {
            $table->integer('house_id');
            $table->unsignedTinyInteger('world_id')->default(0);
            $table->binary('data');

            $table->foreign(['house_id', 'world_id'])->references(['id', 'world_id'])->on('houses')->cascadeOnDelete();
        });

        // BLOB -> LONGBLOB (mapas de casas podem passar de 64KB)
        DB::statement('ALTER TABLE `map_store` MODIFY `data` LONGBLOB NOT NULL');
        DB::statement('ALTER TABLE `tile_store` MODIFY `data` LONGBLOB NOT NULL');

        // schema.sql linhas 341-355
        Schema::create('market_history', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('sale')->default(false);
            $table->unsignedInteger('itemtype');
            $table->unsignedSmallInteger('amount');
            $table->unsignedInteger('price')->default(0);
            $table->unsignedBigInteger('expires_at');
            $table->unsignedBigInteger('inserted');
            $table->unsignedTinyInteger('state');

            $table->unsignedInteger('player_id');
            $table->foreign('player_id')->references('id')->on('players')->cascadeOnDelete();

            $table->index(['player_id', 'sale']);
        });

        // schema.sql linhas 357-371
        Schema::create('market_offers', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('sale')->default(false);
            $table->unsignedInteger('itemtype');
            $table->unsignedSmallInteger('amount');
            $table->unsignedBigInteger('created');
            $table->boolean('anonymous')->default(false);
            $table->unsignedInteger('price')->default(0);

            $table->unsignedInteger('player_id');
            $table->foreign('player_id')->references('id')->on('players')->cascadeOnDelete();

            $table->index(['sale', 'itemtype']);
            $table->index('created');
        });

        Schema::create('server_motd', function (Blueprint $table) {
            $table->increments('id');
            $table->string('text', 255);
            $table->unsignedTinyInteger('world_id')->default(0);
        });

        // Sem uma linha aqui, Game::loadMotd() falha no boot ("Failed to load motd!")
        // e o client mostra o texto vazio/placeholder na tela de login.
        DB::table('server_motd')->insert([
            'text' => 'Bem-vindo ao Dragon Ball JS! Divirta-se e respeite as regras do servidor.',
            'world_id' => 0,
        ]);

        Schema::create('house_auctions', function (Blueprint $table) {
            $table->unsignedInteger('house_id');
            $table->unsignedTinyInteger('world_id')->default(0);
            $table->unsignedInteger('player_id');
            $table->unsignedInteger('bid')->default(0);
            $table->unsignedInteger('limit')->default(0);
            $table->unsignedBigInteger('endtime')->default(0);

            $table->foreign('player_id')->references('id')->on('players')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('house_auctions');
        Schema::dropIfExists('server_motd');
        Schema::dropIfExists('market_offers');
        Schema::dropIfExists('market_history');
        Schema::dropIfExists('tile_store');
        Schema::dropIfExists('map_store');
        Schema::dropIfExists('player_inboxitems');
        Schema::dropIfExists('server_config');
        Schema::dropIfExists('global_storage');
        Schema::dropIfExists('bans');
    }
};