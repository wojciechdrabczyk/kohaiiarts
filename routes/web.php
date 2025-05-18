<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/services', function () {
    return Inertia::render('services');
})->name('services');

Route::get('/faq', function () {
    return Inertia::render('faq');
})->name('faq');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');

Route::get('/illustrations', function () {
    return Inertia::render('illustrations');
})->name('illustrations');

Route::get('/not-found', function () {
    return Inertia::render('not-found');
})->name('notfound');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
