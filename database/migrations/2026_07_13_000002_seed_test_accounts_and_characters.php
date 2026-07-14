<?php

use App\Models\Player;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/**
 * Duas contas/personagens de teste extras (game accounts, sem User do site),
 * no mesmo padrao da conta "jere" seedada em 2026_07_12_999999.
 */
return new class extends Migration
{
    public function up(): void
    {
        DB::table('accounts')->insertOrIgnore([
            [
                'name' => 'teste1',
                'password' => bcrypt('123456'),
                'type' => 1,
                'premdays' => 65535,
                'lastday' => 0,
                'key' => '0',
                'email' => 'teste1@example.com',
                'blocked' => 0,
                'warnings' => 0,
                'group_id' => 1,
            ],
            [
                'name' => 'teste2',
                'password' => bcrypt('123456'),
                'type' => 1,
                'premdays' => 65535,
                'lastday' => 0,
                'key' => '0',
                'email' => 'teste2@example.com',
                'blocked' => 0,
                'warnings' => 0,
                'group_id' => 1,
            ],
        ]);

        $account1Id = DB::table('accounts')->where('name', 'teste1')->value('id');
        $account2Id = DB::table('accounts')->where('name', 'teste2')->value('id');

        DB::table('players')->insertOrIgnore([
            [
                'name' => 'Teste One',
                'group_id' => 1,
                'account_id' => $account1Id,
                'vocation' => 1, // Goku
                'sex' => 0,
                'town_id' => 1, // Terra
                'world_id' => 0, // Terra
                ...Player::defaultStats(),
                'level' => 200,
                'mana' => 9999,
                'manamax' => 9999,
                'ki' => 9999,
                'kimax' => 9999,
            ],
            [
                'name' => 'Teste Two',
                'group_id' => 1,
                'account_id' => $account2Id,
                'vocation' => 1, // Goku
                'sex' => 0,
                'town_id' => 1, // Terra
                'world_id' => 0, // Terra
                ...Player::defaultStats(),
                'level' => 200,
                'mana' => 9999,
                'manamax' => 9999,
                'ki' => 9999,
                'kimax' => 9999,
            ],
        ]);
    }

    public function down(): void
    {
        DB::table('players')->whereIn('name', ['Teste One', 'Teste Two'])->delete();
        DB::table('accounts')->whereIn('name', ['teste1', 'teste2'])->delete();
    }
};
