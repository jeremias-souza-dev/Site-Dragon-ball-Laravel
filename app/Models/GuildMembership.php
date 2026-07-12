<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GuildMembership extends Model
{
    use HasFactory;

    protected $fillable = [
        'rank_id',
        'player_id',
        'guild_id',
    ];

    public function player(): BelongsTo
    {
        return $this->belongsTo(Player::class);
    }

    public function guild(): BelongsTo
    {
        return $this->belongsTo(Guild::class);
    }
}
