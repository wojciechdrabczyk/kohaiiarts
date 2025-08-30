<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Upsert by unique 'email' to avoid duplicates
        User::upsert([
            [
                'name' => 'Kohaii',
                'email' => 'test@example.com',
                'password' => Hash::make(env('KOHAII_PASSWORD', 'testing')),
            ],
        ], ['email'], ['name', 'password']);
    }
}
