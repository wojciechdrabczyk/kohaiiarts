import DefaultLayout from '@/layouts/default-layout';
import React from 'react';

export default function NotFound() {
    return (
        <div>
            <div className="p-4">
                <h1 className="mb-4 text-3xl font-bold">D:</h1>
                <p>Sorry! We couldn't find the page you were looking for. This might be because:</p>
                <ul className="mb-4 list-inside list-disc">
                    <li>The page doesn't exist.</li>
                    <li>The URL was typed incorrectly.</li>
                </ul>
                <p>
                    You can return to the homepage{' '}
                    <a
                        href="/"
                        className="text-blue-600 no-underline hover:text-blue-800"
                        title="An Aspiring Digital Illustrator that creates art/illustrations that depict the creation of life in our most raw-natural God-given form."
                    >
                        by clicking here
                    </a>
                    , or use the navigation bar above—or the mobile menu icon in the top right if you're on a smaller screen.
                </p>
            </div>
        </div>
    );
}
NotFound.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
