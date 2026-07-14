<?php

namespace App\Events;

use App\Models\ChatMessage;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class GameChatMessageReceived implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public ChatMessage $message)
    {
    }

    public function broadcastOn(): array
    {
        return [new Channel("chat.{$this->message->channel_id}")];
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->message->id,
            'source' => $this->message->source,
            'author_name' => $this->message->author_name,
            'message' => $this->message->message,
            'created_at' => $this->message->created_at,
        ];
    }
}
