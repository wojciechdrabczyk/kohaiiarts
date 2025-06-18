<meta charset="UTF-8">
<div style="font-family: 'Segoe UI', sans-serif; color: #333; line-height: 1.6; font-size: 14px;">
    <h2 style="font-size: 18px; color: #111;">New Contact Message</h2>

    <p><strong>Name:</strong> {{ $data['name'] }}</p>

    @if(!empty($data['email']))
        <p><strong>Email:</strong> {{ $data['email'] }}</p>
    @endif

    @if(!empty($data['subject']))
        <p><strong>Subject:</strong> {{ $data['subject'] }}</p>
    @endif

    <p><strong>Message:</strong></p>
    <div style="background-color: #f9f9f9; padding: 10px; border-left: 4px solid #888; white-space: pre-line;">
        {{ $data['message'] }}
    </div>
</div>
