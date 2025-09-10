import InprntIcon from '@/assets/icons/InprntIcon';
import NewgroundsIcon from '@/assets/icons/NewgroundsIcon';
import ThroneIcon from '@/assets/icons/ThroneIcon';
import { motion } from 'framer-motion';
import { BsInstagram } from 'react-icons/bs';
import { FaDiscord } from 'react-icons/fa';
import { FaPatreon, FaThreads, FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
    const iconProps = { size: 24 };

    const socialLinks2 = [
        { name: 'X', url: 'https://x.com/KohaiiArts', Icon: FaXTwitter, title: 'X' },
        { name: 'Threads', url: 'https://www.threads.net/@kohaii_arts', Icon: FaThreads, title: 'Threads' }, // threads.net is typical
        { name: 'Instagram', url: 'https://www.instagram.com/kohaii_arts/', Icon: BsInstagram, title: 'Instagram' },
        { name: 'Discord', url: 'https://discord.gg/hqGs4fGQXm', Icon: FaDiscord, title: 'Discord' },
        { name: 'Newgrounds', url: 'https://kohaiiarts.newgrounds.com/art', Icon: NewgroundsIcon, title: 'Newgrounds' },
        { name: 'Patreon', url: 'https://www.patreon.com/KohaiiArts', Icon: FaPatreon, title: 'Patreon' },
        { name: 'Throne', url: 'https://throne.com/kohaiiarts', Icon: ThroneIcon, title: 'Throne' },
        { name: 'Inprnt', url: 'https://www.inprnt.com/gallery/kohaiiarts/', Icon: InprntIcon, title: 'Inprnt' },
    ];

    return (
        <footer
            className="align-center bottom-0 flex w-full flex-col items-center px-2 py-4"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
            <div className="mx-auto flex max-w-5/6 flex-col items-center justify-center sm:flex-row sm:items-center sm:justify-between">
                <ul className="flex flex-wrap justify-center gap-10">
                    {socialLinks2.map(({ name, url, Icon, title }) => (
                        <li key={url}>
                            <motion.a
                                href={url}
                                title={title}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={name}
                                className="inline-flex h-10 w-10 items-center justify-center rounded text-[#822a59] dark:text-[#822a59] transform-gpu focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#822a59] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black"
                                whileHover={{ scale: 1.12, y: -1 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                            >
                                <Icon {...iconProps} />
                            </motion.a>
                        </li>
                    ))}
                </ul>
            </div>

            <p className="pt-4 text-sm text-gray-500 sm:self-center dark:text-gray-400">
                © {new Date().getFullYear()} Kohaii Arts - All rights reserved.
            </p>
        </footer>
    );
}
