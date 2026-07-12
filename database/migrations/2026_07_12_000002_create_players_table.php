<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('players', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->unsignedTinyInteger('world_id')->default(0);
            $table->boolean('online')->default(false);
            $table->boolean('deleted')->default(false);
            $table->boolean('hide_char')->default(false);
            $table->integer('group_id')->default(1);
            $table->integer('level')->default(1);
            $table->integer('vocation')->default(0);
            $table->integer('health');
            $table->integer('healthmax');
            $table->bigInteger('experience');
            $table->integer('lookbody');
            $table->integer('lookfeet');
            $table->integer('lookhead');
            $table->integer('looklegs');
            $table->integer('looktype');
            $table->integer('lookaddons');
            $table->integer('maglevel');
            $table->integer('mana');
            $table->integer('manamax');
            $table->integer('manaspent');
            $table->integer('soul');
            $table->integer('town_id');
            $table->integer('posx');
            $table->integer('posy');
            $table->integer('posz');
            $table->integer('cap');
            $table->integer('sex');
            $table->integer('lastlogin');
            $table->integer('lastip');
            $table->integer('save');
            $table->integer('skull');
            $table->integer('skulltime');
            $table->integer('rank_id');
            $table->string('guildnick')->nullable();
            $table->integer('lastlogout');
            $table->integer('blessings');
            $table->bigInteger('balance');
            $table->integer('stamina');
            $table->integer('direction');
            $table->integer('loss_experience');
            $table->integer('loss_mana');
            $table->integer('loss_skills');
            $table->integer('loss_containers');
            $table->integer('loss_items');
            $table->integer('premend');
            $table->integer('marriage');
            $table->integer('promotion');
            $table->integer('worldtransfer');
            $table->integer('nick_verify');
            $table->string('conditions')->nullable();
            $table->string('old_name')->nullable();
            $table->text('description')->nullable();
            $table->text('comment')->nullable();
            $table->boolean('cast')->default(false);
            $table->integer('castViewers')->default(0);
            $table->string('castDescription')->nullable();
            $table->integer('created')->nullable();
            $table->foreignId('account_id')->constrained()->cascadeOnDelete();
            $table->timestamps();

            $table->index(['deleted', 'experience']);
            $table->index(['deleted', 'online']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('players');
    }
};
