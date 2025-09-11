<?php

use App\Http\Controllers\CommissionController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\StaticPageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Spatie\Honeypot\ProtectAgainstSpam;


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

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
