<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ShopHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'processed',
        'player_id',
        'product_id',
    ];

    public function player(): BelongsTo
    {
        return $this->belongsTo(Player::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(ShopOffer::class, 'product_id');
    }
}
