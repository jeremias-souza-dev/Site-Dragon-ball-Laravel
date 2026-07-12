<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Friend extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'with',
        'friend',
        'time',
        'active',
    ];

    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'with');
    }

    public function friendAccount(): BelongsTo
    {
        return $this->belongsTo(Account::class, 'friend');
    }
}
