<?php

namespace App\Http\Controllers;

use App\Models\Illustration;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        return Inertia::render('dashboard', [
            'recentIllustrations' => Illustration::orderBy('created_at', 'desc')
                ->take(8)
                ->get()
                ->map(fn($i) => [
                    'id' => $i->id,
                    'url' => $i->url(),
                    'caption' => $i->caption,
                    'sort_order' => $i->sort_order,
                    'is_published' => $i->is_published,
                ]),
            'illustrationCount' => Illustration::count(),
        ]);
    }
}
