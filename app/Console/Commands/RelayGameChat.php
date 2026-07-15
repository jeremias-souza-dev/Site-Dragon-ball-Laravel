<?php

namespace App\Console\Commands;

use App\Events\ChatMessageBroadcast;
use App\Models\ChatMessage;
use Illuminate\Console\Command;

/**
 * Contraparte do globalevent `chatbridge.lua`: relaya para o site as
 * mensagens gravadas pelo talkaction `!site` do servidor (`source` = 'game').
 */
class RelayGameChat extends Command
{
    protected $signature = 'chat:relay-game {--loop : Run as a daemon loop} {--interval=1 : Seconds to sleep between polls when looping}';

    protected $description = 'Relaya mensagens do chat do jogo para o site';

    public function handle(): void
    {
        $loop = $this->option('loop');
        $interval = max(1, (int) $this->option('interval'));

        if ($loop) {
            $this->info("Relaying game chat in loop mode (polling every {$interval}s)...");

            while (true) {
                $this->relayMessages();
                sleep($interval);
            }
        } else {
            $this->relayMessages();
        }
    }

    private function relayMessages(): void
    {
        ChatMessage::query()
            ->where('source', 'game')
            ->whereNull('site_processed_at')
            ->orderBy('id')
            ->limit(100)
            ->get()
            ->each(function (ChatMessage $message) {
                broadcast(new ChatMessageBroadcast($message));
                $message->update(['site_processed_at' => now()]);
                $this->line("[{$message->channel_id}] {$message->author_name}: {$message->message}");
            });
    }
}
