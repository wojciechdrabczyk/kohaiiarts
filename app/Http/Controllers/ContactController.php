<?php

namespace App\Http\Controllers;

use App\Mail\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        // Validate that there's 0 or more files X
        // Validate that they're image files X
        $data = $request->validate([
            'name' => 'required|string|min:2|max:30',
            'email' => 'nullable|email|min:10|max:30',
            'subject' => 'nullable|string|min:3|max:30',
            'message' => 'required|string|min:5|max:255',
            'files.*' => 'nullable|mimes:jpg,png'
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
        Mail::to(config('mail.from.address'))->send(new ContactMessage([...$data, 'files' => $urls]));

        return back()->with('success', 'Message sent!');
    }
}
