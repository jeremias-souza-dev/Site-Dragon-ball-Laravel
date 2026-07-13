<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('bugtracker', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger('category');
            $table->integer('time')->nullable();
            $table->text('text')->nullable();
            $table->string('title', 120)->nullable();
            $table->tinyInteger('done')->nullable();
            $table->tinyInteger('priority')->nullable();
            $table->boolean('closed')->default(false);

            // Correção aqui:
            $table->unsignedInteger('author');
            $table->foreign('author')->references('id')->on('players')->cascadeOnDelete();

            $table->index(['closed', 'category']);
        });
        Schema::create('friends', function (Blueprint $table) {
            $table->id();
            $table->integer('time')->nullable();
            $table->boolean('active')->default(false);

            // Correção aqui:
            $table->unsignedInteger('with')->nullable();
            $table->foreign('with')->references('id')->on('accounts')->cascadeOnDelete();

            $table->unsignedInteger('friend')->nullable();
            $table->foreign('friend')->references('id')->on('accounts')->cascadeOnDelete();

            $table->index(['with', 'active']);
        });

        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->string('title', 120)->nullable();
            $table->text('text')->nullable();
            $table->integer('time')->nullable();
            $table->boolean('delete_from')->default(false);
            $table->boolean('delete_to')->default(false);
            $table->boolean('unread')->default(false);

            // Correção aqui:
            $table->unsignedInteger('from')->nullable();
            $table->foreign('from')->references('id')->on('accounts')->cascadeOnDelete();

            $table->unsignedInteger('to')->nullable();
            $table->foreign('to')->references('id')->on('accounts')->cascadeOnDelete();

            $table->index(['to', 'unread']);
        });

        Schema::create('shop_donation_history', function (Blueprint $table) {
            $table->id();
            $table->string('method', 256);
            $table->string('receiver', 256);
            $table->string('buyer', 256);
            $table->string('account', 256);
            $table->integer('points');
            $table->integer('date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('shop_donation_history');
        Schema::dropIfExists('messages');
        Schema::dropIfExists('friends');
        Schema::dropIfExists('bugtracker');
    }
};
