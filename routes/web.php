<?php

use App\Http\Controllers\Admin\IllustrationsAdminController;
use App\Http\Controllers\CommissionController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\StaticPageController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Spatie\Honeypot\ProtectAgainstSpam;

Route::get('/', [StaticPageController::class, 'illustrations'])->name('home');
Route::get('/store', [StaticPageController::class, 'store'])->name('store');
Route::get('/support', [StaticPageController::class, 'support'])->name('support');
Route::get('/commissions', [StaticPageController::class, 'commissions'])->name('commissions');
Route::get('/faq', [StaticPageController::class, 'faq'])->name('faq');
Route::get('/contact', [StaticPageController::class, 'contact'])->name('contact');
Route::get('/not-found', [StaticPageController::class, 'notfound'])->name('notfound');

// Authenticated area
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
});

// Admin (authenticated)
Route::middleware(['auth', 'verified'])
    ->prefix('admin')->name('admin.')
    ->group(function () {
        Route::get('illustrations', [IllustrationsAdminController::class, 'index'])->name('illustrations.index');
        Route::post('illustrations', [IllustrationsAdminController::class, 'store'])->name('illustrations.store');

        Route::patch('illustrations/reorder', [IllustrationsAdminController::class, 'reorder'])->name('illustrations.reorder');

        Route::patch('illustrations/{illustration}', [IllustrationsAdminController::class, 'update'])
            ->whereNumber('illustration')->name('illustrations.update');

        Route::delete('illustrations/{illustration}', [IllustrationsAdminController::class, 'destroy'])
            ->whereNumber('illustration')->name('illustrations.destroy');
    });

Route::post('/contact', [ContactController::class, 'send'])
    ->middleware([ProtectAgainstSpam::class, 'throttle:contact_form'])
    ->name('contact.submit');

Route::post('/commissions', [CommissionController::class, 'submit'])
    ->middleware([ProtectAgainstSpam::class, 'throttle:commission_form'])
    ->name('commissions.submit');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
