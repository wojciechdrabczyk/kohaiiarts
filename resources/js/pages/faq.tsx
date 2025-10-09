import DefaultLayout from '@/layouts/default-layout';
import { Head, Link } from '@inertiajs/react';
import React from 'react';

export default function Faq() {
    return (
        <div>
            <Head>
                <title>FAQ</title>
                <meta
                    name="description"
                    content="Learn more about Kohaii Arts, tools, process, inspirations, preferences, and how to get in touch."
                />
            </Head>

            <section style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-14 lg:px-6">
                    <h1 className="mb-4 flex justify-center tracking-tight text-gray-800 sm:text-3xl dark:text-gray-200">
                        Frequently asked questions
                    </h1>

                    <div className="mb-8 px-2 text-center text-sm text-gray-600 dark:text-gray-300">
                        <p className="mx-auto max-w-2xl text-[14px] leading-relaxed">
                            A little about how I work, what I love to draw, and how to reach me. If you are curious about commissions, there is a link
                            at the end. Thanks for being here.
                        </p>
                    </div>

                    <div className="grid border-t border-gray-200 pt-8 text-left md:grid-cols-2 md:gap-10 dark:border-gray-700">
                        <div className="mb-6">
                            <h3 className="text-md mb-2 font-medium tracking-tight text-gray-900 dark:text-white">
                                Who are you, and what do you like drawing?
                            </h3>
                            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                I’m Kohaii, a digital illustrator who loves expressive characters, soft lighting, and stylish outfits. I feel most at
                                home with female and androgynous characters, but I enjoy exploring many styles.
                            </p>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-md mb-2 font-medium tracking-tight text-gray-900 dark:text-white">Do you stream or share WIPs?</h3>
                            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                Sometimes I share small work in progress moments on social media. If a piece needs to stay private, I will keep it
                                offline.
                            </p>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-md mb-2 font-medium tracking-tight text-gray-900 dark:text-white">What tools do you use?</h3>
                            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                I work primarily in <strong>Clip Studio Paint</strong>. I color check exports and deliver high-resolution PNG or JPEG
                                files as needed.
                            </p>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-md mb-2 font-medium tracking-tight text-gray-900 dark:text-white">
                                What kind of references help the most?
                            </h3>
                            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                Good references include outfits, colors, poses, and short notes about mood or personality. Anything that helps me
                                understand your idea is welcome.
                            </p>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-md mb-2 font-medium tracking-tight text-gray-900 dark:text-white">What inspires your work?</h3>
                            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                Fashion, anime, game art, and cinematic light. I like mixing cute energy with elegant shapes and a little drama.
                            </p>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-md mb-2 font-medium tracking-tight text-gray-900 dark:text-white">
                                Do you draw NSFW or suggestive content?
                            </h3>
                            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                Within reason, yes. If you are unsure, ask privately and I will let you know what works for me.
                            </p>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-md mb-2 font-medium tracking-tight text-gray-900 dark:text-white">What’s your general process?</h3>
                            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                I start with references and small thumbnails, then a clean sketch, line art, and final rendering. I aim for clarity at
                                the sketch stage so the finish feels smooth and polished.
                            </p>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-md mb-2 font-medium tracking-tight text-gray-900 dark:text-white">How do I contact you?</h3>
                            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                You can reach me through the <strong>Contact</strong> page or my social links. I try to reply within a few days.
                            </p>
                        </div>
                    </div>

                    <div className="mt-10 flex justify-center">
                        <div className="w-full max-w-3xl rounded-xl border-2 border-[#822a59] bg-white p-5 shadow-md transition-colors duration-300 dark:border-[#c59d36] dark:bg-neutral-900">
                            <div className="flex flex-col items-center gap-3 text-center">
                                <p className="text-sm text-gray-700 dark:text-gray-200">Looking for pricing, turnaround, and request details?</p>
                                <div className="flex flex-wrap items-center justify-center gap-3">
                                    <Link
                                        href={route('commissions')}
                                        className="rounded border-2 border-[#822a59] px-4 py-2 text-sm font-medium text-[#6e1f48] transition-colors duration-200 hover:bg-[#822a59] hover:text-white focus-visible:ring-2 focus-visible:ring-[#822a59] focus-visible:ring-offset-2 focus-visible:outline-none active:bg-[#561335] active:text-white dark:border-[#c59d36] dark:text-[#c59d36] dark:hover:bg-[#c59d36]/20 dark:hover:text-[#c59d36] dark:focus-visible:ring-[#c59d36] dark:focus-visible:ring-offset-black dark:active:bg-[#c59d36]/30"
                                    >
                                        View Commission Info
                                    </Link>
                                    <Link
                                        href={route('contact')}
                                        className="rounded border-2 border-[#822a59] px-4 py-2 text-sm font-medium text-[#6e1f48] transition-colors duration-200 hover:bg-[#822a59] hover:text-white focus-visible:ring-2 focus-visible:ring-[#822a59] focus-visible:ring-offset-2 focus-visible:outline-none active:bg-[#561335] active:text-white dark:border-[#c59d36] dark:text-[#c59d36] dark:hover:bg-[#c59d36]/20 dark:hover:text-[#c59d36] dark:focus-visible:ring-[#c59d36] dark:focus-visible:ring-offset-black dark:active:bg-[#c59d36]/30"
                                    >
                                        Contact Me
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

Faq.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
