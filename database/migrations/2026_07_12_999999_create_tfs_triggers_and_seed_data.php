<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/**
 * Triggers (5) e dados iniciais do TFS 0.4. Seeds copiados do schema.sql (linhas 45-47,
 * 67, 123). Os triggers ondelete_accounts/ondelete_players usam o formato PÓS-migração
 * de `bans` (coluna `value` + `type` IN (...)), não o formato cru do schema.sql (linhas
 * 375-422), porque a tabela `bans` criada nas migrations já está no formato final.
 * DEVE ser a ÚLTIMA migration a rodar.
 *
 * Ordem interna importa: seeds ANTES dos triggers (no schema original o INSERT do
 * Account Manager acontece antes de criar oncreate_players, então ele não ganha skills).
 */
return new class extends Migration
{
    public function up(): void
    {
        // ===== Seeds (schema.sql) =====

        // groups — ids 1, 2, 3 (linhas 45-47)
        DB::table('groups')->insertOrIgnore([
            ['id' => 1, 'name' => 'player', 'flags' => 0, 'access' => 0, 'maxdepotitems' => 0, 'maxviplist' => 0],
            ['id' => 2, 'name' => 'a gamemaster', 'flags' => 137438953471, 'access' => 1, 'maxdepotitems' => 0, 'maxviplist' => 0],
            ['id' => 3, 'name' => 'a god', 'flags' => 134788128760, 'access' => 1, 'maxdepotitems' => 0, 'maxviplist' => 0],
        ]);

        // conta 1 (Account Manager) — linha 67
        DB::table('accounts')->insertOrIgnore([
            'id' => 1,
            'name' => 'jere',
            'password' => bcrypt('123456'), // Criptografa a senha usando a mesma ideia do Laravel
            'type' => 1,
            'premdays' => 65535,
            'lastday' => 0,
            'key' => '0',
            'email' => 'jeremiiias@hotmail.com',
            'blocked' => 0,
            'warnings' => 0,
            'group_id' => 1,
        ]);
        // player 1 (Account Manager) — linha 123
        DB::table('players')->insertOrIgnore([
            'id' => 1,
            'name' => 'Account Manager',
            'group_id' => 1,
            'account_id' => 1,
            'level' => 1,
            'vocation' => 0,
            'health' => 150,
            'healthmax' => 150,
            'looktype' => 110,
            'town_id' => 0,
            'posx' => 50,
            'posy' => 50,
            'posz' => 7,
            'conditions' => '',
            'cap' => 400,
            'sex' => 0,
            'save' => 1,
        ]);

        // server_config — as migrations acima já criam as tabelas no formato FINAL
        // (pós-migração interna do C++, ver databasemanager.cpp). db_version deve refletir
        // isso (27, a versão mais alta que o updateDatabase() reconhece), senão o motor tenta
        // re-rodar ALTER TABLEs antigos em cima de tabelas que já estão no formato novo.
        //
        // NÃO seedar 'encryption' aqui: DatabaseManager::checkEncryption() (roda em todo boot)
        // espera um NÚMERO (enum Encryption_t: PLAIN=0 MD5=1 SHA1=2 SHA256=3 SHA512=4 VAHASH=5
        // BCRYPT=6), não a string. Se ausente, o motor registra o valor certo sozinho no
        // primeiro boot, sem tentar re-hashear nenhuma senha (só re-hasheia em cima de uma
        // MUDANÇA de valor já registrado — e faria isso usando o conteúdo atual da coluna
        // password como entrada, corrompendo hashes bcrypt já gerados).
        DB::table('server_config')->insertOrIgnore([
            ['config' => 'db_version', 'value' => '27'],
        ]);

        // ===== Triggers (schema.sql linhas 375-422) =====

        DB::unprepared("
            CREATE TRIGGER `ondelete_accounts`
            BEFORE DELETE
            ON `accounts`
            FOR EACH ROW
            BEGIN
                DELETE FROM `bans` WHERE `type` IN (3, 4) AND `value` = OLD.`id`;
            END
        ");

        DB::unprepared("
            CREATE TRIGGER `ondelete_guilds`
            BEFORE DELETE
            ON `guilds`
            FOR EACH ROW
            BEGIN
                UPDATE `players` SET `guildnick` = '', `rank_id` = 0 WHERE `rank_id` IN (SELECT `id` FROM `guild_ranks` WHERE `guild_id` = OLD.`id`);
            END
        ");

        DB::unprepared("
            CREATE TRIGGER `ondelete_players`
            BEFORE DELETE
            ON `players`
            FOR EACH ROW
            BEGIN
                DELETE FROM `bans` WHERE `type` IN (2, 5) AND `value` = OLD.`id`;
                UPDATE `houses` SET `owner` = 0 WHERE `owner` = OLD.`id`;
            END
        ");

        DB::unprepared("
            CREATE TRIGGER `oncreate_guilds`
            AFTER INSERT
            ON `guilds`
            FOR EACH ROW
            BEGIN
                INSERT INTO `guild_ranks` (`name`, `level`, `guild_id`) VALUES ('the Leader', 3, NEW.`id`);
                INSERT INTO `guild_ranks` (`name`, `level`, `guild_id`) VALUES ('a Vice-Leader', 2, NEW.`id`);
                INSERT INTO `guild_ranks` (`name`, `level`, `guild_id`) VALUES ('a Member', 1, NEW.`id`);
            END
        ");

        DB::unprepared("
            CREATE TRIGGER `oncreate_players`
            AFTER INSERT
            ON `players`
            FOR EACH ROW
            BEGIN
                INSERT INTO `player_skills` (`player_id`, `skillid`, `value`) VALUES (NEW.`id`, 0, 10);
                INSERT INTO `player_skills` (`player_id`, `skillid`, `value`) VALUES (NEW.`id`, 1, 10);
                INSERT INTO `player_skills` (`player_id`, `skillid`, `value`) VALUES (NEW.`id`, 2, 10);
                INSERT INTO `player_skills` (`player_id`, `skillid`, `value`) VALUES (NEW.`id`, 3, 10);
                INSERT INTO `player_skills` (`player_id`, `skillid`, `value`) VALUES (NEW.`id`, 4, 10);
                INSERT INTO `player_skills` (`player_id`, `skillid`, `value`) VALUES (NEW.`id`, 5, 10);
                INSERT INTO `player_skills` (`player_id`, `skillid`, `value`) VALUES (NEW.`id`, 6, 10);
            END
        ");
    }

    public function down(): void
    {
        DB::unprepared('DROP TRIGGER IF EXISTS `oncreate_players`');
        DB::unprepared('DROP TRIGGER IF EXISTS `oncreate_guilds`');
        DB::unprepared('DROP TRIGGER IF EXISTS `ondelete_players`');
        DB::unprepared('DROP TRIGGER IF EXISTS `ondelete_guilds`');
        DB::unprepared('DROP TRIGGER IF EXISTS `ondelete_accounts`');
    }
};
