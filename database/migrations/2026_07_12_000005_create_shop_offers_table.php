<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('shop_offers', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('item');
            $table->integer('count');
            $table->integer('type');
            $table->integer('points');
            $table->text('desc')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('shop_offers');
    }
};
