<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChatMessage extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'source',
        'channel_id',
        'author_name',
        'message',
    ];

    protected function casts(): array
    {
        return [
            'game_processed_at' => 'datetime',
            'site_processed_at' => 'datetime',
            'created_at' => 'datetime',
        ];
    }
}
