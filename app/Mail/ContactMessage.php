<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Envelope;

class ContactMessage extends Mailable
{
    use Queueable, SerializesModels;

    public array $data;
    /**
     * Create a new message instance.
     */
    public function __construct(array $data)
    {
        $this->data = $data;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): \Illuminate\Mail\Mailables\Envelope
    {
        $fromAddress = config('mail.from.address') ?: 'no-reply@example.com';
        $fromName    = config('mail.from.name') ?: 'App';

        $toAddress   = config('mail.contact_to.address') ?? $fromAddress;
        $toName      = config('mail.contact_to.name') ?? $fromName;

        return new \Illuminate\Mail\Mailables\Envelope(
            from: new \Illuminate\Mail\Mailables\Address($fromAddress, $fromName),
            to: [new \Illuminate\Mail\Mailables\Address($toAddress, $toName)],
            replyTo: [
                new \Illuminate\Mail\Mailables\Address($this->data['email'] ?? $fromAddress, $this->data['name'] ?? 'Sender'),
            ],
            subject: 'New Contact Message from ' . ($this->data['name'] ?? 'Unknown'),
        );
    }
    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.contact',
            with: [
                'data' => $this->data,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
