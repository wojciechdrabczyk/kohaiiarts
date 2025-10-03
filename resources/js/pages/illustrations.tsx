// resources/js/Pages/illustrations.tsx
import ThumbnailImage from '@/components/thumbnail-image';
import DefaultLayout from '@/layouts/default-layout';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Head } from '@inertiajs/react';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaXmark } from 'react-icons/fa6';
import { useSwipeable } from 'react-swipeable';

type Img = { src: string; caption?: string | null };

export default function Illustrations({ images = [] as Img[] }: { images?: Img[] }) {
    const gallery = images;

    const [currentIndex, setCurrentIndex] = useState<number | null>(null);
    const [imgError, setImgError] = useState(false);

    // Open specific image only if the URL actually has ?image=N
    useEffect(() => {
        if (!gallery.length) return;
        const p = new URLSearchParams(window.location.search);
        if (p.has('image')) {
            const raw = p.get('image');
            const idx = raw !== null && /^\d+$/.test(raw) ? Number(raw) : NaN;
            if (!Number.isNaN(idx) && gallery[idx]) setCurrentIndex(idx);
        }
    }, [gallery]);

    const goPrev = useCallback(() => {
        if (currentIndex !== null && gallery.length) {
            setCurrentIndex((currentIndex - 1 + gallery.length) % gallery.length);
        }
    }, [currentIndex, gallery.length]);

    const goNext = useCallback(() => {
        if (currentIndex !== null && gallery.length) {
            setCurrentIndex((currentIndex + 1) % gallery.length);
        }
    }, [currentIndex, gallery.length]);

    useEffect(() => {
        if (currentIndex === null) return;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                setCurrentIndex(null);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                goNext();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                goPrev();
            }
        };

        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [currentIndex, goNext, goPrev]);

    const swipeHandlers = useSwipeable({
        onSwipedDown: () => setCurrentIndex(null),
        onSwipedLeft: () => goPrev(),
        onSwipedRight: () => goNext(),
        preventScrollOnSwipe: true,
        trackTouch: true,
        trackMouse: true,
        delta: 30,
    });

    // Preload neighbors for snappier nav
    useEffect(() => {
        if (currentIndex === null || !gallery.length) return;
        const next = new Image();
        next.src = gallery[(currentIndex + 1) % gallery.length].src;
        const prev = new Image();
        prev.src = gallery[(currentIndex - 1 + gallery.length) % gallery.length].src;
    }, [currentIndex, gallery]);

    // Keep URL in sync while viewer is open
    useEffect(() => {
        const u = new URL(window.location.href);
        if (currentIndex === null) {
            u.searchParams.delete('image');
        } else {
            u.searchParams.set('image', String(currentIndex));
        }
        window.history.replaceState(null, '', u.toString());
    }, [currentIndex]);

    // Reset error on image change
    useEffect(() => {
        setImgError(false);
    }, [currentIndex]);

    return (
        <div>
            <Head>
                <title>Illustrations</title>
                <meta name="description" content="Here are my latest drawings" />
            </Head>

            {!gallery.length ? (
                <div className="px-4 py-16 text-center opacity-70">No illustrations yet.</div>
            ) : (
                <div className="grid grid-cols-1 gap-5 px-4 pb-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {[0, 1, 2, 3].map((colIndex) => (
                        <div key={colIndex} className="grid gap-5">
                            {gallery
                                .filter((_, i) => i % 4 === colIndex)
                                .map((image, index) => {
                                    const globalIndex = colIndex + index * 4;
                                    return (
                                        <ThumbnailImage
                                            key={`${image.src}-${globalIndex}`}
                                            src={image.src}
                                            alt={image.caption ?? 'Artwork image'}
                                            caption={image.caption ?? undefined}
                                            onClick={() => setCurrentIndex(globalIndex)}
                                        />
                                    );
                                })}
                        </div>
                    ))}
                </div>
            )}

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
                                    if (target.closest('[data-no-click-zone]') || target.tagName === 'IMG') return;
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
                                            if (target.closest('[data-no-click-zone]') || target.tagName === 'IMG') return;
                                            setCurrentIndex(null);
                                        }}
                                    >
                                        {currentIndex !== null && gallery[currentIndex] && (
                                            <>
                                                <figure
                                                    className="z-20 max-h-[90vh] max-w-[95vw] overflow-auto"
                                                    data-no-click-zone
                                                    role="group"
                                                    aria-labelledby="caption"
                                                >
                                                    {!imgError ? (
                                                        <img
                                                            key={gallery[currentIndex].src}
                                                            src={gallery[currentIndex].src}
                                                            alt={gallery[currentIndex].caption ?? 'Artwork image'}
                                                            decoding="async"
                                                            fetchPriority="high"
                                                            className="mx-auto h-auto max-h-[90vh] w-auto object-contain opacity-60 shadow-lg blur-lg transition-all duration-[300ms] ease-in-out"
                                                            onLoad={(e) => {
                                                                const img = e.currentTarget;
                                                                img.classList.remove('blur-lg', 'opacity-60');
                                                                img.classList.add('blur-0', 'opacity-100');
                                                            }}
                                                            onError={() => setImgError(true)}
                                                        />
                                                    ) : (
                                                        <div className="mx-auto flex h-[60vh] w-[70vw] max-w-[900px] flex-col items-center justify-center">
                                                            <div className="h-[60vh] w-full rounded-xl bg-white/10 [mask-image:linear-gradient(90deg,transparent,black,transparent)]">
                                                                <div className="h-full w-1/3 animate-pulse rounded-xl bg-white/10" />
                                                            </div>
                                                            <p className="mt-3 text-center text-sm text-white/70">Couldn’t load this image.</p>
                                                        </div>
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
