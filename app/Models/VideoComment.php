<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VideoComment extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'author',
        'video',
        'time',
        'text',
    ];

    public function player(): BelongsTo
    {
        return $this->belongsTo(Player::class, 'author');
    }

    public function parentVideo(): BelongsTo
    {
        return $this->belongsTo(Video::class, 'video');
    }
}
