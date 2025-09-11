<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // Only attempt WAL if we're on sqlite AND the file actually exists.
        if (config('database.default') === 'sqlite') {
            $db = config('database.connections.sqlite.database');
            if ($db && $db !== ':memory:' && file_exists($db)) {
                try {
                    DB::connection()->getPdo()->exec('PRAGMA journal_mode = WAL;');
                } catch (\Throwable $e) {
                    // swallow during early boot
                }
            }
        }
        // Rate limiters
        RateLimiter::for('contact_form', function (Request $request) {
            return [
                Limit::perMinute(3)->by($request->ip()),
                Limit::perHour(20)->by($request->ip()),
            ];
        });

        RateLimiter::for('commission_form', function (Request $request) {
            return [
                Limit::perMinute(3)->by($request->ip()),
                Limit::perHour(20)->by($request->ip()),
            ];
        });
    }
}
