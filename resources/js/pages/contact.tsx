import InprntIcon from '@/assets/icons/InprntIcon';
import NewgroundsIcon from '@/assets/icons/NewgroundsIcon';
import ThroneIcon from '@/assets/icons/ThroneIcon';
import { ChangeEvent, FormEvent, useState } from 'react';
import { BsInstagram } from 'react-icons/bs';
import { FaDiscord } from 'react-icons/fa';
import { FaPatreon, FaXTwitter } from 'react-icons/fa6';

type FormData = {
    name: string;
    email: string;
    message: string;
};
type Status = 'success' | 'error' | null;

export default function Contact() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState<Status>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.name || !formData.message) {
            setStatus('error');
            return;
        }
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // simulate send
            setFormData({ name: '', email: '', message: '' });
            setStatus('success');
        } catch (err) {
            setStatus('error');
        }
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
                    Thanks so much for checking out my art! You can support me through INPRNT, Throne, or Patreon, or just say hi on social media. For
                    commissions or collaborations, feel free to DM me on Instagram, X, or connect on Discord — I’m happy to chat! You can also just
                    send me a message directly below.
                </p>
            </div>
            <form onSubmit={handleChange} className="mx-auto mt-8 max-w-xl space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email (optional)"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded border border-gray-300 px-4 py-2"
                />
                <textarea
                    name="message"
                    placeholder="Your message*"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full rounded border border-gray-300 px-4 py-2"
                />
                <button type="submit" className="w-full rounded bg-black py-2 text-white transition hover:bg-gray-800">
                    Send Message
                </button>

                {status === 'success' && <p className="text-green-600">Message sent!</p>}
                {status === 'error' && <p className="text-red-600">Please fill out the required fields.</p>}
            </form>
        </div>
    );
}
