<p><strong>Name:</strong> {{ $data['name'] }}</p>

@if(!empty($data['email']))
    <p><strong>Email:</strong> {{ $data['email'] }}</p>
@endif

<p><strong>Message:</strong><br>{!! nl2br(e($data['message'])) !!}</p>
