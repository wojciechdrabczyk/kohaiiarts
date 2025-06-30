import InprntIcon from '@/assets/icons/InprntIcon';
import NewgroundsIcon from '@/assets/icons/NewgroundsIcon';
import ThroneIcon from '@/assets/icons/ThroneIcon';
import DefaultLayout from '@/layouts/default-layout';
import type { PageProps } from '@inertiajs/inertia';
import { Head, router, usePage } from '@inertiajs/react';
import React, { FormEvent, useState } from 'react';
import { BsInstagram } from 'react-icons/bs';
import { FaDiscord } from 'react-icons/fa';
import { FaPatreon, FaThreads, FaXTwitter } from 'react-icons/fa6';

type Status = 'success' | 'error' | null;

export default function Contact() {
    const [status, setStatus] = useState<Status>(null);
    const { errors } = usePage<PageProps>().props as {
        errors: Record<string, string>;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        router.post('/contact', formData, {
            onSuccess: () => {
                setStatus('success');
                e.currentTarget.reset();
            },
            onError: () => {
                setStatus('error');
            },
        });
    };

    const socialLinks = [
        { name: 'X', url: 'https://x.com/KohaiiArts', icon: <FaXTwitter size={32} /> },
        { name: 'Threads', url: 'https://www.threads.com/@kohaii_arts', icon: <FaThreads size={32} /> },
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/kohaii_arts/',
            icon: <BsInstagram size={32} className="text-pink-500" />,
        },
        {
            name: 'Discord',
            url: 'invitation link to the discord server?',
            icon: <FaDiscord size={32} className="text-indigo-500" />,
        },
        { name: 'Newgrounds', url: 'https://kohaiiarts.newgrounds.com/art', icon: <NewgroundsIcon size={32} /> },
        {
            name: 'Patreon',
            url: 'https://www.patreon.com/KohaiiArts',
            icon: <FaPatreon size={32} className="text-[#f96854]" />,
        },
        { name: 'Throne', url: 'https://throne.com/kohaiiarts', icon: <ThroneIcon size={32} /> },
        { name: 'Inprnt', url: 'https://www.inprnt.com/gallery/kohaiiarts/', icon: <InprntIcon size={32} /> },
    ];

    return (
        <div className="mt-6 p-4 sm:px-6 md:px-10" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <Head>
                <title>Contact</title>
                <meta name="description" content="Contact me" />
            </Head>

            <h1 className="mb-6 flex justify-center text-2xl tracking-tight text-gray-800 sm:text-3xl dark:text-gray-200">You can find me on</h1>
            <div className="mb-12 flex flex-wrap justify-center gap-4">
                {socialLinks.map(({ name, url, icon }) => (
                    <div key={url} className="group relative flex flex-col items-center space-y-1">
                        <a
                            href={url}
                            target="_blank"
                            aria-label={name}
                            rel="noopener noreferrer"
                            className="flex items-center justify-center rounded-full bg-black p-5 text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300"
                        >
                            {icon}
                        </a>
                        <span className="text-xs text-gray-600 sm:absolute sm:-top-3 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-full sm:rounded sm:bg-gray-700 sm:px-2 sm:py-1 sm:text-white sm:opacity-0 sm:transition sm:duration-200 group-hover:sm:opacity-100 dark:text-gray-300 dark:sm:bg-gray-200 dark:sm:text-black">
                            {name}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mb-10 px-2 text-center text-sm">
                <p className="mx-auto mb-12 max-w-2xl text-[14px] leading-[1.75] text-gray-600 dark:text-gray-300">
                    Thank you so much for checking out my art! You can support me through INPRNT, Throne, or Patreon, or just say hi on social media.
                    For commissions or collaborations, feel free to DM me on Instagram, X, Threads, or connect on Discord. I’m happy to chat! You can
                    also just send me a message directly below.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                id="contactForm"
                className="mx-auto mt-12 max-w-xl scroll-mt-24 space-y-6 rounded-xl bg-white p-12 shadow-md dark:bg-neutral-900"
            >
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Contact me</h2>

                {[
                    {
                        id: 'name',
                        label: 'Name',
                        required: true,
                        type: 'text',
                        placeholder: 'Your name, nickname, or @discordhandle',
                    },
                    {
                        id: 'email',
                        label: 'Email Address',
                        required: true,
                        type: 'email',
                        placeholder: 'example@domain.com',
                    },
                    {
                        id: 'subject',
                        label: 'Subject',
                        required: false,
                        placeholder: 'e.g. Collaboration, Feedback, General Inquiry',
                    },
                    {
                        id: 'message',
                        label: 'Message',
                        required: true,
                        type: 'textarea',
                        placeholder: 'Feel free to share your thoughts, questions, or inquiries here.',
                    },
                ].map(({ id, label, required, type, placeholder }) => {
                    const error = errors[id];
                    return (
                        <div key={id} className="space-y-1">
                            <label htmlFor={id} className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                {label} <span className="text-xs text-gray-400">{required ? '(required)' : '(optional)'}</span>
                            </label>

                            {type === 'textarea' ? (
                                <textarea
                                    id={id}
                                    name={id}
                                    required={required}
                                    rows={5}
                                    placeholder={placeholder}
                                    className={`w-full rounded border px-4 py-3 text-sm ${
                                        error
                                            ? 'border-red-600'
                                            : 'border-gray-300 bg-white text-gray-900 dark:border-gray-600 dark:bg-neutral-800 dark:text-gray-100'
                                    }`}
                                />
                            ) : (
                                <input
                                    id={id}
                                    name={id}
                                    type={type ?? 'text'}
                                    required={required}
                                    placeholder={placeholder}
                                    className={`w-full rounded border px-4 py-3 text-sm ${
                                        error
                                            ? 'border-red-600'
                                            : 'border-gray-300 bg-white text-gray-900 dark:border-gray-600 dark:bg-neutral-800 dark:text-gray-100'
                                    }`}
                                />
                            )}

                            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
                        </div>
                    );
                })}
                <button
                    type="submit"
                    className="w-full rounded bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300"
                >
                    Send
                </button>
            </form>
            <div className="mx-auto mt-5 max-w-xl rounded-xl bg-white px-6 py-4 shadow-md dark:bg-neutral-900">
                {status === 'success' && (
                    <p className="text-center text-sm text-green-600 dark:text-green-400">Thank you! Your message has been sent.</p>
                )}
                {status === 'error' && (
                    <p className="text-center text-sm text-red-600 dark:text-red-400">Oops! Something went wrong. Please try again.</p>
                )}
            </div>
        </div>
    );
}
Contact.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
