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
            $table->foreignId('player_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_id')->constrained('shop_offers')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('shop_histories');
    }
};
