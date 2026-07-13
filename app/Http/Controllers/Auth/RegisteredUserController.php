<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(Request $request): Response|RedirectResponse
    {
        $authUser = $request->user();

        if ($authUser && $authUser->account) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('Create/Account', [
            'isAuthenticated' => (bool) $authUser,
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $authUser = $request->user();

        if ($authUser && $authUser->account) {
            return redirect()->route('dashboard');
        }

        $rules = [
            'name' => 'required|string|max:32|alpha_dash|unique:accounts,name',
            'nickname' => 'required|string|max:32|unique:accounts,nickname',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ];

        if (! $authUser) {
            $rules['email'] = 'required|string|lowercase|email|max:255|unique:'.User::class;
        }

        $request->validate($rules);

        $user = DB::transaction(function () use ($request, $authUser) {
            $user = $authUser ?: User::create([
                'name' => $request->nickname,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            Account::create([
                'user_id' => $user->id,
                'name' => $request->name,
                'nickname' => $request->nickname,
                'email' => $user->email,
                'password' => sha1($request->password),
            ]);

            return $user;
        });

        if (! $authUser) {
            event(new Registered($user));

            Auth::login($user);
        }

        return redirect(route('onboarding.create', absolute: false));
    }
}
