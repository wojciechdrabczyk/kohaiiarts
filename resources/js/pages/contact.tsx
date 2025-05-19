import { BsInstagram } from 'react-icons/bs';
import { FaPatreon, FaXTwitter } from 'react-icons/fa6';
import NewgroundsIcon from '@/assets/icons/NewgroundsIcon';
import ThroneIcon from '@/assets/icons/ThroneIcon';
import InprntIcon from '@/assets/icons/InprntIcon';
export default function Contact() {
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
            name: 'Patreon',
            url: '',
            icon: <FaPatreon size={32} />,
        },
        {
            name: 'Newgrounds',
            url: 'https://kohaiiarts.newgrounds.com/art',
            icon: <NewgroundsIcon className="h-8 w-8" />,
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
            <h1 className="flex justify-center p-10 text-3xl font-bold font-light">You can find me on</h1>
            <div className="flex justify-center space-x-4">
                {socialLinks.map(({ name, url, icon }) => (
                    <div key={name} className="group relative">
                        <a
                            href={url}
                            target="_blank"
                            aria-label={name}
                            rel="noopener noreferrer"
                            className="flex justify-center items-center rounded-full bg-black px-6 py-6 text-white transition hover:bg-gray-800"
                        >
                            {icon}
                        </a>
                        <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 -translate-y-full rounded bg-gray-700 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition duration-200 group-hover:opacity-100">
                            {name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
