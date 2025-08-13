import { useState } from 'react';

type Props = {
    src: string;
    alt: string;
    onClick: () => void;
};

export default function ThumbnailImage({ src, alt, onClick }: Props) {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="group relative cursor-pointer overflow-hidden" onClick={onClick}>
            <div
                className={`h-full w-full transition-all duration-[1000ms] ease-in-out ${
                    loaded ? 'blur-0 opacity-100' : 'blur-lg opacity-60'
                }`}
            >
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    onLoad={() => setLoaded(true)}
                    className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
            </div>

            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p
                    className="px-2 text-center text-2xl text-white drop-shadow-md"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                >
                    {alt}
                </p>
            </div>
        </div>
    );
}
