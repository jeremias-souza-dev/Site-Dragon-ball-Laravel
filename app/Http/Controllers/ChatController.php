<?php

namespace App\Http\Controllers;

use App\Models\ChatMessage;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class ChatController extends Controller
{
    /**
     * Canais que o site tem permissao de ler/escrever (ver data/XML/channels.xml no servidor).
     */
    private const ALLOWED_CHANNELS = [10];

    public function page(Request $request): Response
    {
        return Inertia::render('Chat/Test', [
            'players' => $request->user()->account->players()
                ->where('deleted', false)
                ->get(['id', 'name']),
        ]);
    }

    public function index(Request $request)
    {
        $data = $request->validate([
            'channel_id' => ['sometimes', 'integer', Rule::in(self::ALLOWED_CHANNELS)],
            'since_id' => ['sometimes', 'integer', 'min:0'],
        ]);

        $channelId = $data['channel_id'] ?? self::ALLOWED_CHANNELS[0];

        $messages = ChatMessage::query()
            ->where('channel_id', $channelId)
            ->when(isset($data['since_id']), fn ($query) => $query->where('id', '>', $data['since_id']))
            ->orderBy('id')
            ->limit(50)
            ->get(['id', 'source', 'author_name', 'message', 'created_at']);

        return response()->json(['messages' => $messages]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'channel_id' => ['sometimes', 'integer', Rule::in(self::ALLOWED_CHANNELS)],
            'player_id' => ['required', 'integer'],
            'message' => ['required', 'string', 'max:255'],
        ]);

        $player = $request->user()->account->players()
            ->where('deleted', false)
            ->findOrFail($data['player_id']);

        $chatMessage = ChatMessage::create([
            'source' => 'site',
            'channel_id' => $data['channel_id'] ?? self::ALLOWED_CHANNELS[0],
            'author_name' => $player->name,
            'message' => $data['message'],
        ]);

        return response()->json(['message' => $chatMessage], 201);
    }
}
