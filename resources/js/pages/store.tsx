import InprntIcon from '@/assets/icons/InprntIcon';
import DefaultLayout from '@/layouts/default-layout';
import { Head } from '@inertiajs/react';
import React from 'react';
import { FaPatreon } from 'react-icons/fa6';
import VGenIcon from '@/assets/icons/VgenIcon';

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
                            href="https://vgen.co/KohaiiArts"
                            aria-disabled="true"
                            title="NEW"
                            className="group block rounded-xl border border-[#6e1f48] bg-white p-5 shadow-md transition hover:shadow-xl dark:bg-neutral-800 dark:hover:bg-neutral-700"
                        >
                            <span className="absolute top-4 right-4 rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-700 dark:bg-neutral-700 dark:text-gray-200">
                                NEW
                            </span>

                            <div className="flex items-center gap-4">
                                <VGenIcon size={40} className="text-gray-800 transition-transform group-hover:scale-105 dark:text-white" />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">VGen</h3>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Support me and commission your artwork.</p>
                                </div>
                            </div>
                        </a>

                        <a
                            href="https://www.inprnt.com/gallery/kohaiiarts/"
                            title="INPRNT"
                            target="_blank"
                            className="group block rounded-xl border border-[#6e1f48] bg-white p-5 shadow-md transition hover:shadow-xl dark:bg-neutral-800 dark:hover:bg-neutral-700"
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
                            title="Patreon"
                            target="_blank"
                            className="group block rounded-xl border border-[#6e1f48] bg-white p-5 shadow-md transition hover:shadow-xl dark:bg-neutral-800 dark:hover:bg-neutral-700"
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

                    <div className="mt-12 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-500">Thanks for checking out the shop and supporting my work.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

Store.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
