<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Video extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'author',
        'title',
        'description',
        'youtube',
        'views',
        'time',
    ];

    public function player(): BelongsTo
    {
        return $this->belongsTo(Player::class, 'author');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(VideoComment::class, 'video');
    }
}
