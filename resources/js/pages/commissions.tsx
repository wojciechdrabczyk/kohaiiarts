import DefaultLayout from '@/layouts/default-layout';
import { Head } from '@inertiajs/react';
import React from 'react';

export default function Commissions() {
    return (
        <div>
            <Head>
                <title>Commissions</title>
                <meta name="support" content="Thank you for supporting me!" />
            </Head>
            <section className="" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
                    <h1 className="mb-4 flex justify-center text-center tracking-normal text-black sm:text-3xl dark:text-gray-200">
                        Commission Services
                    </h1>
                    <div className="mb-12 px-2 text-center text-[12px] text-gray-600 dark:text-gray-300">
                        <p className="mx-auto max-w-xl leading-relaxed">
                            I offer custom anime-style illustrations tailored to your ideas. Whether you're looking for character portraits, or personal artwork, I'd love to bring your vision to life!
                        </p>
                    </div>

                    <div className="border-t border-gray-200 pt-8 text-center dark:border-gray-700">
                        <div className="mb-12">
                            <h2 className="mb-4 text-xl tracking-normal text-black dark:text-white">Base Commission Prices</h2>
                            <div className="mx-auto max-w-2xl text-center">
                                <ul className="mt-2 mb-4 list-disc list-inside text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                    <li>Portrait – $88</li>
                                    <li>Half Body – $108</li>
                                    <li>Full Body – $128</li>
                                </ul>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                    Complex accessories, weapons, backgrounds, and pets may incur additional charges depending on the request. Increased canvas size for printing will also add costs due to more detailed work. Turnaround time is typically 2–4 weeks depending on the complexity and queue.
                                </p>
                            </div>
                        </div>

                        <div className="mb-auto">
                            <h2 className="mb-4 text-xl tracking-normal  text-black dark:text-white">Commision Process</h2>
                            <div className="mx-auto max-w-2xl text-left text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-4 ">
                                <p>
                                    To request a commission, please send a message to any of my social DMs using the format below:
                                    <br /><br />
                                    <strong>Commission type</strong>:<br />
                                    <strong>Reference & info</strong>:<br />
                                    <strong>Email</strong>: (used to deliver the final piece)<br />
                                    <strong>Additional info</strong>: (optional)
                                </p>

                                <p>
                                    Once I receive your request, I’ll review it and let you know if I can take it on. If accepted, we’ll discuss the concept together and I’ll provide a rough sketch along with a deadline.
                                </p>

                                <p>
                                    After your approval of the sketch, I’ll request full payment via PayPal to begin lineart and coloring.
                                </p>

                                <p>
                                    A 5% PayPal fee will be added to the total and is to be covered by the client.
                                </p>

                                <p>
                                    Once payment is received, I’ll finish the artwork and deliver it to you by the agreed deadline.
                                </p>
                            </div>
                        </div>



                    </div>
                </div>
            </section>
        </div>
    );
}

Commissions.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
