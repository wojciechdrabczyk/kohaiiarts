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

                        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
                            <a
                                href="https://www.patreon.com/KohaiiArts"
                                target="_blank"
                                className="group block rounded-lg border border-gray-200 bg-white p-6 shadow-md transition hover:shadow-xl dark:border-gray-700 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                            >
                                <div className="flex items-center gap-4">
                                    <FaPatreon
                                        className="min-w-[40px] min-h-[40px] flex-shrink-0 text-gray-800 transition-transform group-hover:scale-105 dark:text-white  "
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Patreon</h3>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                            Get access to sketches, early previews, and personal updates.
                                        </p>
                                    </div>
                                </div>
                            </a>

                            <a
                                href="https://throne.com/kohaiiarts"
                                target="_blank"
                                className="group block rounded-lg border border-gray-200 bg-white p-6 shadow-md transition hover:shadow-xl dark:border-gray-700 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                            >
                                <div className="flex items-center gap-4">
                                    <ThroneIcon
                                        className="min-w-[40px] min-h-[40px] flex-shrink-0 text-gray-800 transition-transform group-hover:scale-105 dark:text-white"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Throne</h3>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                            Send me a thoughtful gift directly — art tools, snacks, and more!
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

Support.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
