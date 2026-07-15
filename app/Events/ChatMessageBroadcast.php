<?php

namespace App\Events;

use App\Models\ChatMessage;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChatMessageBroadcast implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public ChatMessage $chatMessage)
    {
        //
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('chat-messages'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'message.sent';
    }

    /**
     * @return array<string, mixed>
     */
    public function broadcastWith(): array
    {
        return [
            'id' => $this->chatMessage->id,
            'channel_id' => $this->chatMessage->channel_id,
            'channel_name' => ChatMessage::CHANNELS[$this->chatMessage->channel_id] ?? 'Global',
            'source' => $this->chatMessage->source,
            'author_name' => $this->chatMessage->author_name,
            'message' => $this->chatMessage->message,
            'created_at' => $this->chatMessage->created_at?->toIso8601String(),
        ];
    }
}
