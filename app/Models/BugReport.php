<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BugReport extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'bugtracker';

    protected $fillable = [
        'category',
        'time',
        'author',
        'text',
        'title',
        'done',
        'priority',
        'closed',
    ];

    public function player(): BelongsTo
    {
        return $this->belongsTo(Player::class, 'author');
    }
}
