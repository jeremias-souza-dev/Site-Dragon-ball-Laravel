<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EnvironmentKiller extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'kill_id',
        'name',
    ];

    public function killer(): BelongsTo
    {
        return $this->belongsTo(Killer::class, 'kill_id');
    }
}
