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

    public function support()
    {
        return Inertia::render('support');
    }

    public function services()
    {
        return Inertia::render('services');
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
