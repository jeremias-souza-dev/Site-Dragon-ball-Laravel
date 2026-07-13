<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Tabela `players` — núcleo 1:1 com o schema.sql do TFS 0.4 (linhas 69-121)
 * + colunas do Cast System (source/Query do cast.txt — NÃO estão no schema.sql!)
 * + colunas extras do SITE no final (nullable/default — não afetam o servidor C++).
 *
 * IMPORTANTE:
 * - `conditions` é BLOB (binary). Ao criar player pelo site, gravar string vazia ''.
 * - Skills iniciais são inseridas pelo trigger oncreate_players (migration de triggers).
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('players', function (Blueprint $table) {
            // ===== Núcleo TFS 0.4 (não alterar) =====
            $table->increments('id');
            $table->string('name')->unique();
            $table->unsignedInteger('group_id')->default(1);
            $table->unsignedInteger('account_id')->default(0);
            $table->integer('level')->default(1);
            $table->integer('vocation')->default(0);
            $table->integer('health')->default(150);
            $table->integer('healthmax')->default(150);
            $table->bigInteger('experience')->default(0);
            $table->integer('lookbody')->default(0);
            $table->integer('lookfeet')->default(0);
            $table->integer('lookhead')->default(0);
            $table->integer('looklegs')->default(0);
            $table->integer('looktype')->default(136);
            $table->integer('lookaddons')->default(0);
            $table->integer('maglevel')->default(0);
            $table->integer('mana')->default(0);
            $table->integer('manamax')->default(0);
            $table->integer('manaspent')->default(0);
            $table->unsignedInteger('soul')->default(0);
            $table->integer('town_id')->default(0);
            $table->integer('posx')->default(0);
            $table->integer('posy')->default(0);
            $table->integer('posz')->default(0);
            $table->binary('conditions'); // BLOB — obrigatório p/ o servidor
            $table->integer('cap')->default(0);
            $table->integer('sex')->default(0);
            $table->unsignedBigInteger('lastlogin')->default(0);
            $table->unsignedInteger('lastip')->default(0);
            $table->boolean('save')->default(true);
            $table->tinyInteger('skull')->default(0);
            $table->integer('skulltime')->default(0); // Mantido apenas aqui (removida a duplicata do final)
            $table->integer('rank_id')->default(0);
            $table->string('guildnick')->default('');
            $table->unsignedBigInteger('lastlogout')->default(0);
            $table->tinyInteger('blessings')->default(0);
            $table->integer('direction')->default(0)->comment('NOT IN USE BY THE SERVER');
            $table->integer('loss_experience')->default(10)->comment('NOT IN USE BY THE SERVER');
            $table->integer('loss_mana')->default(10)->comment('NOT IN USE BY THE SERVER');
            $table->integer('loss_skills')->default(10)->comment('NOT IN USE BY THE SERVER');
            $table->integer('premend')->default(0)->comment('NOT IN USE BY THE SERVER');
            $table->tinyInteger('online')->default(0);
            $table->unsignedBigInteger('balance')->default(0);
            $table->unsignedSmallInteger('offlinetraining_time')->default(43200);
            $table->integer('offlinetraining_skill')->default(-1);
            $table->unsignedSmallInteger('stamina')->default(2520);

            $table->foreign('account_id')->references('id')->on('accounts')->cascadeOnDelete();
            $table->foreign('group_id')->references('id')->on('groups');

            // ===== Cast System (source/Query do cast.txt) =====
            $table->tinyInteger('cast')->default(0);
            $table->integer('castViewers')->default(0);
            $table->string('castDescription')->default('');

            // ===== Extras do site e Customizações da Source Multi-world =====
            $table->unsignedTinyInteger('world_id')->default(0);
            $table->integer('loss_items')->default(10); // Exigido pela sua distro customizada
            $table->boolean('deleted')->default(false);
            $table->boolean('hide_char')->default(false);
            $table->string('old_name')->nullable();
            $table->text('description')->nullable();
            $table->text('comment')->nullable();
            $table->integer('created')->nullable();
            $table->timestamps();

            $table->index(['deleted', 'experience']);
            $table->index(['deleted', 'online']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('players');
    }
};