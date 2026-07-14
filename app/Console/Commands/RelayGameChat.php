<?php

namespace App\Console\Commands;

use App\Events\GameChatMessageReceived;
use App\Models\ChatMessage;
use Illuminate\Console\Command;

/**
 * Contraparte do globalevent `chatbridge.lua`: relaya para o site as
 * mensagens gravadas pelo talkaction `!site` do servidor (`source` = 'game').
 */
class RelayGameChat extends Command
{
    protected $signature = 'chat:relay-game';

    protected $description = 'Relaya mensagens do chat do jogo para o site';

    public function handle(): void
    {
        ChatMessage::query()
            ->where('source', 'game')
            ->whereNull('site_processed_at')
            ->orderBy('id')
            ->limit(20)
            ->get()
            ->each(function (ChatMessage $message) {
                broadcast(new GameChatMessageReceived($message));
                $message->update(['site_processed_at' => now()]);
            });
    }
}
