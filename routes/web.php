<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\StaticPageController;

Route::get('/', [StaticPageController::class, 'welcome'])->name('home');
Route::get('/services', [StaticPageController::class, 'services'])->name('services');
Route::get('/faq', [StaticPageController::class, 'faq'])->name('faq');
Route::get('/contact', [StaticPageController::class, 'contact'])->name('contact');
Route::get('/illustrations', [StaticPageController::class, 'illustrations'])->name('illustrations');
Route::get('/not-found', [StaticPageController::class, 'notfound'])->name('notfound');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::post('/contact', [ContactController::class, 'send']);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
