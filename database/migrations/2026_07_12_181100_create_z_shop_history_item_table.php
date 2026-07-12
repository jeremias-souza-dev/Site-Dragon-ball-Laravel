<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('z_shop_history_item', function (Blueprint $table) {
            $table->id();
            $table->foreignId('player_id')->nullable()->constrained()->nullOnDelete();
            $table->string('player_name', 255);
            $table->unsignedInteger('item_id');
            $table->string('item_name', 255);
            $table->unsignedInteger('count')->default(1);
            $table->unsignedInteger('price')->default(0);
            $table->unsignedBigInteger('trans_init');
            $table->unsignedBigInteger('trans_real')->default(0);
            $table->string('trans_state', 50)->default('pending');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('z_shop_history_item');
    }
};
