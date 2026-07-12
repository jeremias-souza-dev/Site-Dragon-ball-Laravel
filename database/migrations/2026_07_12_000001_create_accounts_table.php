<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->unique()->constrained()->nullOnDelete();
            $table->string('name');
            $table->string('password');
            $table->string('salt', 40)->default('');
            $table->string('email')->unique();
            $table->string('email_new')->nullable();
            $table->string('email_code')->nullable();
            $table->string('rlname')->nullable();
            $table->string('location')->nullable();
            $table->string('nickname')->nullable();
            $table->string('avatar')->nullable();
            $table->string('key')->nullable();
            $table->boolean('blocked')->default(false);
            $table->integer('warnings')->default(0);
            $table->integer('group_id')->default(1);
            $table->integer('premdays')->default(0);
            $table->unsignedInteger('lastday')->default(0);
            $table->integer('type')->default(1);
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

    public function down()
    {
        Schema::dropIfExists('accounts');
    }
};
