<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        DB::connection()->getPdo()->exec('PRAGMA journal_mode = WAL;');

        if (Schema::hasTable('users')) {
            User::updateOrInsert(
                ['email' => 'test@example.com'],
                ['name' =>  'Kohaii', 'password' => Hash::make(env('KOHAII_PASSWORD') ?? "testing")],
            );
        }
    }}
