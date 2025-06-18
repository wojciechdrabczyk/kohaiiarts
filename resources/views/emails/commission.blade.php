<meta charset="UTF-8">
<div style="font-family: 'Segoe UI', sans-serif; color: #333; line-height: 1.6; font-size: 14px;">
    <h2 style="font-size: 18px; color: #111;">New Commission Request</h2>

    <p><strong>Name:</strong> {{ $data['name'] }}</p>

    @if(!empty($data['email']))
        <p><strong>Email:</strong> {{ $data['email'] }}</p>
    @endif

    @if(!empty($data['paypal_email']))
        <p><strong>PayPal Email:</strong> {{ $data['paypal_email'] }}</p>
    @endif

    @if(!empty($data['subject']))
        <p><strong>Subject / Commission Type:</strong> {{ $data['subject'] }}</p>
    @endif

    <p><strong>Commission Details:</strong></p>
    <div style="background-color: #f9f9f9; padding: 10px; border-left: 4px solid #888; white-space: pre-line;">
        {{ $data['message'] }}
    </div>

    @if(!empty($data['files']))
        <hr style="margin: 24px 0;" />
        <h3 style="font-size: 16px; color: #111;">Attached Images:</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 16px;">
            @foreach ($data['files'] as $url)
                @php
                    $filename = basename(parse_url($url, PHP_URL_PATH));
                @endphp
                <div style="width: 200px; text-align: center;">
                    <a href="{{ $url }}" target="_blank" style="display: block;">
                        <img
                            src="{{ $url }}"
                            alt="Attached Image"
                            style="max-width: 100%; max-height: 200px; object-fit: cover; border-radius: 6px; border: 1px solid #ccc;"
                        />
                    </a>
                    <div style="margin-top: 6px; font-size: 12px; color: #555; word-wrap: break-word; overflow-wrap: anywhere;">
                        {{ $filename }}
                    </div>
                </div>
            @endforeach
        </div>
    @endif
</div>
