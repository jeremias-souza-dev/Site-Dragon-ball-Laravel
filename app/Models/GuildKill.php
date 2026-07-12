<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GuildKill extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'guild_id',
        'war_id',
        'death_id',
    ];

    public function guild(): BelongsTo
    {
        return $this->belongsTo(Guild::class);
    }

    public function war(): BelongsTo
    {
        return $this->belongsTo(GuildWar::class, 'war_id');
    }

    public function death(): BelongsTo
    {
        return $this->belongsTo(PlayerDeath::class, 'death_id');
    }
}
