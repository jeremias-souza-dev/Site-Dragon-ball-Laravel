<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Message extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'from',
        'to',
        'title',
        'text',
        'time',
        'delete_from',
        'delete_to',
        'unread',
    ];

    public function sender(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'from');
    }

    public function recipient(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'to');
    }
}
