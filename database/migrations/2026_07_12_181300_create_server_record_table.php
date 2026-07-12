<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
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
    }

    public function down()
    {
        Schema::dropIfExists('server_record');
    }
};
