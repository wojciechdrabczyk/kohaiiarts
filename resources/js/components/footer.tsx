import InprntIcon from '@/assets/icons/InprntIcon';
import NewgroundsIcon from '@/assets/icons/NewgroundsIcon';
import ThroneIcon from '@/assets/icons/ThroneIcon';
import DefaultLayout from '@/layouts/default-layout';
import { BsInstagram } from 'react-icons/bs';
import { FaDiscord } from 'react-icons/fa';
import { FaPatreon, FaThreads, FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
    const iconProps = { size: 14 };

    const socialLinks2 = [
        { name: 'X', url: 'https://x.com/KohaiiArts', Icon: FaXTwitter },
        { name: 'Threads', url: 'https://www.threads.com/@kohaii_arts', Icon: FaThreads },
        { name: 'Instagram', url: 'https://www.instagram.com/kohaii_arts/', Icon: BsInstagram },
        { name: 'Discord', url: 'invitation link to the discord server?', Icon: FaDiscord },
        { name: 'Newgrounds', url: 'https://kohaiiarts.newgrounds.com/art', Icon: NewgroundsIcon },
        { name: 'Patreon', url: 'https://www.patreon.com/KohaiiArts', Icon: FaPatreon },
        { name: 'Throne', url: 'https://throne.com/kohaiiarts', Icon: ThroneIcon },
        { name: 'Inprnt', url: 'https://www.inprnt.com/gallery/kohaiiarts/', Icon: InprntIcon },
    ];

    return (
        <footer className="align-center bottom-0 flex w-full flex-col items-center border-t border-gray-200 bg-white px-2 py-4 dark:border-gray-700 dark:bg-gray-900" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <div className="mx-auto flex max-w-5/6 flex-col items-center justify-center gap-12 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-gray-500 sm:self-center dark:text-gray-400">
                    © {new Date().getFullYear()} Kohaii Arts — All rights reserved.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    {socialLinks2.map(({ name, url, Icon }) => (
                        <div key={url} className="group relative flex flex-col items-center">
                            <a
                                href={url}
                                target="_blank"
                                aria-label={name}
                                rel="noopener noreferrer"
                                className="flex items-center justify-center rounded-full bg-black p-2 text-white transition hover:bg-gray-800 sm:p-3 dark:bg-white dark:text-black dark:hover:bg-gray-300"
                            >
                                <Icon {...iconProps} />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
}

Footer.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
