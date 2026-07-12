<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Killer extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'death_id',
        'final_hit',
        'unjustified',
        'war',
    ];

    public function death(): BelongsTo
    {
        return $this->belongsTo(PlayerDeath::class, 'death_id');
    }

    public function playerKillers(): HasMany
    {
        return $this->hasMany(PlayerKiller::class, 'kill_id');
    }

    public function killerPlayers(): BelongsToMany
    {
        return $this->belongsToMany(Player::class, 'player_killers', 'kill_id', 'player_id');
    }

    public function environmentKillers(): HasMany
    {
        return $this->hasMany(EnvironmentKiller::class, 'kill_id');
    }
}
