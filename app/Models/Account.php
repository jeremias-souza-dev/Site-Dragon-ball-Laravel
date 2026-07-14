<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Account extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'password',
        'email',
        'email_new',
        'email_code',
        'rlname',
        'location',
        'nickname',
        'avatar',
        'key',
        'premdays',
        'type',
        'premium_points',
        'page_access',
        'page_lastday',
        'email_new_time',
        'next_email',
        'about_me',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function players(): HasMany
    {
        return $this->hasMany(Player::class);
    }

    public function pagseguroTransactions(): HasMany
    {
        return $this->hasMany(PagseguroTransaction::class);
    }

    /**
     * Hash plain password based on the game server config.lua encryption setting.
     */
    public static function hashPasswordForOTS(string $plainPassword): string
    {
        $configPath = base_path('../Servidor Dragon Ball Z/config.lua');
        $encryptionType = 'bcrypt';

        if (file_exists($configPath)) {
            $configContent = file_get_contents($configPath);
            if (preg_match('/encryptionType\s*=\s*["\']([^"\']+)["\']/', $configContent, $matches)) {
                $encryptionType = strtolower($matches[1]);
            }
        }

        if ($encryptionType === 'sha1') {
            return sha1($plainPassword);
        } elseif ($encryptionType === 'md5') {
            return md5($plainPassword);
        } elseif ($encryptionType === 'plain') {
            return $plainPassword;
        }

        return bcrypt($plainPassword);
    }
}
