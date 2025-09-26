<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Route;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function registration_screen_behaves_correctly_based_on_route_presence(): void
    {
        // If the 'register' route exists, it should render; otherwise, it should 404.
        if (Route::has('register')) {
            $this->get('/register')->assertOk();
        } else {
            $this->get('/register')->assertNotFound();
        }
    }

    /** @test */
    public function users_can_register_when_route_is_enabled(): void
    {
        // If there's no register route (disabled), skip this test.
        if (! Route::has('register')) {
            $this->markTestSkipped('Registration route is disabled in this environment.');
        }

        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        // Should redirect to dashboard after successful registration
        $response->assertStatus(302);
        $response->assertRedirect('/dashboard');

        // New user should be authenticated
        $this->assertAuthenticated();
    }

    /** @test */
    public function registration_is_blocked_when_route_is_disabled(): void
    {
        // If the route exists (enabled), skip this "disabled" assertion.
        if (Route::has('register')) {
            $this->markTestSkipped('Registration route is enabled in this environment.');
        }

        $this->get('/register')->assertNotFound();

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
