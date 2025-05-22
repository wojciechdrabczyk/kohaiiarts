<?php

namespace App\Http\Controllers;

use App\Mail\ContactMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:30',
            'email' => 'nullable|email',
            'message' => 'required|string|max:255',
        ]);

        Mail::to(config('mail.from.address'))->send(new ContactMessage($data));

        return back()->with('success', 'Message sent!');
    }
}
