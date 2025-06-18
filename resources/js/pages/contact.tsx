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

            <h1 className="mb-4 flex justify-center tracking-tight text-gray-800 sm:text-3xl dark:text-gray-200">You can find me on</h1>

            <div className="mb-6 flex flex-wrap justify-center gap-4">
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

            <div className="mb-8 px-2 text-center text-sm">
                <p className="text-[14px] mx-auto max-w-2xl leading-relaxed text-gray-500 dark:text-gray-400">
                    Thank you so much for checking out my art! You can support me through INPRNT, Throne, or Patreon, or just say hi on social media.
                    For commissions or collaborations, feel free to DM me on Instagram, X, Threads, or connect on Discord — I’m happy to chat! You can
                    also just send me a message directly below.
                </p>
            </div>

            <form onSubmit={handleSubmit} id="contactForm" className="mx-auto max-w-md space-y-6 px-2">
                {[
                    { id: 'name', label: 'Name', required: true },
                    {
                        id: 'email',
                        label: 'Email Address',
                        required: true,
                        type: 'email',
                    },
                    { id: 'subject', label: 'Subject', required: true },
                ].map(({ id, label, required, type }) => (
                    <div key={id} className="space-y-1">
                        <label htmlFor={id} className="flex cursor-default items-baseline gap-1 text-sm font-medium text-gray-500 dark:text-gray-300">
                            <span>{label}</span>
                            <span className="text-xs text-gray-400">{required ? '(required)' : '(optional)'}</span>
                        </label>
                        <input
                            id={id}
                            name={id}
                            type={type ?? 'text'}
                            required={required}
                            className={`w-full cursor-text rounded border px-4 py-3 text-sm ${errors[id]
                                ? 'border-red-600'
                                : 'border-gray-300 bg-white text-gray-900 dark:border-gray-600 dark:bg-neutral-800 dark:text-gray-100'
                                }`}
                        />
                        {errors[id] && <p className="text-sm text-red-600 dark:text-red-400">{errors[id]}</p>}
                    </div>
                ))}

                <div className="space-y-1">
                    <label
                        htmlFor="message"
                        className="flex cursor-default items-baseline gap-1 text-sm font-medium text-gray-500 dark:text-gray-300"
                    >
                        <span>Message</span>
                        <span className="text-xs text-gray-400">(required)</span>
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Type something..."
                        className={`w-full cursor-text rounded border px-4 py-3 text-sm ${errors.message
                            ? 'border-red-600'
                            : 'border-gray-300 bg-white text-gray-900 dark:border-gray-600 dark:bg-neutral-800 dark:text-gray-100'
                            }`}
                    />
                    {errors.message && <p className="text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full rounded bg-black py-3 text-white transition duration-200 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300"
                >
                    Send
                </button>

                {status === 'success' && <p className="text-center text-green-600 dark:text-green-400">Thank you! Your message has been sent.</p>}
                {status === 'error' && <p className="text-center text-red-600 dark:text-red-400">Oops! Something went wrong. Please try again.</p>}
            </form>
        </div>
    );
}
Contact.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
