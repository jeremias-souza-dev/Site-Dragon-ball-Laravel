<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Tabela `guilds` — núcleo 1:1 com o schema.sql do TFS 0.4 (linhas 146-154).
 * Ranks padrão são criados pelo trigger oncreate_guilds (migration de triggers).
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('guilds', function (Blueprint $table) {
            // ===== Núcleo TFS 0.4 (não alterar) =====
            $table->increments('id');
            $table->string('name')->unique()->comment('guild name - nothing else needed here');
            $table->integer('ownerid');
            $table->integer('creationdata');
            $table->string('motd')->default('');

            // ===== Extras do site (seguros p/ o servidor) =====
            $table->unsignedTinyInteger('world_id')->default(0);
            $table->integer('checkdata')->nullable();
            $table->unsignedBigInteger('balance')->default(0);
            $table->string('logo')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('guilds');
    }
};
