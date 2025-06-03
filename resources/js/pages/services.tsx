import DefaultLayout from '@/layouts/default-layout';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function Services() {
    return (
        <div>
            <Head>
                <title>Services</title>
                <meta name="description" content="Commisions and prices" />
            </Head>
        </div>
    );
}
Services.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
