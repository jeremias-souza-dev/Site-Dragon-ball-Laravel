<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->name('home');

Route::get('/novidades', fn () => Inertia::render('News/Index'))->name('news.index');
Route::get('/personagens', fn () => Inertia::render('Characters/Index', [
    'initialQuery' => request('q', ''),
]))->name('characters.index');
Route::get('/guildas', fn () => Inertia::render('Guilds/Index'))->name('guilds.index');
Route::get('/ranking', fn () => Inertia::render('Highscores/Index'))->name('highscores.index');
Route::get('/guerra', fn () => Inertia::render('War/Index'))->name('war.index');
Route::get('/loja', fn () => Inertia::render('Shop/Index'))->name('shop.index');
Route::get('/discord', fn () => Inertia::render('Discord/Index'))->name('discord.index');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified', 'account.exists'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/create/character', [OnboardingController::class, 'create'])->name('onboarding.create');
    Route::post('/create/character', [OnboardingController::class, 'store'])->name('onboarding.store');
});

Route::middleware(['auth', 'account.exists'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/chat/test', [ChatController::class, 'page'])->name('chat.test');
    Route::get('/chat', [ChatController::class, 'index'])->name('chat.index');
    Route::post('/chat', [ChatController::class, 'store'])->name('chat.store');
});

// TODO: gate behind an admin role, not just auth, before this goes live.
Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', fn () => Inertia::render('Admin/Dashboard'))->name('dashboard');
    Route::get('/contas', fn () => Inertia::render('Admin/Accounts'))->name('accounts');
    Route::get('/noticias', fn () => Inertia::render('Admin/News'))->name('news');
    Route::get('/banimentos', fn () => Inertia::render('Admin/Bans'))->name('bans');
    Route::get('/config', fn () => Inertia::render('Admin/Settings'))->name('settings');
});

require __DIR__.'/auth.php';
