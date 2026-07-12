<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Player extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'online',
        'deleted',
        'hide_char',
        'group_id',
        'level',
        'vocation',
        'health',
        'healthmax',
        'experience',
        'lookbody',
        'lookfeet',
        'lookhead',
        'looklegs',
        'looktype',
        'lookaddons',
        'maglevel',
        'mana',
        'manamax',
        'manaspent',
        'soul',
        'town_id',
        'posx',
        'posy',
        'posz',
        'cap',
        'sex',
        'lastlogin',
        'lastip',
        'save',
        'skull',
        'skulltime',
        'rank_id',
        'guildnick',
        'lastlogout',
        'blessings',
        'balance',
        'stamina',
        'direction',
        'loss_experience',
        'loss_mana',
        'loss_skills',
        'loss_containers',
        'loss_items',
        'premend',
        'marriage',
        'promotion',
        'worldtransfer',
        'nick_verify',
        'conditions',
        'old_name',
        'description',
        'comment',
        'account_id',
    ];

    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class);
    }

    public function guildMemberships(): HasMany
    {
        return $this->hasMany(GuildMembership::class);
    }

    public function guilds(): BelongsToMany
    {
        return $this->belongsToMany(Guild::class, 'guild_memberships');
    }

    public function shopHistories(): HasMany
    {
        return $this->hasMany(ShopHistory::class);
    }

    public function ownedGuilds(): HasMany
    {
        return $this->hasMany(Guild::class, 'ownerid');
    }
}
