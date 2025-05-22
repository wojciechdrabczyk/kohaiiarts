import InprntIcon from '@/assets/icons/InprntIcon';
import NewgroundsIcon from '@/assets/icons/NewgroundsIcon';
import ThroneIcon from '@/assets/icons/ThroneIcon';
import { FormEvent, useState } from 'react';
import { BsInstagram } from 'react-icons/bs';
import { FaDiscord } from 'react-icons/fa';
import { FaPatreon, FaXTwitter } from 'react-icons/fa6';
import { router, usePage } from '@inertiajs/react';
import type { PageProps } from '@inertiajs/inertia';

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
                setStatus('error')
            },
        });
    };
    const socialLinks = [
        {
            name: 'X',
            url: 'https://x.com/KohaiiArts',
            icon: <FaXTwitter size={32} />,
        },
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/kohaii_arts/',
            icon: <BsInstagram size={32} />,
        },
        {
            name: 'Discord',
            url: 'invitation link to the discord server?',
            icon: <FaDiscord size={32} />,
        },
        {
            name: 'Newgrounds',
            url: 'https://kohaiiarts.newgrounds.com/art',
            icon: <NewgroundsIcon className="h-8 w-8" />,
        },
        {
            name: 'Patreon',
            url: 'https://www.patreon.com/KohaiiArts',
            icon: <FaPatreon size={32} />,
        },
        {
            name: 'Throne',
            url: 'https://throne.com/kohaiiarts',
            icon: <ThroneIcon className="h-8 w-8" />,
        },
        {
            name: 'Inprnt',
            url: 'https://www.inprnt.com/gallery/kohaiiarts/',
            icon: <InprntIcon className="h-8 w-8" />,
        },
    ];
    return (
        <div className="p-4">
            <h1 className="flex justify-center p-10 text-3xl font-light">You can find me on</h1>
            <div className="flex flex-wrap justify-center gap-4">
                {socialLinks.map(({ name, url, icon }) => (
                    <div key={url} className="group relative flex flex-col items-center space-y-1">
                        <a
                            href={url}
                            target="_blank"
                            aria-label={name}
                            rel="noopener noreferrer"
                            className="flex items-center justify-center rounded-full bg-black p-5 text-white transition hover:bg-gray-800"
                        >
                            {icon}
                        </a>
                        <span className="text-xs text-gray-600 sm:absolute sm:-top-3 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-full sm:rounded sm:bg-gray-700 sm:px-2 sm:py-1 sm:text-white sm:opacity-0 sm:transition sm:duration-200 group-hover:sm:opacity-100">
                            {name}
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex justify-center px-4 py-6 text-sm font-light text-gray-600 sm:px-6 md:px-10">
                <p className="max-w-2xl text-center">
                    Thank you so much for checking out my art! You can support me through INPRNT, Throne, or Patreon, or just say hi on social media. For
                    commissions or collaborations, feel free to DM me on Instagram, X, or connect on Discord — I’m happy to chat! You can also just
                    send me a message directly below.
                </p>
            </div>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 p-4">
                <input
                    name="name"
                    placeholder="Your name*"
                    required
                    className={`w-full px-4 py-2 rounded border ${errors.name ? 'border-red-600' : 'border-gray-300'}`}
                />
                {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

                <input
                    name="email"
                    type="email"
                    placeholder="Email*"
                    required
                    className={`w-full px-4 py-2 rounded border ${errors.email ? 'border-red-600' : 'border-gray-300'}`}
                />
                {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}

                <textarea
                    name="message"
                    placeholder="Your message*"
                    required
                    rows={5}
                    className={`w-full px-4 py-2 rounded border ${errors.message ? 'border-red-600' : 'border-gray-300'}`}
                />
                {errors.message && <p className="text-red-600 text-sm">{errors.message}</p>}

                <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
                    Send
                </button>

                {status === 'success' && (
                    <p className="text-green-600 text-center">Thank you! Your message has been sent.</p>
                )}
                {status === 'error' && (
                    <p className="text-red-600 text-center">Oops! Something went wrong. Please try again.</p>
                )}
            </form>
        </div>
    );
}
