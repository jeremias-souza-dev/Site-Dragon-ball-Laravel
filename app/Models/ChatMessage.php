<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChatMessage extends Model
{
    /**
     * TFS channel ids this bridge understands (see servidor/data/XML/channels.xml).
     */
    public const CHANNELS = [
        5 => 'Global',
        6 => 'Trade',
        9 => 'Help',
    ];

    public $timestamps = false;

    protected $fillable = [
        'channel_id',
        'source',
        'author_name',
        'user_id',
        'message',
        'game_processed_at',
        'site_processed_at',
        'created_at',
    ];

    protected function casts(): array
    {
        return [
            'game_processed_at' => 'datetime',
            'site_processed_at' => 'datetime',
            'created_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
