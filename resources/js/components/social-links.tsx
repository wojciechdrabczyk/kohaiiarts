import NewgroundsIcon from '@/assets/icons/NewgroundsIcon';
import { BsInstagram } from 'react-icons/bs';
import { FaDiscord } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiThreads } from 'react-icons/si';

type Props = {
    size?: number;
    className?: string;
    brandColor?: string;
};

export default function SocialLinks({ size = 24, className = '', brandColor = '#822a59' }: Props) {
    const linkBase = 'flex items-center justify-center p-2 sm:p-3 transition-transform';
    const hoverAnim = 'hover:scale-110';

    return (
        <div className={`hidden md:flex flex-col items-start gap-5 ${className}`}>
            <div className="group">
                <a
                    href="https://x.com/KohaiiArts"
                    aria-label="X/Twitter"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkBase} ${hoverAnim}`}
                    style={{ color: brandColor }}
                >
                    <FaXTwitter size={size} />
                </a>
            </div>

            <div className="group">
                <a
                    href="https://www.instagram.com/kohaii_arts/"
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkBase} ${hoverAnim}`}
                    style={{ color: brandColor }}
                >
                    <BsInstagram size={size} />
                </a>
            </div>

            <div className="group">
                <a
                    href="https://kohaiiarts.newgrounds.com/art"
                    aria-label="Newgrounds"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkBase} ${hoverAnim}`}
                    style={{ color: brandColor }}
                >
                    <span style={{ color: brandColor }}>
                        <NewgroundsIcon size={size} />
                    </span>
                </a>
            </div>

            <div className="group">
                <a
                    href="https://www.threads.net/@kohaii_arts"
                    aria-label="Threads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkBase} ${hoverAnim}`}
                    style={{ color: brandColor }}
                >
                    <SiThreads size={size} />
                </a>
            </div>

            <div className="group">
                <a href="https://discord.gg/hqGs4fGQXm" aria-label="Discord" className={`${linkBase} ${hoverAnim}`} style={{ color: brandColor }}>
                    <FaDiscord size={size} />
                </a>
            </div>
        </div>
    );
}
