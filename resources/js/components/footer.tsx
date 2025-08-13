import InprntIcon from '@/assets/icons/InprntIcon';
import NewgroundsIcon from '@/assets/icons/NewgroundsIcon';
import ThroneIcon from '@/assets/icons/ThroneIcon';
import DefaultLayout from '@/layouts/default-layout';
import { BsInstagram } from 'react-icons/bs';
import { FaDiscord } from 'react-icons/fa';
import { FaPatreon, FaThreads, FaXTwitter } from 'react-icons/fa6';

export default function Footer() {
    const iconProps = { size: 24 };

    const socialLinks2 = [
        { name: 'X', url: 'https://x.com/KohaiiArts', Icon: FaXTwitter, title: 'X' },
        { name: 'Threads', url: 'https://www.threads.com/@kohaii_arts', Icon: FaThreads, title: 'Threads' },
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
            <div className="mx-auto flex max-w-5/6 flex-col items-center justify-center gap-12 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap justify-center gap-4">
                    {socialLinks2.map(({ name, url, Icon, title }) => (
                        <div key={url} className="group relative flex flex-col items-center ">
                            <a
                                href={url}
                                title={title}
                                target="_blank"
                                aria-label={name}
                                rel="noopener noreferrer"
                                className="flex items-center justify-center p-2 text-[#822a59] sm:p-3 dark:text-[#822a59]  transition-transform group-hover:scale-120"
                            >
                                <Icon {...iconProps} style={{color: '#822a59'}} />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
            <p className="text-sm pt-4 text-gray-500 sm:self-center dark:text-gray-400">
                © {new Date().getFullYear()} Kohaii Arts - All rights reserved.
            </p>
        </footer>
    );
}

Footer.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
