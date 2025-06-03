import DefaultLayout from '@/layouts/default-layout';
import { Head } from '@inertiajs/react';
import React from 'react';
import { FaPatreon } from 'react-icons/fa6';
import ThroneIcon from '@/assets/icons/ThroneIcon';

export default function Support() {
    return (
        <div>
            <Head>
                <title>Support</title>
                <meta name="support" content="Thank you for supporting me!" />
            </Head>
            <section className="" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
                    <h1 className="mb-4 flex justify-center text-center tracking-normal text-black sm:text-3xl dark:text-gray-200">
                        Thank you for considering supporting me 💖
                    </h1>
                    <div className="mb-12 px-2 text-center text-[12px] text-gray-600 dark:text-gray-300">
                        <p className="mx-auto max-w-xl leading-relaxed">
                            Your support helps me keep doing what I love — making art and sharing it with the world. Whether it's through Patreon, Throne,
                            or simply sharing my work, your kindness truly means a lot. Thank you for being a part of this journey with me.
                        </p>
                    </div>

                    <div className="border-t border-gray-200 pt-8 text-center dark:border-gray-700">
                        <div className="mb-12">
                            <h2 className="mb-4 text-xl tracking-normal text-black dark:text-white">Why do I need your help</h2>
                            <div className="mx-auto max-w-2xl text-center">
                                <p className="text-[15px] leading-[1.75] text-gray-600 dark:text-gray-400">
                                    Making art full-time comes with a lot of unseen challenges — not just creatively, but practically. Support through
                                    Patreon or Throne helps cover tools, software, and most importantly, time. It gives me the space to focus on
                                    drawing and sharing with you.
                                </p>
                            </div>
                        </div>

                        <div className="mb-16">
                            <h2 className="mb-4 text-xl tracking-normal text-black dark:text-white">What do supporters get?</h2>
                            <div className="mx-auto max-w-2xl text-center">
                                <p className="text-[14px] leading-[1.75] text-gray-600 dark:text-gray-400">
                                    Supporters get access to behind-the-scenes sketches, progress shots, and personal updates I don’t share anywhere
                                    else. Some tiers also include early access to art, high-res files, or the chance to help guide future work.
                                    But truly, every bit of support helps me keep going — and I’m grateful for all of it.
                                </p>
                            </div>
                        </div>

                        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 sm:flex-row sm:justify-center">
                            <a
                                href="https://www.patreon.com/KohaiiArts"
                                target="_blank"
                                className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white px-6 py-4 text-base font-medium text-gray-800 shadow-md transition hover:bg-gray-50 dark:border-gray-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 sm:w-auto"
                            >
                                <FaPatreon size={24} /> Support me on Patreon
                            </a>

                            <a
                                href="https://throne.com/kohaiiarts"
                                target="_blank"
                                className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white px-6 py-4 text-base font-medium text-gray-800 shadow-md transition hover:bg-gray-50 dark:border-gray-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700 sm:w-auto"
                            >
                                <ThroneIcon size={24} /> Send a gift on Throne
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

Support.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
