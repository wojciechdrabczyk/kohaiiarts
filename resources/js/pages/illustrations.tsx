import DefaultLayout from '@/layouts/default-layout';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Head } from '@inertiajs/react';
import React, { Fragment, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaXmark } from 'react-icons/fa6';
import { useSwipeable } from 'react-swipeable';
import { FaTimes } from 'react-icons/fa';

const images = [
    '/img-static/Esil.webp',
    '/img-static/PokemonArtChristmas.webp',
    '/img-static/Rogue.webp',
    '/img-static/Stormie.webp',
    '/img-static/Varesa.webp',
    '/img-static/Halloween2023.webp',
    '/img-static/ValentinesCapella.webp',
    '/img-static/Mitsuri.webp',
    '/img-static/BreakArt2.webp',
    '/img-static/CoffeeRelax.webp',
    '/img-static/Fenrys.webp',
    '/img-static/BrazilianMiku.webp',
    '/img-static/BreakArt.webp',
    '/img-static/StTrinaCensored.webp',
    '/img-static/Hornpurple.webp',
    '/img-static/JuriKisisingWSign.webp',
    '/img-static/Ultima.webp',
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
    const goPrev = () => {
        if (currentIndex !== null) {
            const prevIndex = currentIndex - 1;
            setCurrentIndex(prevIndex >= 0 ? prevIndex : images.length - 1);
        }
    };

    const goNext = () => {
        if (currentIndex !== null) {
            const nextIndex = currentIndex + 1;
            setCurrentIndex(nextIndex < images.length ? nextIndex : 0);
        }
    };

    const swipeHandlers = useSwipeable({
        onSwipedDown: () => setCurrentIndex(null),
        onSwipedLeft: () => goPrev(),
        onSwipedRight: () => goNext(),
        preventScrollOnSwipe: true,
        trackTouch: true,
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
                            .map((src, index) => {
                                const globalIndex = colIndex + index * 4;
                                return (
                                    <div
                                        key={globalIndex}
                                        className="group cursor-pointer overflow-hidden"
                                        onClick={() => setCurrentIndex(globalIndex)}
                                    >
                                        <img
                                            src={src}
                                            alt={`Artwork ${globalIndex + 1}`}
                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
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
                        <div className="fixed inset-0 bg-white/50 backdrop-blur-sm" />
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
                            <DialogPanel
                                {...swipeHandlers}
                                className="group relative flex h-full w-full items-center justify-center p-4 sm:p-6"
                            >
                                {currentIndex !== null && (
                                    <>
                                        <div
                                            className="absolute left-0 top-0 z-10 h-full w-1/2 cursor-pointer"
                                            onClick={(e) => {
                                                if ((e.target as HTMLElement).closest('[data-no-click-zone]')) return;
                                                goPrev();
                                            }}
                                        />
                                        <div
                                            className="absolute right-0 top-0 z-10 h-full w-1/2 cursor-pointer"
                                            onClick={(e) => {
                                                if ((e.target as HTMLElement).closest('[data-no-click-zone]')) return;
                                                goNext();
                                            }}
                                        />

                                        <div className="max-h-[90vh] max-w-[95vw] overflow-auto z-20">
                                            <img
                                                src={images[currentIndex]}
                                                alt={`Artwork ${currentIndex + 1}`}
                                                className="mx-auto h-auto w-auto max-h-[90vh] object-contain shadow-lg"
                                            />
                                        </div>

                                        <button
                                            data-no-click-zone
                                            onClick={goPrev}
                                            className="absolute top-1/2 left-8 z-30 -translate-y-1/2 h-11 w-11 rounded-full bg-black/50 text-white hover:bg-black hidden md:flex items-center justify-center"
                                            aria-label="Previous image"
                                        >
                                            <FaChevronLeft size={20} />
                                        </button>


                                        <button
                                            data-no-click-zone
                                            onClick={goNext}
                                            className="absolute top-1/2 right-8 z-30 -translate-y-1/2 h-11 w-11 rounded-full bg-black/50 text-white hover:bg-black hidden md:flex items-center justify-center"
                                            aria-label="Next image"
                                        >
                                            <FaChevronRight size={20} />
                                        </button>


                                        <button
                                            data-no-click-zone
                                            onClick={() => setCurrentIndex(null)}
                                            className="absolute top-4 right-8 z-40 h-11 w-11 rounded-full bg-black/60 text-white hover:bg-black hidden md:flex items-center justify-center"
                                            aria-label="Close image"
                                        >
                                            <FaXmark size={20} />
                                        </button>

                                    </>
                                )}
                            </DialogPanel>




                        </TransitionChild>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
}

Illustrations.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
