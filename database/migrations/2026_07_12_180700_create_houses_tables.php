<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Tabela de Casas com Chave Composta (id, world_id)
        Schema::create('houses', function (Blueprint $table) {
            $table->integer('id');
            $table->unsignedTinyInteger('world_id')->default(0); // Exigido pela source
            $table->integer('owner');
            $table->string('name', 255)->default(''); // Exigido pela source
            $table->integer('town')->default(0);
            $table->integer('size')->default(0);
            $table->integer('price')->default(0); // Exigido pela source
            $table->integer('rent')->default(0);
            $table->integer('doors')->default(0);
            $table->integer('beds')->default(0);
            $table->integer('tiles')->default(0);
            $table->integer('guild')->default(0);
            $table->unsignedInteger('paid')->default(0);
            $table->integer('lastwarning')->default(0); // Exigido pela source
            $table->integer('clear')->default(0); // Exigido pela source
            $table->text('warnings');

            $table->primary(['id', 'world_id']);
        });

        // Tabela de Listas com suporte a world_id para o comando DELETE do servidor
        Schema::create('house_lists', function (Blueprint $table) {
            $table->integer('house_id');
            $table->unsignedTinyInteger('world_id')->default(0);
            $table->integer('listid');
            $table->text('list');

            // Chave estrangeira referenciando a primária composta de houses
            $table->foreign(['house_id', 'world_id'])->references(['id', 'world_id'])->on('houses')->cascadeOnDelete();
        });

        // Tabela de Tiles corrigida para evitar erro de Duplicate Entry '1'
        Schema::create('tiles', function (Blueprint $table) {
            $table->integer('id');
            $table->unsignedTinyInteger('world_id')->default(0);
            $table->integer('house_id');
            $table->integer('x');
            $table->integer('y');
            $table->integer('z');

            $table->primary(['id', 'world_id']);
            $table->index(['x', 'y', 'z']);
            
            // Relacionamento com a casa correspondente
            $table->foreign(['house_id', 'world_id'])->references(['id', 'world_id'])->on('houses')->cascadeOnDelete();
        });

        // Tabela de Itens dos Tiles corrigida para bater com a PK de tiles
        Schema::create('tile_items', function (Blueprint $table) {
            $table->integer('tile_id');
            $table->unsignedTinyInteger('world_id')->default(0); // Exigido pela source
            $table->integer('sid')->index();
            $table->integer('pid')->default(0);
            $table->integer('itemtype');
            $table->integer('count')->default(0);
            $table->binary('attributes');

            // Relacionamento baseado na chave composta de tiles
            $table->foreign(['tile_id', 'world_id'])->references(['id', 'world_id'])->on('tiles')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tile_items');
        Schema::dropIfExists('tiles');
        Schema::dropIfExists('house_lists');
        Schema::dropIfExists('houses');
    }
};