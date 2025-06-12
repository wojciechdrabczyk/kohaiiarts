<p><strong>Name:</strong> {{ $data['name'] }}</p>
<p><strong>Email:</strong> {{ $data['email'] }}</p>

@if(!empty($data['subject']))
    <p><strong>Subject:</strong> {{ $data['subject'] }}</p>
@endif

<p><strong>Message:</strong></p>
<p>{{ nl2br(e($data['message'])) }}</p>

@foreach ($data['files'] as $url)
    <img style="max-width: 500px" src="{{ $url }}"/>
@endforeach
