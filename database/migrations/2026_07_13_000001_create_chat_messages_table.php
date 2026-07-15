<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Ponte de chat site <-> jogo.
 *
 * `source` = 'site': gravado pelo ChatController, lido e relayado pelo
 * globalevent `chatbridge.lua` do servidor (marca `game_processed_at`).
 *
 * `source` = 'game': gravado pelo talkaction `!site` do servidor, lido e
 * relayado pelo comando `RelayGameChat` do site (marca `site_processed_at`).
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('chat_messages', function (Blueprint $table) {
            $table->increments('id');
            $table->enum('source', ['site', 'game']);
            // TFS channel id: 5 = Game-Chat ("global"), 6 = Trade, 9 = Help
            // (see servidor/data/XML/channels.xml).
            $table->unsignedSmallInteger('channel_id')->default(5);
            $table->string('author_name');
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->text('message');
            $table->timestamp('game_processed_at')->nullable();
            $table->timestamp('site_processed_at')->nullable();
            $table->timestamp('created_at')->useCurrent();

            $table->index(['source', 'game_processed_at']);
            $table->index(['source', 'site_processed_at']);
            $table->index(['channel_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('chat_messages');
    }
};
