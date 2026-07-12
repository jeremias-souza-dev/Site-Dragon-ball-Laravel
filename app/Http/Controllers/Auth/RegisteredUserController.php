<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\Player;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register', [
            'vocations' => config('dbz.vocations'),
            'cities' => config('dbz.cities'),
            'worlds' => config('dbz.worlds'),
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:32|alpha_dash|unique:accounts,name',
            'nickname' => 'required|string|max:32|unique:accounts,nickname',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'character_name' => 'required|string|min:4|max:32|unique:players,name',
            'sex' => 'required|integer|in:0,1',
            'vocation' => ['required', 'integer', Rule::in(array_keys(config('dbz.vocations')))],
            'town_id' => ['required', 'integer', Rule::in(array_keys(config('dbz.cities')))],
            'world_id' => ['required', 'integer', Rule::in(array_keys(config('dbz.worlds')))],
        ]);

        $user = DB::transaction(function () use ($request) {
            $user = User::create([
                'name' => $request->nickname,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $account = Account::create([
                'user_id' => $user->id,
                'name' => $request->name,
                'nickname' => $request->nickname,
                'email' => $request->email,
                'password' => sha1($request->password),
            ]);

            Player::create([
                'account_id' => $account->id,
                'name' => $request->character_name,
                'vocation' => $request->vocation,
                'sex' => $request->sex,
                'town_id' => $request->town_id,
                'world_id' => $request->world_id,
                ...Player::defaultStats(),
            ]);

            return $user;
        });

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
