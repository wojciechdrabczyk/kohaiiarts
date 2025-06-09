<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class StaticPageController extends Controller
{
    public function illustrations()
    {
        return Inertia::render('illustrations');
    }

    public function store()
    {
        return Inertia::render('store');
    }

    public function support()
    {
        return Inertia::render('support');
    }

    public function commissions()
    {
        return Inertia::render('commissions');
    }

    public function faq()
    {
        return Inertia::render('faq');
    }

    public function contact()
    {
        return Inertia::render('contact');
    }

    public function notfound()
    {
        return Inertia::render('not-found');
    }
}
