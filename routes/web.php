<?php

use App\Http\Controllers\CommissionController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\StaticPageController;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Spatie\Honeypot\ProtectAgainstSpam;

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

// Public pages
Route::get('/', [StaticPageController::class, 'illustrations'])->name('home');
Route::get('/store', [StaticPageController::class, 'store'])->name('store');
Route::get('/support', [StaticPageController::class, 'support'])->name('support');
Route::get('/commissions', [StaticPageController::class, 'commissions'])->name('commissions');
Route::get('/faq', [StaticPageController::class, 'faq'])->name('faq');
Route::get('/contact', [StaticPageController::class, 'contact'])->name('contact');
Route::get('/not-found', [StaticPageController::class, 'notfound'])->name('notfound');

// Authenticated area
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('dashboard'))->name('dashboard');
});

// Form submits (protected)
Route::post('/contact', [ContactController::class, 'send'])
    ->middleware([ProtectAgainstSpam::class, 'throttle:contact_form'])
    ->name('contact.submit');

Route::post('/commissions', [CommissionController::class, 'submit'])
    ->middleware([ProtectAgainstSpam::class, 'throttle:commission_form'])
    ->name('commissions.submit');
