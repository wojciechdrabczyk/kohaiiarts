import InprntIcon from '@/assets/icons/InprntIcon';
import DefaultLayout from '@/layouts/default-layout';
import { Head } from '@inertiajs/react';
import React from 'react';
import { FaPatreon } from 'react-icons/fa6';
import { SiTeepublic } from 'react-icons/si';

export default function Store() {
    return (
        <div>
            <Head>
                <title>Store</title>
                <meta name="Store" content="Store where you can support me by purchasing goodies" />
            </Head>
            <section style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
                    <h1 className="mb-4 text-center text-3xl text-gray-900 dark:text-white">Where can I purchase your work?</h1>
                    <p className="mx-auto mb-10 max-w-2xl text-center text-gray-600 dark:text-gray-300">
                        You can purchase my art as prints or products through these platforms. Every order supports me a lot and helps me keep
                        creating.
                    </p>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <a
                            href="https://www.teepublic.com/stores/kohaiiarts"
                            target="_blank"
                            className="group block rounded-lg border border-gray-200 bg-white p-6 shadow-md transition hover:shadow-xl dark:border-gray-700 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                        >
                            <div className="flex items-center gap-4">
                                <SiTeepublic size={40} className="text-gray-800 transition-transform group-hover:scale-105 dark:text-white" />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">TeePublic</h3>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Buy my artwork on shirts, stickers, and more!</p>
                                </div>
                            </div>
                        </a>

                        <a
                            href="https://www.inprnt.com/gallery/kohaiiarts/"
                            target="_blank"
                            className="group block rounded-lg border border-gray-200 bg-white p-6 shadow-md transition hover:shadow-xl dark:border-gray-700 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                        >
                            <div className="flex items-center gap-4">
                                <InprntIcon size={40} className="text-gray-800 transition-transform group-hover:scale-105 dark:text-white" />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">INPRNT</h3>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Order high-quality prints of my illustrations.</p>
                                </div>
                            </div>
                        </a>

                        <a
                            href="https://www.patreon.com/KohaiiArts"
                            target="_blank"
                            className="group block rounded-lg border border-gray-200 bg-white p-6 shadow-md transition hover:shadow-xl dark:border-gray-700 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                        >
                            <div className="flex items-center gap-4">
                                <FaPatreon size={40} className="text-gray-800 transition-transform group-hover:scale-105 dark:text-white" />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Patreon</h3>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                        Get access to sketches, early previews, and personal updates.
                                    </p>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="mt-12" />

                    <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-500">More platforms and products coming soon.</p>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-500">Thank you for your support, it means the world to me!</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

Store.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
