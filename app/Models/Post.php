<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'title',
        'text',
        'time',
        'author',
        'board_id',
        'thread_id',
    ];

    public function forum(): BelongsTo
    {
        return $this->belongsTo(Forum::class, 'board_id');
    }

    public function thread(): BelongsTo
    {
        return $this->belongsTo(Thread::class);
    }
}
