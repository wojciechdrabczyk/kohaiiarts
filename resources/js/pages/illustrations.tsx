import DefaultLayout from '@/layouts/default-layout';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Head } from '@inertiajs/react';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaXmark } from 'react-icons/fa6';
import { useSwipeable } from 'react-swipeable';
import ThumbnailImage from '@/components/thumbnail-image';

const images = [
    { src: '/img-static/Esil.webp', caption: 'ESIL (Solo Leveling)' },
    { src: '/img-static/PokemonArtChristmas.webp', caption: 'Pokémon Christmas' },
    { src: '/img-static/Rogue.webp', caption: 'ROGUE (Character Concept)' },
    { src: '/img-static/Stormie.webp', caption: 'STORMIE' },
    { src: '/img-static/Varesa.webp', caption: 'VARESA (Genshin Impact)' },
    { src: '/img-static/Halloween2023.webp', caption: 'Halloween 2023 Special' },
    { src: '/img-static/ValentinesCapella.webp', caption: 'CAPELLA (Re:Zero − Starting Life in Another World)' },
    { src: '/img-static/Mitsuri.webp', caption: 'MITSURI KANROJI (Demon Slayer)' },
    { src: '/img-static/BreakArt2.webp', caption: '' },
    { src: '/img-static/CoffeeRelax.webp', caption: 'Coffee & Relaxation Vibes' },
    { src: '/img-static/Fenrys.webp', caption: "FENRYS (Chillin' in Another World with Level 2 Super Cheat Powers)" },
    { src: '/img-static/BrazilianMiku.webp', caption: 'Brazilian Miku (Cultural Fan Art)' },
    { src: '/img-static/BreakArt.webp', caption: '' },
    { src: '/img-static/StTrinaCensored.webp', caption: 'SAINT TRINA (Elden Ring)' },
    { src: '/img-static/Hornpurple.webp', caption: '' },
    { src: '/img-static/JuriKisisingWSign.webp', caption: 'JURI HAN (Street Fighter)' },
    { src: '/img-static/Ultima.webp', caption: 'ULTIMA (Final Fantasy)' },
];

export default function Illustrations() {
    const [currentIndex, setCurrentIndex] = useState<number | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (currentIndex === null) return;
            if (e.key === 'Escape') {
                setCurrentIndex(null);
            } else if (e.key === 'ArrowRight') {
                const nextIndex = currentIndex + 1;
                setCurrentIndex(nextIndex < images.length ? nextIndex : 0);
            } else if (e.key === 'ArrowLeft') {
                if (currentIndex >= 0) {
                    const prevIndex = currentIndex - 1;
                    setCurrentIndex(prevIndex >= 0 ? prevIndex : images.length - 1);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex]);

    const goPrev = useCallback(() => {
        if (currentIndex !== null) {
            const prevIndex = currentIndex - 1;
            setCurrentIndex(prevIndex >= 0 ? prevIndex : images.length - 1);
        }
    }, [currentIndex]);

    const goNext = useCallback(() => {
        if (currentIndex !== null) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex < images.length ? nextIndex : 0);
        }
    }, [currentIndex]);
    const swipeHandlers = useSwipeable({
        onSwipedDown: () => setCurrentIndex(null),
        onSwipedLeft: () => goPrev(),
        onSwipedRight: () => goNext(),
        preventScrollOnSwipe: true,
        trackTouch: true,
        trackMouse: true,
        delta: 30, // higher = less sensitive
    });

    return (
        <div>
            <Head>
                <title>Illustrations</title>
                <meta name="description" content="Here are my latest drawings" />
            </Head>

            <div className="grid grid-cols-1 gap-5 px-4 pb-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {[0, 1, 2, 3].map((colIndex) => (
                    <div key={colIndex} className="grid gap-5">
                        {images
                            .filter((_, i) => i % 4 === colIndex)
                            .map((image, index) => {
                                const globalIndex = colIndex + index * 4;
                                return (
                                    <ThumbnailImage
                                        key={globalIndex}
                                        src={image.src}
                                        alt={image.caption}
                                        onClick={() => setCurrentIndex(globalIndex)}

                                    />
                                );
                            })}
                    </div>
                ))}
            </div>

            <Transition appear show={currentIndex !== null} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setCurrentIndex(null)}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-white/40 backdrop-blur-sm" />
                    </TransitionChild>

                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div
                                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                                onClick={(e) => {
                                    const target = e.target as HTMLElement;
                                    if (
                                        target.closest('[data-no-click-zone]') ||
                                        target.tagName === 'IMG'
                                    ) return;

                                    setCurrentIndex(null);
                                }}
                            >
                                <TransitionChild
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <DialogPanel
                                        {...swipeHandlers}
                                        className="group relative flex h-full w-full items-center justify-center p-4 sm:p-6"
                                        onClick={(e) => {
                                            const target = e.target as HTMLElement;
                                            if (
                                                target.closest('[data-no-click-zone]') ||
                                                target.tagName === 'IMG'
                                            ) return;

                                            setCurrentIndex(null);
                                        }}

                                    >
                                        {currentIndex !== null && (
                                            <>
                                                <figure
                                                    className="z-20 max-h-[90vh] max-w-[95vw] overflow-auto"
                                                    data-no-click-zone
                                                    role="group"
                                                    aria-labelledby="caption"
                                                >
                                                    <img
                                                        src={images[currentIndex].src}
                                                        alt={images[currentIndex].caption || 'Artwork image'}
                                                        className="mx-auto h-auto max-h-[90vh] w-auto object-contain shadow-lg"
                                                    />
                                                    {images[currentIndex].caption && (
                                                        <figcaption
                                                            id="caption"
                                                            className="mt-4 text-center text-3xl bg-black/5 rounded-xl px-3 py-3 text-white drop-shadow-md"
                                                            style={{ fontFamily: 'Inter, sans-serif' }}
                                                        >
                                                            {images[currentIndex].caption}
                                                        </figcaption>
                                                    )}
                                                </figure>

                                                <button
                                                    data-no-click-zone
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        goPrev();
                                                    }}
                                                    className="absolute top-1/2 left-8 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black md:flex"
                                                    aria-label="Previous image"
                                                >
                                                    <FaChevronLeft size={20} />
                                                </button>

                                                <button
                                                    data-no-click-zone
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        goNext();
                                                    }}
                                                    className="absolute top-1/2 right-8 z-30 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black md:flex"
                                                    aria-label="Next image"
                                                >
                                                    <FaChevronRight size={20} />
                                                </button>

                                                <button
                                                    data-no-click-zone
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setCurrentIndex(null);
                                                    }}
                                                    className="absolute top-4 right-8 z-40 hidden h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black md:flex"
                                                    aria-label="Close image viewer"
                                                >
                                                    <FaXmark size={20} />
                                                </button>
                                            </>
                                        )}
                                    </DialogPanel>
                                </TransitionChild>

                            </div>

                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}

Illustrations.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
