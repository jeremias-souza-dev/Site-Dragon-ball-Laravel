<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class GuildWar extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'guild_id',
        'enemy_id',
        'begin',
        'end',
        'frags',
        'payment',
        'guild_kills',
        'enemy_kills',
        'status',
    ];

    public function guild(): BelongsTo
    {
        return $this->belongsTo(Guild::class, 'guild_id');
    }

    public function enemy(): BelongsTo
    {
        return $this->belongsTo(Guild::class, 'enemy_id');
    }

    public function kills(): HasMany
    {
        return $this->hasMany(GuildKill::class, 'war_id');
    }
}
