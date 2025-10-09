<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    @php
        $siteName = config('app.name', 'Kohaii Arts');
        $title    = $metaTitle ?? "$siteName — Digital Illustrator / Hobbyist";
        $desc     = $metaDescription
                  ?? "Aspiring Illewdstrator. Dominating the world one waifu at a time. I love drawing anything and everything under the sun!";
        $url      = $canonicalUrl ?? url()->current();

        $ogPath   = 'img-static/twitter.jpg';
        $ogFile   = public_path($ogPath);
        $version  = is_file($ogFile) ? filemtime($ogFile) : time();
        $ogImg    = ($ogImage ?? asset($ogPath)) . "?v={$version}";

        $ogType   = 'website';
        $locale   = str_replace('_', '-', app()->getLocale());

    @endphp
    <title>{{ $title }}</title>
    <meta name="description" content="{{ $desc }}">
    <link rel="canonical" href="{{ $url }}">
    <meta name="robots" content="index,follow">
    <meta name="theme-color" content="#822a59">

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
    "knowsAbout": ["anime illustration", "character design", "digital art"]
  }
    </script>

    <script>
        (function () {
            try {
                var pref = @json($appearance ?? 'system'); // 'light' | 'dark' | 'system'
                var ls = localStorage.getItem('theme');
                var root = document.documentElement;

                function computeDark() {
                    if (pref === 'light') return false;
                    if (pref === 'dark')  return true;
                    if (ls === 'light' || ls === 'dark') return ls === 'dark';
                    return window.matchMedia('(prefers-color-scheme: dark)').matches;
                }

                root.classList.toggle('dark', computeDark());

                if (pref === 'system') {
                    var mql = window.matchMedia('(prefers-color-scheme: dark)');
                    var apply = function () {
                        var ls2 = localStorage.getItem('theme');
                        root.classList.toggle('dark',
                            ls2 === 'light' || ls2 === 'dark' ? (ls2 === 'dark') : mql.matches
                        );
                    };
                    (mql.addEventListener || mql.addListener).call(mql, 'change', apply);
                }
            } catch (e) {}
        })();
    </script>

    <style>
        html{background-color: oklch(1 0 0)}
        html.dark{background-color: oklch(0.145 0 0)}
    </style>

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>
<body class="font-sans antialiased">
@inertia
</body>
</html>
