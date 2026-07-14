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
        'world_id',
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
        'ki',
        'kimax',
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

    /**
     * Valores padrão de um personagem recém-criado, espelhando os defaults do dbo.
     */
    public static function defaultStats(): array
    {
        return [
            'health' => 150,
            'healthmax' => 150,
            'experience' => 0,
            'lookbody' => 0,
            'lookfeet' => 0,
            'lookhead' => 0,
            'looklegs' => 0,
            'looktype' => 136,
            'lookaddons' => 0,
            'maglevel' => 0,
            'mana' => 0,
            'manamax' => 0,
            'ki' => 0,
            'kimax' => 0,
            'manaspent' => 0,
            'soul' => 0,
            'conditions' => '',
            'posx' => 0,
            'posy' => 0,
            'posz' => 0,
            'cap' => 0,
            'lastlogin' => 0,
            'lastip' => 0,
            'save' => 1,
            'skull' => 0,
            'skulltime' => 0,
            'rank_id' => 0,
            'lastlogout' => 0,
            'blessings' => 0,
            'balance' => 0,
            'stamina' => 2520,
            'direction' => 2,
            'loss_experience' => 100,
            'loss_mana' => 100,
            'loss_skills' => 100,
            'loss_containers' => 100,
            'loss_items' => 100,
            'premend' => 0,
            'marriage' => 0,
            'promotion' => 0,
            'worldtransfer' => 0,
            'nick_verify' => 0,
        ];
    }

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
