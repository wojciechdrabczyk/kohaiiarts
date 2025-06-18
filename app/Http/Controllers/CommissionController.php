<?php

namespace App\Http\Controllers;

use App\Mail\CommissionRequest;
use App\Mail\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class CommissionController extends Controller
{
    public function submit(Request $request)
    {
        // Validate that there's 0 or more files X
        // Validate that they're image files X
        $data = $request->validate([
            'name' => 'required|string|min:2|max:30',
            'email' => 'nullable|email|max:50',
            'paypal_email' => 'nullable|email|max:50',
            'subject' => 'nullable|string|min:3|max:255',
            'message' => 'required|string|min:5|max:1000',
            'files.*' => 'nullable|mimes:jpg,png,webp'
        ]);

        $files = $request->allFiles(); // Get all uploaded files (including nested)
        $paths = [];

        foreach ($files as $key => $file) {
            if (is_array($file)) {
                foreach ($file as $subFile) {
                    $url = $subFile->storePublicly('uploads', 'public');
                    $paths[] = $url;
                }
            } else {
                $url = $file->storePublicly('uploads', 'public');
                $paths[] = $url;
            }
        }

        // All URLs:
        $urls = array_map(fn($x) => asset(Storage::url($x)), $paths);
        //Store the files on the publicdisk
        //Get public URL of the files

        //Embed image URL in the mail
        Mail::to('kohaiiarts@gmail.com')->send(new CommissionRequest([...$data, 'files' => $urls]));

        return back()->with('success', 'Message sent!');
    }
}
