<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Comment extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'news_id',
        'body',
        'time',
        'author',
    ];

    public function news(): BelongsTo
    {
        return $this->belongsTo(News::class);
    }

    public function player(): BelongsTo
    {
        return $this->belongsTo(Player::class, 'author');
    }
}
