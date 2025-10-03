<meta charset="utf-8">
<meta name="csrf-token" content="{{ csrf_token() }}">
<meta name="viewport" content="width=device-width, initial-scale=1">

@php
    $siteName = config('app.name', 'Kohaii Arts');
    $title    = $metaTitle ?? "$siteName — Digital Illustrator / Hobbyist";
    $desc     = $metaDescription
               ?? "Aspiring Illewdstrator. Dominating the world one waifu at a time. "
                  . "I love drawing anything and everything under the sun!";
    $url      = $canonicalUrl ?? url()->current();

    $ogImg    = $ogImage ?? asset('img-static/LogoKohiiNight.jpg');

    $ogType   = 'website';
    $locale   = str_replace('_', '-', app()->getLocale());
@endphp

<title>{{ $title }}</title>
<meta name="description" content="{{ $desc }}">
<link rel="canonical" href="{{ $url }}">
<meta name="robots" content="index,follow">
<meta name="theme-color" content="#822a59">

{{-- Open Graph (Discord, FB) --}}
<meta property="og:type" content="{{ $ogType }}">
<meta property="og:site_name" content="{{ $siteName }}">
<meta property="og:locale" content="{{ $locale }}">
<meta property="og:title" content="{{ $title }}">
<meta property="og:description" content="{{ $desc }}">
<meta property="og:url" content="{{ $url }}">
<meta property="og:image" content="{{ $ogImg }}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Featured artwork by {{ $siteName }}">

{{-- Twitter (large image style) --}}
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="{{ $title }}">
<meta name="twitter:description" content="{{ $desc }}">
<meta name="twitter:image" content="{{ asset('img-static/twitter.jpg') }}">
<meta name="twitter:site" content="@KohaiiArts">

<link rel="icon" href="{{ asset('favicon.ico') }}" sizes="any">
<link rel="icon" href="{{ asset('favicon.svg') }}" type="image/svg+xml">

<link rel="preconnect" href="https://fonts.bunny.net">
<link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Kohaii",
      "alternateName": "Kohaii Arts",
      "url": "{{ config('app.url') }}",
  "jobTitle": "Illustrator",
  "description": "{{ $desc }}",
  "image": "{{ $ogImg }}",
  "knowsAbout": ["anime illustration","character design","digital art"]
  /* "sameAs": ["https://twitter.com/YourHandle","https://instagram.com/YourHandle"] */
}
</script>

<script>
    (function() {
        var appearance = @json($appearance ?? 'system');
        var root = document.documentElement;
        if (appearance === 'light') {
            root.classList.remove('dark');
            return;
        }
        if (appearance === 'dark') {
            root.classList.add('dark');
            return;
        }
        var mql = window.matchMedia('(prefers-color-scheme: dark)');
        var apply = function() {
            root.classList.toggle('dark', mql.matches);
        };
        apply();
        mql.addEventListener ? mql.addEventListener('change', apply) : mql.addListener(apply);
    })();
</script>
<style>
    html {
        background-color: oklch(1 0 0)
    }

    html.dark {
        background-color: oklch(0.145 0 0)
    }
</style>
