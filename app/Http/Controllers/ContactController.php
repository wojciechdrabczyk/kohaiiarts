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
            'name'    => ['required', 'string', 'min:2', 'max:30'],
            'email'   => ['required', 'email:rfc,dns', 'max:50'],
            'subject' => ['nullable', 'string', 'min:3', 'max:255'],
            'message' => ['required', 'string', 'min:5', 'max:1000'],
        ]);

        $to = config('mail.contact.address') ?? config('mail.from.address');

        Mail::to($to)->send(new ContactMessage($data));

        return back()->with('success', 'Message sent!');
    }
}
