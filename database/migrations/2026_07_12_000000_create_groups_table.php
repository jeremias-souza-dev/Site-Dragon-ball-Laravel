<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Tabela `groups` do TFS 0.4 (schema.sql linhas 34-47).
 * DEVE rodar antes de accounts/players (FK group_id).
 * Estrutura 1:1 com o schema do servidor — NÃO alterar.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('groups', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->comment('group name');
            $table->unsignedBigInteger('flags')->default(0);
            $table->integer('access');
            $table->integer('maxdepotitems');
            $table->integer('maxviplist');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('groups');
    }
};
