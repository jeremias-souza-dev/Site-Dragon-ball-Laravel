<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Thread extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'name',
        'sticked',
        'closed',
        'author',
        'time',
        'board_id',
    ];

    public function forum(): BelongsTo
    {
        return $this->belongsTo(Forum::class, 'board_id');
    }

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }
}
