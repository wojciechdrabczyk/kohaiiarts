import DefaultLayout from '@/layouts/default-layout';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function Faq() {
    return (
        <div>
            <Head>
                <title>FAQ</title>
                <meta name="description" content="Your frequently asked questions" />
            </Head>
            <section className="" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
                    <h1 className="mb-4 flex justify-center tracking-tight sm:text-3xl text-gray-800 dark:text-gray-200">
                        Frequently asked questions
                    </h1>
                    <div className="mb-8 px-2 text-center text-sm  text-gray-500 dark:text-gray-300">
                        <p className="text-[14px] mx-auto max-w-2xl leading-relaxed">
                            I’ve put together some answers to questions I often get about my art and commissions.
                            If you still have a question, don’t hesitate to reach out—I'm always happy to chat!
                        </p>
                    </div>

                    <div className="grid border-t border-gray-200 pt-8 text-left md:grid-cols-2 md:gap-16 dark:border-gray-700">
                        <div>
                            <div className="mb-10">
                                <h3 className="mb-4 text-md font-medium tracking-tight text-gray-900 dark:text-white">
                                    Do you take commissions?
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                    Yes! I'm currently open for personal commissions.
                                </p>
                                <br/>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                    Prices and additional charges may apply for complex backgrounds, accessories, weapons, pets, or canvas resizing for printing.
                                    Turnaround time is usually 2–4 weeks depending on the piece and current queue.
                                </p>
                            </div>

                            <div className="mb-10">
                                <h3 className="mb-4 text-md font-medium tracking-tight text-gray-900 dark:text-white">
                                    Can I use your art as a profile picture or wallpaper?
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                    Yes! For personal use only. I’d appreciate credit if posted publicly.
                                    For any commercial use, please contact me first to discuss licensing.
                                </p>
                            </div>

                            <div className="mb-10">
                                <h3 className="mb-4 text-md font-medium tracking-tight text-gray-900 dark:text-white">
                                    Are commissions open right now?
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                    Commissions open based on availability. I announce openings on my social media, so feel free to follow me there to stay updated!
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="mb-10">
                                <h3 className="mb-4 text-md font-medium tracking-tight text-gray-900 dark:text-white">
                                    What tools do you use for your art?
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                    I use a digital tablet along with PaintTool SAI. For traditional work, I use ink pens, markers, and sketchbooks.
                                </p>
                            </div>

                            <div className="mb-10">
                                <h3 className="mb-4 text-md font-medium tracking-tight text-gray-900 dark:text-white">
                                    Can I request specific characters or fan art?
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                    I take themed requests or fan art commissions. Feel free to ask—just note that I may not accept all depending on style or timing.
                                </p>
                            </div>

                            <div className="mb-10">
                                <h3 className="mb-4 text-md font-medium tracking-tight text-gray-900 dark:text-white">
                                    Do you offer commercial illustration work?
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                    Yes! I'm open to commercial projects like book covers, merchandise, branding, and more.
                                    Please reach out with your idea and we can discuss rates and licensing.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

Faq.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
