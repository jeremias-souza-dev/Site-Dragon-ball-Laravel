<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('poll', function (Blueprint $table) {
            $table->id();
            $table->string('question', 150)->nullable()->index();
            $table->timestamp('created')->useCurrent();
            $table->dateTime('date_start')->nullable();
            $table->dateTime('date_end')->nullable();
            $table->boolean('status')->default(false);
        });

        Schema::create('poll_answer', function (Blueprint $table) {
            $table->id();
            $table->foreignId('poll_id')->constrained('poll')->cascadeOnDelete();
            $table->string('answer', 150)->nullable();
        });

        Schema::create('poll_votes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('answer_id')->nullable()->constrained('poll_answer')->cascadeOnDelete();
            $table->foreignId('poll_id')->nullable()->constrained('poll')->cascadeOnDelete();

            // Correção aqui:
            $table->unsignedInteger('account_id');
            $table->foreign('account_id')->references('id')->on('accounts')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('poll_votes');
        Schema::dropIfExists('poll_answer');
        Schema::dropIfExists('poll');
    }
};
