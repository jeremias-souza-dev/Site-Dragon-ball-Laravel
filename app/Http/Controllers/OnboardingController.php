<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class OnboardingController extends Controller
{
    public function create(Request $request): Response|RedirectResponse
    {
        $account = $request->user()->account;

        if (! $account) {
            return redirect()->route('register');
        }

        if ($account->players()->exists()) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('Create/Character', [
            'vocations' => config('dbz.vocations'),
            'cities' => config('dbz.cities'),
            'worlds' => config('dbz.worlds'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $account = $request->user()->account;

        if (! $account) {
            return redirect()->route('register');
        }

        if ($account->players()->exists()) {
            return redirect()->route('dashboard');
        }

        $data = $request->validate([
            'character_name' => 'required|string|min:4|max:32|unique:players,name',
            'sex' => 'required|integer|in:0,1',
            'vocation' => ['required', 'integer', Rule::in(array_keys(config('dbz.vocations')))],
            'town_id' => ['required', 'integer', Rule::in(array_keys(config('dbz.cities')))],
            'world_id' => ['required', 'integer', Rule::in(array_keys(config('dbz.worlds')))],
        ]);

        Player::create([
            'account_id' => $account->id,
            'name' => $data['character_name'],
            'vocation' => $data['vocation'],
            'sex' => $data['sex'],
            'town_id' => $data['town_id'],
            'world_id' => $data['world_id'],
            ...Player::defaultStats(),
        ]);

        return redirect()->route('dashboard');
    }
}
