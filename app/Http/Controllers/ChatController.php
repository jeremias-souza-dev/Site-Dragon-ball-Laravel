<?php

namespace App\Http\Controllers;

use App\Events\ChatMessageBroadcast;
use App\Models\ChatMessage;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ChatController extends Controller
{
    /**
     * Canais que o site tem permissao de ler/escrever no teste (ver data/XML/channels.xml no servidor).
     */
    private const ALLOWED_TEST_CHANNELS = [10];

    /**
     * Main Chat page (Index).
     */
    public function index(Request $request)
    {
        $characters = $request->user()?->account?->players()
            ->where('deleted', 0)
            ->orderBy('name')
            ->get(['id', 'name']) ?? collect();

        return Inertia::render('Chat/Index', [
            'channels' => ChatMessage::CHANNELS,
            'characters' => $characters,
            'messages' => $this->recentMessages(array_key_first(ChatMessage::CHANNELS)),
        ]);
    }

    /**
     * Get recent messages for a channel (history).
     */
    public function history(Request $request)
    {
        $data = $request->validate([
            'channel_id' => ['required', Rule::in(array_keys(ChatMessage::CHANNELS))],
        ]);

        return response()->json([
            'messages' => $this->recentMessages((int) $data['channel_id']),
        ]);
    }

    /**
     * Store a message from the main Chat page.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'channel_id' => ['required', Rule::in(array_keys(ChatMessage::CHANNELS))],
            'character' => ['required', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:255'],
        ]);

        $user = $request->user();
        $ownsCharacter = $user->account?->players()
            ->where('name', $data['character'])
            ->where('deleted', 0)
            ->exists();

        if (! $ownsCharacter) {
            abort(403, 'Personagem não pertence à sua conta.');
        }

        $chatMessage = ChatMessage::create([
            'channel_id' => $data['channel_id'],
            'source' => 'site',
            'author_name' => $data['character'],
            'user_id' => $user->id,
            'message' => $data['message'],
            'created_at' => now(),
        ]);

        broadcast(new ChatMessageBroadcast($chatMessage));

        return response()->json(['status' => 'ok']);
    }

    /**
     * Upstream Chat Test page.
     */
    public function page(Request $request): Response
    {
        return Inertia::render('Chat/Test', [
            'players' => $request->user()->account->players()
                ->where('deleted', false)
                ->get(['id', 'name']),
        ]);
    }

    /**
     * Upstream Chat Test JSON index.
     */
    public function testIndex(Request $request)
    {
        $data = $request->validate([
            'channel_id' => ['sometimes', 'integer', Rule::in(self::ALLOWED_TEST_CHANNELS)],
            'since_id' => ['sometimes', 'integer', 'min:0'],
        ]);

        $channelId = $data['channel_id'] ?? self::ALLOWED_TEST_CHANNELS[0];

        $messages = ChatMessage::query()
            ->where('channel_id', $channelId)
            ->when(isset($data['since_id']), fn ($query) => $query->where('id', '>', $data['since_id']))
            ->orderBy('id')
            ->limit(50)
            ->get(['id', 'source', 'author_name', 'message', 'created_at']);

        return response()->json(['messages' => $messages]);
    }

    /**
     * Upstream Chat Test store.
     */
    public function testStore(Request $request)
    {
        $data = $request->validate([
            'channel_id' => ['sometimes', 'integer', Rule::in(self::ALLOWED_TEST_CHANNELS)],
            'player_id' => ['required', 'integer'],
            'message' => ['required', 'string', 'max:255'],
        ]);

        $player = $request->user()->account->players()
            ->where('deleted', false)
            ->findOrFail($data['player_id']);

        $chatMessage = ChatMessage::create([
            'source' => 'site',
            'channel_id' => $data['channel_id'] ?? self::ALLOWED_TEST_CHANNELS[0],
            'author_name' => $player->name,
            'message' => $data['message'],
        ]);

        return response()->json(['message' => $chatMessage], 201);
    }

    /**
     * Recent messages helper.
     */
    private function recentMessages(int $channelId)
    {
        return ChatMessage::where('channel_id', $channelId)
            ->orderByDesc('id')
            ->limit(50)
            ->get(['id', 'channel_id', 'source', 'author_name', 'message', 'created_at'])
            ->reverse()
            ->values();
    }
}
