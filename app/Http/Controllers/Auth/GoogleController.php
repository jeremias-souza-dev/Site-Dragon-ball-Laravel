<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Account;
use App\Models\GoogleLoginSession;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function redirect(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Start the Google Login process from the game client.
     */
    public function clientRedirect(Request $request): RedirectResponse|JsonResponse
    {
        $sessionId = $request->query('session_id');
        if (!$sessionId) {
            return response()->json(['error' => 'Missing session_id'], 400);
        }

        // Invalidate any existing session with this ID
        GoogleLoginSession::where('session_id', $sessionId)->delete();

        // Create a new pending session
        $loginSession = GoogleLoginSession::create([
            'session_id' => $sessionId,
            'status' => 'pending',
            'expires_at' => now()->addMinutes(10),
        ]);

        // If the user is already authenticated in the browser, link immediately!
        if (Auth::check()) {
            $user = Auth::user();
            $loginSession->update(['user_id' => $user->id]);

            if ($user->account()->exists()) {
                $account = $user->account;
                $plainToken = 'G_' . Str::random(16);
                
                // Set temporary OTP password on the game account
                $hashedPassword = Account::hashPasswordForOTS($plainToken);
                $account->update(['password' => $hashedPassword]);

                $loginSession->update([
                    'status' => 'authenticated',
                    'account_id' => $account->id,
                    'otp_token' => $plainToken,
                ]);

                return redirect()->route('auth.google.client_success', [
                    'account_name' => $account->name,
                    'token' => $plainToken
                ]);
            } else {
                $loginSession->update(['status' => 'needs_registration']);
                return redirect()->route('register', ['session_id' => $sessionId]);
            }
        }

        // Otherwise, redirect to Google OAuth passing session_id in state
        return Socialite::driver('google')
            ->stateless()
            ->with(['state' => $sessionId])
            ->redirect();
    }

    /**
     * Poll the authentication status from the game client.
     */
    public function clientStatus(Request $request): JsonResponse
    {
        $sessionId = $request->query('session_id');
        if (!$sessionId) {
            return response()->json(['error' => 'Missing session_id'], 400);
        }

        $loginSession = GoogleLoginSession::where('session_id', $sessionId)->first();

        if (!$loginSession) {
            return response()->json(['status' => 'not_found'], 404);
        }

        if ($loginSession->expires_at->isPast()) {
            $loginSession->delete();
            return response()->json(['status' => 'expired']);
        }

        if ($loginSession->status === 'authenticated') {
            $account = $loginSession->account;
            $response = [
                'status' => 'authenticated',
                'accountName' => $account->name,
                'token' => $loginSession->otp_token,
            ];

            // Delete session after single retrieval for security
            $loginSession->delete();

            return response()->json($response);
        }

        return response()->json(['status' => $loginSession->status]);
    }

    public function callback(Request $request): RedirectResponse
    {
        $sessionId = $request->input('state');
        
        // Retrieve the authenticated Google user
        $googleUser = Socialite::driver('google')->stateless()->user();

        $user = User::where('google_id', $googleUser->getId())
            ->orWhere('email', $googleUser->getEmail())
            ->first();

        if ($user) {
            if (! $user->google_id) {
                $user->update([
                    'google_id' => $googleUser->getId(),
                    'avatar' => $googleUser->getAvatar(),
                ]);
            }
        } else {
            $user = User::create([
                'name' => $googleUser->getName() ?? $googleUser->getNickname(),
                'email' => $googleUser->getEmail(),
                'google_id' => $googleUser->getId(),
                'avatar' => $googleUser->getAvatar(),
                'password' => Hash::make(Str::random(32)),
                'email_verified_at' => now(),
            ]);
        }

        Auth::login($user, remember: true);

        // If this callback came from a client session
        if ($sessionId) {
            $loginSession = GoogleLoginSession::where('session_id', $sessionId)
                ->where('expires_at', '>', now())
                ->first();

            if ($loginSession) {
                $loginSession->update(['user_id' => $user->id]);

                if ($user->account()->exists()) {
                    $account = $user->account;
                    $plainToken = 'G_' . Str::random(16);
                    
                    $hashedPassword = Account::hashPasswordForOTS($plainToken);
                    $account->update(['password' => $hashedPassword]);

                    $loginSession->update([
                        'status' => 'authenticated',
                        'account_id' => $account->id,
                        'otp_token' => $plainToken,
                    ]);

                    return redirect()->route('auth.google.client_success', [
                        'account_name' => $account->name,
                        'token' => $plainToken
                    ]);
                } else {
                    $loginSession->update(['status' => 'needs_registration']);
                    return redirect()->route('register', ['session_id' => $sessionId]);
                }
            }
        }

        // Standard web flow
        if (! $user->account()->exists()) {
            return redirect()->route('register');
        }

        return redirect()->intended(route('dashboard', absolute: false));
    }
}
