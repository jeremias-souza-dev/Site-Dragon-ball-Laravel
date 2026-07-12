<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('players', function (Blueprint $table) {
            $table->unsignedTinyInteger('world_id')->default(0)->after('name');
            $table->boolean('cast')->default(false)->after('comment');
            $table->integer('castViewers')->default(0)->after('cast');
            $table->string('castDescription')->nullable()->after('castViewers');
            $table->integer('created')->nullable()->after('castDescription');
        });

        Schema::table('guilds', function (Blueprint $table) {
            $table->unsignedTinyInteger('world_id')->default(0)->after('id');
            $table->integer('creationdata')->nullable()->after('ownerid');
            $table->integer('checkdata')->nullable()->after('creationdata');
            $table->unsignedBigInteger('balance')->default(0)->after('motd');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('players', function (Blueprint $table) {
            $table->dropColumn(['world_id', 'cast', 'castViewers', 'castDescription', 'created']);
        });

        Schema::table('guilds', function (Blueprint $table) {
            $table->dropColumn(['world_id', 'creationdata', 'checkdata', 'balance']);
        });
    }
};
