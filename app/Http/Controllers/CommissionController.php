<?php

namespace App\Http\Controllers;

use App\Mail\CommissionRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class CommissionController extends Controller
{
    public function submit(Request $request)
    {
        $data = $request->validate([
            'name'         => ['required', 'string', 'min:2', 'max:30'],
            'email'        => ['required', 'email:rfc,dns', 'max:50'],
            'paypal_email' => ['nullable', 'email:rfc,dns', 'max:50'],
            'subject'      => ['required', 'string', 'min:3', 'max:255'],
            'message'      => ['required', 'string', 'min:5', 'max:2000'],

            // files[]: optional, up to 5 images, 4MB each
            'files'        => ['nullable', 'array', 'max:5'],
            'files.*'      => ['file', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
        ]);

        // Store files and collect public URLs
        $urls = [];
        foreach ($request->file('files', []) as $file) {
            $path = $file->storePublicly('uploads/commissions', 'public');
            $urls[] = asset(Storage::url($path));
        }

        // Build payload for the mailable
        $payload = array_merge($data, ['files' => $urls]);

        // Recipient from config (maps your KOHAIIS_EMAIL_ADDRESS in config/mail.php)
        $to = config('mail.commissions.address');

        // Send (use ->queue() in prod if you run a worker)
        Mail::to($to)->send(new CommissionRequest($payload));

        return back()->with('success', 'Message sent!');
    }
}
