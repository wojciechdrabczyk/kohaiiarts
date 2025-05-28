import { FaPatreon, FaThreads, FaXTwitter } from 'react-icons/fa6';
import { BsInstagram } from 'react-icons/bs';
import { FaDiscord } from 'react-icons/fa';
import NewgroundsIcon from '@/assets/icons/NewgroundsIcon';
import ThroneIcon from '@/assets/icons/ThroneIcon';
import InprntIcon from '@/assets/icons/InprntIcon';
import DefaultLayout from '@/layouts/default-layout';


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
        <footer className="flex flex-col items-center align-center bottom-0 border-t border-gray-200 dark:border-gray-700 py-4 px-2 w-full bg-white dark:bg-gray-900">
            <div className="flex flex-col sm:flex-row items-center sm:items-center sm:justify-between justify-center max-w-5/6 mx-auto gap-12">
                <p className="text-sm text-gray-500 dark:text-gray-400 sm:self-center">
                    © {new Date().getFullYear()} Kohaii Arts — All rights reserved.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                    {socialLinks2.map(({ name, url, Icon }) => (
                        <div key={url} className="group relative flex flex-col items-center">
                            <a
                                href={url}
                                target="_blank"
                                aria-label={name}
                                rel="noopener noreferrer"
                                className="flex items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black p-2 sm:p-3 transition hover:bg-gray-800 dark:hover:bg-gray-300"
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
