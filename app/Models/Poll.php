<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Poll extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'poll';

    protected $fillable = [
        'question',
        'created',
        'date_start',
        'date_end',
        'status',
    ];

    public function answers(): HasMany
    {
        return $this->hasMany(PollAnswer::class);
    }

    public function votes(): HasMany
    {
        return $this->hasMany(PollVote::class);
    }
}
