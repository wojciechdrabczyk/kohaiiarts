<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_behavior_depends_on_config(): void
    {
        if (config('app.allow_registration')) {
            $this->get('/register')->assertStatus(200);
        } else {
            $this->get('/register')->assertNotFound(); // or ->assertRedirect('/login')
        }
    }

    public function test_new_users_can_register_when_enabled(): void
    {
        if (! config('app.allow_registration')) {
            $this->markTestSkipped('Registration is disabled in this environment.');
        }

        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));
    }

    public function test_registration_fails_when_disabled(): void
    {
        if (config('app.allow_registration')) {
            $this->markTestSkipped('Registration is enabled, skipping disabled-case test.');
        }

        // Trying to GET /register should fail
        $this->get('/register')->assertNotFound(); // or assertRedirect('/login')

        // Trying to POST /register should fail
        $this->post('/register', [
            'name' => 'Blocked User',
            'email' => 'blocked@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ])->assertNotFound();

        $this->assertGuest();
        $this->assertDatabaseMissing('users', ['email' => 'blocked@example.com']);
    }
}
