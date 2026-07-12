<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ShopOffer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'item',
        'count',
        'type',
        'points',
        'desc',
    ];

    public function shopHistories(): HasMany
    {
        return $this->hasMany(ShopHistory::class, 'product_id');
    }
}
