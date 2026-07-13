<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('shop_histories', function (Blueprint $table) {
            $table->id();
            $table->boolean('processed')->default(false);

            // Alterado de foreignId para unsignedInteger para bater com a tabela players
            $table->unsignedInteger('player_id');
            $table->foreign('player_id')->references('id')->on('players')->cascadeOnDelete();

            // Este pode continuar como foreignId se a tabela shop_offers usar $table->id()
            $table->foreignId('product_id')->constrained('shop_offers')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('shop_histories');
    }
};
