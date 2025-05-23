import { FaPatreon, FaThreads, FaXTwitter } from 'react-icons/fa6';
import { BsInstagram } from 'react-icons/bs';
import { FaDiscord } from 'react-icons/fa';
import NewgroundsIcon from '@/assets/icons/NewgroundsIcon';
import ThroneIcon from '@/assets/icons/ThroneIcon';
import InprntIcon from '@/assets/icons/InprntIcon';

export default function Footer() {
    const socialLinks = [
        { name: 'X', url: 'https://x.com/KohaiiArts', icon: <FaXTwitter size={18} /> },
        { name: 'Threads', url: 'https://www.threads.com/@kohaii_arts', icon: <FaThreads size={18} /> },
        { name: 'Instagram', url: 'https://www.instagram.com/kohaii_arts/', icon: <BsInstagram size={18} className="text-pink-500" /> },
        { name: 'Discord', url: 'invitation link to the discord server?', icon: <FaDiscord size={18} className="text-indigo-500" /> },
        { name: 'Newgrounds', url: 'https://kohaiiarts.newgrounds.com/art', icon: <NewgroundsIcon className="h-5 w-5 text-orange-500" /> },
        { name: 'Patreon', url: 'https://www.patreon.com/KohaiiArts', icon: <FaPatreon size={18} className="text-[#f96854]" /> },
        { name: 'Throne', url: 'https://throne.com/kohaiiarts', icon: <ThroneIcon className="h-5 w-5"/> },
        { name: 'Inprnt', url: 'https://www.inprnt.com/gallery/kohaiiarts/', icon: <InprntIcon className="h-5 w-5" /> },
    ];
    return (
        <footer className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-6 text-center px-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                © {new Date().getFullYear()} Kohaii Arts — All rights reserved.
            </p>
            <div className="flex justify-center space-x-4">
                {socialLinks.map(({ name, url, icon }) => (
                    <div key={url} className="group relative flex flex-col items-center space-y-1">
                        <a
                            href={url}
                            target="_blank"
                            aria-label={name}
                            rel="noopener noreferrer"
                            className="flex items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black p-5 transition hover:bg-gray-800 dark:hover:bg-gray-300"
                        >
                            {icon}
                        </a>
                        <span className="text-xs text-gray-600 dark:text-gray-300 sm:absolute sm:-top-3 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-full sm:rounded sm:bg-gray-700 dark:sm:bg-gray-200 sm:px-2 sm:py-1 sm:text-white dark:sm:text-black sm:opacity-0 sm:transition sm:duration-200 group-hover:sm:opacity-100">
                            {name}
                        </span>
                    </div>
                ))}
            </div>
        </footer>
    );
}
