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
            $table->foreignId('author')->constrained('players')->cascadeOnDelete();
            $table->text('text')->nullable();
            $table->string('title', 120)->nullable();
            $table->tinyInteger('done')->nullable();
            $table->tinyInteger('priority')->nullable();
            $table->boolean('closed')->default(false);
        });

        Schema::create('friends', function (Blueprint $table) {
            $table->id();
            $table->foreignId('with')->nullable()->constrained('accounts')->cascadeOnDelete();
            $table->foreignId('friend')->nullable()->constrained('accounts')->cascadeOnDelete();
            $table->integer('time')->nullable();
            $table->boolean('active')->default(false);
        });

        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('from')->nullable()->constrained('accounts')->cascadeOnDelete();
            $table->foreignId('to')->nullable()->constrained('accounts')->cascadeOnDelete();
            $table->string('title', 120)->nullable();
            $table->text('text')->nullable();
            $table->integer('time')->nullable();
            $table->boolean('delete_from')->default(false);
            $table->boolean('delete_to')->default(false);
            $table->boolean('unread')->default(false);
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
