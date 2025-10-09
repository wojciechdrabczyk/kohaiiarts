import ThroneIcon from '@/assets/icons/ThroneIcon';
import DefaultLayout from '@/layouts/default-layout';
import { Head } from '@inertiajs/react';
import React from 'react';
import { FaPatreon } from 'react-icons/fa6';

export default function Support() {
    return (
        <div>
            <Head>
                <title>Support</title>
                <meta name="support" content="Thank you for supporting me!" />
            </Head>

            <section style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
                    <h1 className="mb-4 text-center text-3xl leading-relaxed text-black dark:text-white">Thank you for considering supporting me</h1>

                    <div className="text-center">
                        <p className="mx-auto mb-12 max-w-2xl text-[14px] leading-[1.75] text-gray-600 dark:text-gray-300">
                            Your support helps me keep doing what I love and share my art with the world. Whether you support me on Patreon, send a
                            gift through Throne, or simply share my work, every bit of kindness means so much.
                        </p>
                    </div>

                    <div className="border-t border-gray-200 pt-8 text-center dark:border-gray-700">
                        <div className="mb-12">
                            <h2 className="mb-4 text-xl tracking-normal text-black dark:text-white">Why your support matters</h2>
                            <div className="mx-auto max-w-2xl text-center">
                                <p className="text-[14px] leading-[1.75] text-gray-600 dark:text-gray-400">
                                    Being a full-time artist has its challenges, both creative and practical. Your support through Patreon or Throne
                                    helps cover art tools, software, and most importantly, time to focus on creating new pieces to share with you.
                                </p>
                            </div>
                        </div>

                        <div className="mb-16">
                            <h2 className="mb-4 text-xl tracking-normal text-black dark:text-white">What supporters receive</h2>
                            <div className="mx-auto max-w-2xl text-center">
                                <p className="text-[14px] leading-[1.75] text-gray-600 dark:text-gray-400">
                                    Supporters get exclusive access to behind-the-scenes sketches, progress shots, and personal updates that I don’t
                                    post anywhere else. Some tiers also offer early access to finished artwork, high-resolution files, and a chance to
                                    help shape future projects. Every bit of support means the world to me.
                                </p>
                            </div>
                        </div>

                        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
                            <a
                                href="https://www.patreon.com/KohaiiArts"
                                target="_blank"
                                className="group block rounded-xl border-2 border-[#822a59] bg-white p-5 shadow-md transition-colors duration-300 hover:bg-[#822a59]/10 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-[#822a59] focus-visible:ring-offset-2 focus-visible:outline-none dark:border-[#c59d36] dark:bg-neutral-900 dark:hover:bg-[#4a3717]/30 dark:focus-visible:ring-[#c59d36] dark:focus-visible:ring-offset-black"
                            >
                                <div className="flex items-center gap-4">
                                    <FaPatreon className="min-h-[40px] min-w-[40px] flex-shrink-0 text-[#6e1f48] transition-all group-hover:scale-105 dark:text-[#c59d36] dark:group-hover:text-[#f1d27a] dark:group-hover:drop-shadow-[0_0_0.35rem_rgba(197,157,54,0.45)]" />
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
                                className="group block rounded-xl border-2 border-[#822a59] bg-white p-5 shadow-md transition-colors duration-300 hover:bg-[#822a59]/10 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-[#822a59] focus-visible:ring-offset-2 focus-visible:outline-none dark:border-[#c59d36] dark:bg-neutral-900 dark:hover:bg-[#4a3717]/30 dark:focus-visible:ring-[#c59d36] dark:focus-visible:ring-offset-black"
                            >
                                <div className="flex items-center gap-4">
                                    <ThroneIcon className="min-h-[40px] min-w-[40px] flex-shrink-0 text-[#6e1f48] transition-all group-hover:scale-105 dark:text-[#c59d36] dark:group-hover:text-[#f1d27a] dark:group-hover:drop-shadow-[0_0_0.35rem_rgba(197,157,54,0.45)]" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Throne</h3>
                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Send me a gift directly through Throne.</p>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className="mt-12 text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Thank you for being part of this journey. Your support truly keeps me going and helps me grow as an artist.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

Support.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
