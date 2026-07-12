<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Forum extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'forums';

    protected $fillable = [
        'name',
        'description',
        'access',
        'closed',
        'moderators',
        'order',
        'requireLogin',
        'guild',
    ];

    public function guild(): BelongsTo
    {
        return $this->belongsTo(Guild::class, 'guild');
    }

    public function threads(): HasMany
    {
        return $this->hasMany(Thread::class, 'board_id');
    }

    public function posts(): HasMany
    {
        return $this->hasMany(Post::class, 'board_id');
    }
}
