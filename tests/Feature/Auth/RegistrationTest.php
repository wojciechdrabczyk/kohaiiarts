<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function registration_screen_returns_404_when_disabled(): void
    {
        // Force registration OFF and rebuild the app so routes are re-registered
        config(['app.allow_registration' => false]);
        $this->refreshApplication();

        $this->get('/register')->assertNotFound();
        $this->post('/register', [
            'name' => 'Blocked User',
            'email' => 'blocked@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ])->assertNotFound();

        $this->assertGuest();
    }

    /** @test */
    public function registration_screen_renders_and_allows_signup_when_enabled(): void
    {
        // Force registration ON and rebuild the app so routes are re-registered
        config(['app.allow_registration' => true]);
        $this->refreshApplication();

        $this->get('/register')->assertOk();

        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(route('dashboard', absolute: false));
    }
}
