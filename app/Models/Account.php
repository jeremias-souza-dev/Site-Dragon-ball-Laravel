<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Account extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'password',
        'email',
        'email_new',
        'email_code',
        'rlname',
        'location',
        'nickname',
        'avatar',
        'key',
        'premdays',
        'type',
        'premium_points',
        'page_access',
        'page_lastday',
        'email_new_time',
        'next_email',
        'about_me',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function players(): HasMany
    {
        return $this->hasMany(Player::class);
    }

    public function pagseguroTransactions(): HasMany
    {
        return $this->hasMany(PagseguroTransaction::class);
    }
}
