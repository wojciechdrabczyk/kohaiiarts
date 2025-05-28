import { Head } from '@inertiajs/react';
import DefaultLayout from '@/layouts/default-layout';
import React from 'react';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

        </>
    );
}

Welcome.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
