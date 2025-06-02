import DefaultLayout from '@/layouts/default-layout';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { useSwipeable } from 'react-swipeable';
import { Head } from '@inertiajs/react';

const images = [
    'https://kohaiiarts.carrd.co/assets/images/gallery01/a9f42484_original.jpg?v=a15c23c2',
    'https://kohaiiarts.carrd.co/assets/images/gallery01/ea1e073d_original.jpg?v=a15c23c2',
    'https://kohaiiarts.carrd.co/assets/images/gallery01/c43fd895_original.jpg?v=a15c23c2',
    'https://kohaiiarts.carrd.co/assets/images/gallery01/191e8b82_original.jpg?v=a15c23c2',
    'https://kohaiiarts.carrd.co/assets/images/gallery01/802992c9_original.jpg?v=a15c23c2',
    'https://kohaiiarts.carrd.co/assets/images/gallery01/72cf2573_original.jpg?v=a15c23c2',
    'https://kohaiiarts.carrd.co/assets/images/gallery01/987a19f9_original.jpg?v=a15c23c2',
    'https://kohaiiarts.carrd.co/assets/images/gallery01/c31b2e6b_original.jpg?v=a15c23c2',
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

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {images.map((src, index) => (
                    <div key={index} className="group h-96 w-full cursor-pointer overflow-hidden rounded-md" onClick={() => setCurrentIndex(index)}>
                        <img
                            src={src}
                            alt={`Artwork ${index + 1}`}
                            className="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-105"
                        />
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
                        <div className="fixed inset-0 bg-black/70" />
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
                                className="group relative w-full max-w-4xl transform overflow-hidden  transition-all sm:p-6"
                            >
                                {currentIndex !== null && (
                                    <>
                                        <div className="relative flex w-full items-center justify-center">
                                            <button
                                                onClick={goPrev}
                                                className="absolute top-1/2 left-4 hidden -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black sm:group-hover:block"
                                                aria-label="Previous image"
                                            >
                                                <FaChevronLeft size={20} />
                                            </button>

                                            <img
                                                src={images[currentIndex]}
                                                alt={`Artwork ${currentIndex + 1}`}
                                                className="max-h-[80vh] max-w-full rounded object-contain shadow-lg"
                                            />

                                            <button
                                                onClick={goNext}
                                                className="absolute top-1/2 right-4 hidden -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black sm:group-hover:block"
                                                aria-label="Next image"
                                            >
                                                <FaChevronRight size={20} />
                                            </button>
                                        </div>
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
