<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('z_ots_comunication', function (Blueprint $table) {
            $table->id();
            $table->string('type', 50);
            $table->string('name', 255);
            $table->string('action', 50);
            $table->boolean('delete_it')->default(false);
            $table->unsignedInteger('param1')->default(0);
            $table->unsignedInteger('param2')->default(0);
            $table->unsignedInteger('param3')->default(0);
            $table->unsignedInteger('param4')->default(0);
            $table->string('param5', 255)->nullable();
            $table->string('param6', 255)->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('z_ots_comunication');
    }
};
