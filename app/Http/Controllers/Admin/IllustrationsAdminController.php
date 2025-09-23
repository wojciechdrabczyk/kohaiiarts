<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Illustration;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class IllustrationsAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('illustrations-admin', [
            'items' => Illustration::query()
                ->orderBy('sort_order', 'asc')   // source of truth
                ->get()
                ->map(fn($i) => [
                    'id' => $i->id,
                    'url' => $i->url(),
                    'caption' => $i->caption,
                    'sort_order' => $i->sort_order,
                    'is_published' => $i->is_published,
                ]),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'images' => ['required', 'array', 'min:1'],
            'images.*' => ['file', 'image', 'mimes:jpg,jpeg,png,webp', 'max:8192'],
            'captions' => ['array'],
            'captions.*' => ['nullable', 'string', 'max:120'],
            'is_published' => ['nullable', 'boolean'],
        ]);

        $isPublished = $request->boolean('is_published', true);
        $nextOrder = (int)(\App\Models\Illustration::max('sort_order') ?? 0);

        foreach ($data['images'] as $idx => $file) {
            $name = Str::random(20) . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('images', $name, 'public');

            $rawCaption = Arr::get($data, "captions.$idx");
            $caption = is_string($rawCaption) ? trim($rawCaption) : null;
            if ($caption === '') {
                $caption = null;
            }

            Illustration::create([
                'path' => $path,
                'caption' => $caption,
                'sort_order' => ++$nextOrder,
                'is_published' => $isPublished,
            ]);
        }

        return back()->with('success', 'Illustrations uploaded.');
    }

    public function update(Request $request, Illustration $illustration)
    {
        $data = $request->validate([
            'caption' => ['nullable', 'string', 'max:120'],
            'sort_order' => ['nullable', 'integer', 'min:0', 'max:100000'],
            'is_published' => ['nullable', 'boolean'],
        ]);

        $illustration->update($data);

        return back()->with('success', 'Illustration updated.');
    }

    public function destroy(Illustration $illustration)
    {
        Storage::disk('public')->delete($illustration->path);
        $illustration->delete();

        return back()->with('success', 'Illustration removed.');
    }

    public function reorder(Request $request)
    {
        $data = $request->validate([
            'order' => ['required', 'array', 'min:1'],
            'order.*.id' => ['required', 'integer', 'exists:illustrations,id'],
            'order.*.sort_order' => ['nullable', 'integer'],
        ]);

        $idsInOrder = collect($data['order'])->pluck('id')->values();

        \DB::transaction(function () use ($idsInOrder) {
            $now = now();
            foreach ($idsInOrder as $index => $id) {
                Illustration::whereKey($id)->update([
                    'sort_order' => $index + 1,
                    'updated_at' => $now,
                ]);
            }
        });

        // Return the final order that was saved
        $ordered = Illustration::orderBy('sort_order', 'asc')->pluck('id')->values();

        return response()->json(['ok' => true, 'ordered' => $ordered], 200);
    }
}
