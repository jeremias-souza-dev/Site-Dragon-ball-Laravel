<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PollVote extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'poll_votes';

    protected $fillable = [
        'answer_id',
        'poll_id',
        'account_id',
    ];

    public function poll(): BelongsTo
    {
        return $this->belongsTo(Poll::class);
    }

    public function answer(): BelongsTo
    {
        return $this->belongsTo(PollAnswer::class, 'answer_id');
    }

    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class);
    }
}
