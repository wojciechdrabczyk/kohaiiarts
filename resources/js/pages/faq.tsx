import DefaultLayout from '@/layouts/default-layout';
import { Head } from '@inertiajs/react';

export default function Faq() {
    return (
        <div className="">
            <Head>
                <title>FAQ</title>
                <meta name="description" content="Your frequently asked questions" />
            </Head>
            <h1 className={'text-2xl font-bold'}>FAQ</h1>
            <p>Frequently Asked Questions</p>
        </div>
    );
}
Faq.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
