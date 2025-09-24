<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::firstOrCreate(
            ['email' => 'kohaiiarts@gmail.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('KohaiiArtsAdminAccount10@'),
                'email_verified_at' => now(),
                'is_admin' => true,
            ]
        );
    }
}
