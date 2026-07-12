<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Guild extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'motd',
        'ownerid',
    ];

    public function owner(): BelongsTo
    {
        return $this->belongsTo(Player::class, 'ownerid');
    }

    public function memberships(): HasMany
    {
        return $this->hasMany(GuildMembership::class);
    }

    public function players(): BelongsToMany
    {
        return $this->belongsToMany(Player::class, 'guild_memberships');
    }
}
