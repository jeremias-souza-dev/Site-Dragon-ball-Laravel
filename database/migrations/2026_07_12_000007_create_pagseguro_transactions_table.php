<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('pagseguro_transactions', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_code')->unique();
            $table->string('status');
            $table->integer('item_count');
            $table->integer('points_added');

            // Alterado para corresponder ao INT UNSIGNED da tabela accounts
            $table->unsignedInteger('account_id');
            $table->foreign('account_id')->references('id')->on('accounts')->cascadeOnDelete();

            $table->timestamps();
        });
    }
    public function down()
    {
        Schema::dropIfExists('pagseguro_transactions');
    }
};
