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
        Schema::table('accounts', function (Blueprint $table) {
            $table->string('salt', 40)->default('')->after('password');
            $table->unsignedInteger('lastday')->default(0)->after('premdays');
            $table->boolean('blocked')->default(false)->after('key');
            $table->integer('warnings')->default(0)->after('blocked');
            $table->integer('group_id')->default(1)->after('warnings');
            $table->integer('created')->nullable()->after('email_new_time');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('accounts', function (Blueprint $table) {
            $table->dropColumn(['salt', 'lastday', 'blocked', 'warnings', 'group_id', 'created']);
        });
    }
};
