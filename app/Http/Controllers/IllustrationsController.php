<?php

namespace App\Http\Controllers;

use App\Models\Illustration;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IllustrationsController extends Controller
{
    public function index()
    {
        $images = Illustration::published()
            ->orderBy('sort_order')
            ->latest()
            ->get()
            ->map(fn($i) => [
                'id' => $i->id,
                'src' => $i->url(),
                'caption' => $i->cpation,
            ]);

        return Inertia::render('illustrations', [
            'images' => $images,
        ]);
    }
}
