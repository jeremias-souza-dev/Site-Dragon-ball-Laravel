<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Tabela `accounts` — núcleo 1:1 com o schema.sql do TFS 0.4 (linhas 49-65).
 * Colunas extras do SITE ficam no final (nullable/default — não afetam o servidor C++).
 * ATENÇÃO: password é gravada em SHA1 (config.lua: encryptionType = "sha1"), não bcrypt.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('accounts', function (Blueprint $table) {
            // ===== Núcleo TFS 0.4 (não alterar) =====
            $table->increments('id');
            $table->string('name', 32)->unique();
            $table->string('password')->default('');
            $table->integer('type')->default(1);
            $table->integer('premdays')->default(0);
            $table->unsignedInteger('lastday')->default(0);
            $table->string('key', 20)->default('0');
            $table->string('email')->default('');
            $table->boolean('blocked')->default(false);
            $table->integer('warnings')->default(0);
            $table->unsignedInteger('group_id')->default(1);
            $table->foreign('group_id')->references('id')->on('groups');

            // ===== Extras do site (seguros p/ o servidor) =====
            $table->foreignId('user_id')->nullable()->unique()->constrained()->nullOnDelete();
            $table->string('salt', 40)->default('');
            $table->string('email_new')->nullable();
            $table->string('email_code')->nullable();
            $table->string('rlname')->nullable();
            $table->string('location')->nullable();
            $table->string('nickname')->nullable();
            $table->string('avatar')->nullable();
            $table->integer('premium_points')->default(0);
            $table->integer('page_access')->nullable();
            $table->integer('page_lastday')->nullable();
            $table->integer('email_new_time')->nullable();
            $table->integer('next_email')->nullable();
            $table->integer('created')->nullable();
            $table->text('about_me')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('accounts');
    }
};
