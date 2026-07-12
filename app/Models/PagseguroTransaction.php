<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PagseguroTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_code',
        'status',
        'item_count',
        'points_added',
        'account_id',
    ];

    public function account(): BelongsTo
    {
        return $this->belongsTo(Account::class);
    }
}
