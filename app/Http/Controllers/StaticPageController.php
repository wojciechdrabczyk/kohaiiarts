<?php

namespace App\Http\Controllers;

use App\Models\Illustration;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Honeypot\Honeypot;

class StaticPageController extends Controller
{
    public function illustrations()
    {
        $images = Illustration::published()
            ->orderBy('sort_order', 'asc')
            ->orderBy('id', 'asc')
            ->get()
            ->map(fn($i) => [
                'src' => $i->url(),
                'caption' => $i->caption,
            ])
            ->values();

        return Inertia::render('illustrations', ['images' => $images]);
    }

    public function store()
    {
        return Inertia::render('store');
    }

    public function support()
    {
        return Inertia::render('support');
    }

    public function commissions(Honeypot $honeypot)
    {
        return Inertia::render('commissions', [
            'honeypot' => $honeypot,
        ]);
    }

    public function faq()
    {
        return Inertia::render('faq');
    }

    public function contact(Honeypot $honeypot)
    {
        return Inertia::render('contact', [
            'honeypot' => $honeypot,
        ]);
    }

    public function notfound()
    {
        return Inertia::render('not-found');
    }
}
