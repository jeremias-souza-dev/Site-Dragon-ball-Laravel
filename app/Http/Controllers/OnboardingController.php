<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Player;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class OnboardingController extends Controller
{
    public function create(Request $request): Response|RedirectResponse
    {
        if ($request->user()->account()->exists()) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('Onboarding/Create', [
            'vocations' => config('dbz.vocations'),
            'cities' => config('dbz.cities'),
            'worlds' => config('dbz.worlds'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $user = $request->user();

        if ($user->account()->exists()) {
            return redirect()->route('dashboard');
        }

        $data = $request->validate([
            'name' => 'required|string|max:32|alpha_dash|unique:accounts,name',
            'nickname' => 'required|string|max:32|unique:accounts,nickname',
            'password' => ['required', 'confirmed', \Illuminate\Validation\Rules\Password::defaults()],
            'character_name' => 'required|string|min:4|max:32|unique:players,name',
            'sex' => 'required|integer|in:0,1',
            'vocation' => ['required', 'integer', Rule::in(array_keys(config('dbz.vocations')))],
            'town_id' => ['required', 'integer', Rule::in(array_keys(config('dbz.cities')))],
            'world_id' => ['required', 'integer', Rule::in(array_keys(config('dbz.worlds')))],
        ]);

        DB::transaction(function () use ($user, $data) {
            $account = Account::create([
                'user_id' => $user->id,
                'name' => $data['name'],
                'nickname' => $data['nickname'],
                'email' => $user->email,
                'password' => sha1($data['password']),
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
        });

        return redirect()->route('dashboard');
    }
}
