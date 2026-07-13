<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('server_record', function (Blueprint $table) {
            $table->integer('record');
            $table->unsignedTinyInteger('world_id')->default(0);
            $table->unsignedBigInteger('timestamp');
            $table->primary(['world_id', 'timestamp']);
        });

        // Sem uma linha aqui, Game::loadPlayersRecord() falha no boot
        // ("Failed to load players record!") — schema.sql insere (0, 0) de cara.
        DB::table('server_record')->insert(['record' => 0, 'world_id' => 0, 'timestamp' => 0]);
    }

    public function down()
    {
        Schema::dropIfExists('server_record');
    }
};
