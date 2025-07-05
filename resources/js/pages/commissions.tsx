import DefaultLayout from '@/layouts/default-layout';
import { PageProps } from '@inertiajs/inertia';
import { Head, router, usePage } from '@inertiajs/react';
import React, { FormEvent, useRef, useState } from 'react';
import { FiUpload } from 'react-icons/fi';

type Status = 'success' | 'error' | null;

export default function Commissions() {
    const [status, setStatus] = useState<Status>(null);
    const [filePreviews, setFilePreviews] = useState<File[]>([]);
    const [showAllFaqs, setShowAllFaqs] = useState<boolean>(false);
    const faqRef = useRef<HTMLDivElement | null>(null);
    const { errors } = usePage<PageProps>().props as {
        errors: Record<string, string>;
    };

    const toggleFaqs = () => {
        setShowAllFaqs((prev) => {
            const next = !prev;
            setTimeout(() => {
                if (!prev && faqRef.current) {
                    faqRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else if (prev && faqRef.current) {
                    faqRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }
            }, 20);
            return next;
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        router.post('/commissions', formData, {
            onSuccess: () => {
                setStatus('success');
                setFilePreviews([]);
                e.currentTarget.reset();
                setTimeout(() => {
                    document.getElementById('commissionForm')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            },
            onError: () => {
                setStatus('error');
            },
        });
    };

    return (
        <>
            <Head>
                <title>Commissions</title>
                <meta name="support" content="Thank you for supporting me!" />
            </Head>

            <section style={{ fontFamily: 'Montserrat, sans-serif' }} className="relative min-h-screen font-sans">
                <div className="mx-auto max-w-4xl px-4 py-10 sm:py-16 lg:px-6">
                    <h1 className="mb-4 text-center text-3xl leading-relaxed text-black dark:text-white">Commission Services</h1>
                    <p className="mx-auto mb-12 max-w-2xl text-center text-[14px] leading-[1.75] text-gray-600 dark:text-gray-300">
                        I create custom anime-style illustrations tailored to your ideas. Whether it’s an OC, fanart, or something entirely original,
                        I’d love to bring your vision to life.
                    </p>

                    <div className="mt-12 rounded-xl border-2 border-[#822a59] bg-white p-6 shadow-md dark:bg-neutral-900">
                        <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">Base Commission Prices</h2>
                        <ul className="mb-6 list-inside list-disc text-sm text-gray-600 dark:text-gray-400">
                            <li>Portrait – $88</li>
                            <li>Half Body – $108</li>
                            <li>Full Body – $128</li>
                        </ul>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Additional charges may apply for complex outfits, backgrounds, props, or pets. High-resolution formats for printing are
                            also available upon request.
                        </p>
                    </div>

                    <div className="mt-12 rounded-xl border-2 border-[#822a59] bg-white p-6 shadow-md dark:bg-neutral-900">
                        <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">Commission Process</h2>
                        <ol className="list-decimal space-y-2 pl-4 text-sm text-gray-600 dark:text-gray-400">
                            <li>Submit your request using the form below.</li>
                            <li>If accepted, I’ll contact you with a rough sketch and estimated delivery.</li>
                            <li>Once the sketch is approved, I’ll send a PayPal invoice (5% fee applies).</li>
                            <li>After payment, I’ll complete the illustration and deliver it by the agreed date.</li>
                        </ol>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        id="commissionForm"
                        className="mt-12 scroll-mt-24 space-y-6 rounded-xl border-2 border-[#822a59] bg-white p-6 shadow-md dark:bg-neutral-900"
                    >
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Request a Commission</h2>

                        {[
                            {
                                id: 'name',
                                label: 'Name',
                                required: true,
                                type: 'text',
                                placeholder: 'Your name, nickname, @discord',
                            },
                            {
                                id: 'email',
                                label: 'Email Address',
                                required: true,
                                type: 'email',
                                placeholder: 'example@domain.com',
                            },
                            {
                                id: 'paypal_email',
                                label: 'PayPal Email Address',
                                required: false,
                                type: 'email',
                                placeholder: 'Only needed if you want an invoice.',
                            },
                            {
                                id: 'subject',
                                label: 'Subject / Type of Commission',
                                required: true,
                                placeholder: 'e.g. Half-body OC',
                            },
                            {
                                id: 'message',
                                label: 'Commission Details',
                                required: true,
                                type: 'textarea',
                                placeholder:
                                    'Please describe the scene, pose, character design, and mood. Include links or attach image references below.',
                            },
                        ].map(({ id, label, required, type, placeholder }) => {
                            const error = errors[id];

                            return (
                                <div key={id} className="space-y-1">
                                    <label htmlFor={id} className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                        {label} <span className="text-xs text-gray-400">{required ? '(required)' : '(optional)'}</span>
                                    </label>

                                    {type === 'textarea' ? (
                                        <textarea
                                            id={id}
                                            name={id}
                                            required={required}
                                            rows={5}
                                            placeholder={placeholder}
                                            className={`w-full rounded border px-4 py-3 text-sm transition focus:border-[#822a59] focus:ring-1 focus:ring-[#822a59] focus:outline-none ${
                                                error
                                                    ? 'border-red-600'
                                                    : 'border-gray-300 bg-white text-gray-900 dark:border-gray-600 dark:bg-neutral-800 dark:text-gray-100'
                                            }`}
                                        />
                                    ) : (
                                        <input
                                            id={id}
                                            name={id}
                                            type={type ?? 'text'}
                                            required={required}
                                            placeholder={placeholder}
                                            className={`w-full rounded border px-4 py-3 text-sm transition focus:border-[#822a59] focus:ring-1 focus:ring-[#822a59] focus:outline-none ${
                                                error
                                                    ? 'border-red-600'
                                                    : 'border-gray-300 bg-white text-gray-900 dark:border-gray-600 dark:bg-neutral-800 dark:text-gray-100'
                                            }`}
                                        />
                                    )}

                                    {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
                                </div>
                            );
                        })}

                        <div className="">
                            <label htmlFor="files" className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300">
                                Attach Image References <span className="text-xs text-gray-400">(optional)</span>
                            </label>

                            <div className="flex items-center gap-3">
                                <input
                                    id="files"
                                    name="files[]"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => {
                                        const newFiles = Array.from(e.target.files || []);
                                        setFilePreviews((prev) => [...prev, ...newFiles]);
                                    }}
                                    className="hidden"
                                />
                                <label
                                    htmlFor="files"
                                    className="flex cursor-pointer items-center gap-2 rounded bg-[#822a59] px-4 py-2 text-sm font-medium text-white hover:bg-[#6e1f48] dark:bg-[#822a59] dark:text-white dark:hover:bg-[#6e1f48]"
                                >
                                    <FiUpload className="text-lg" />
                                    Choose Files
                                </label>
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                    {filePreviews.length} {filePreviews.length === 1 ? 'file' : 'files'} selected
                                </span>
                            </div>

                            {filePreviews.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {filePreviews.map((file, i) => {
                                        const url = URL.createObjectURL(file);
                                        return (
                                            <div key={i} className="relative">
                                                <img
                                                    src={url}
                                                    alt={`Preview ${i + 1}`}
                                                    className="h-20 w-20 rounded object-cover ring-1 ring-gray-300 dark:ring-gray-600"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setFilePreviews((prev) => prev.filter((_, index) => index !== i));
                                                        URL.revokeObjectURL(url);
                                                    }}
                                                    className="bg-opacity-75 absolute top-0 right-0 rounded-full bg-black px-2 py-1 text-xs text-white hover:bg-red-600 dark:bg-white dark:text-black dark:hover:bg-red-600"
                                                    style={{ fontSize: '14px' }}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded bg-[#822a59] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#6e1f48] dark:bg-[#822a59] dark:text-white dark:hover:bg-[#6e1f48]"
                        >
                            Send Commission Request
                        </button>

                        {status === 'success' && (
                            <p className="mt-4 text-center text-sm text-green-600 dark:text-green-400">Thank you! Your message has been sent.</p>
                        )}
                        {status === 'error' && (
                            <p className="mt-4 text-center text-sm text-red-600 dark:text-red-400">Oops! Something went wrong. Please try again.</p>
                        )}
                    </form>

                    <div ref={faqRef} className="mt-8 space-y-4">
                        <details className="min-h-[50px] rounded-xl border-2 border-[#822a59] bg-white p-4 text-sm text-gray-600 shadow-md dark:bg-neutral-900 dark:text-gray-400">
                            <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-200 [&::marker]:text-[#c59d36]">
                                What can I request?
                            </summary>
                            <p className="mt-2">
                                I accept most character-based commissions, including original characters, fanart, and adult-themed works. If you’re
                                unsure, feel free to ask!
                            </p>
                        </details>

                        <details className="min-h-[50px] rounded-xl border-2 border-[#822a59] bg-white p-4 text-sm text-gray-600 shadow-md dark:bg-neutral-900 dark:text-gray-400">
                            <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-200 [&::marker]:text-[#c59d36]">
                                What references should I include?
                            </summary>
                            <p className="mt-2">
                                Please include any visual references that help describe your idea — character sheets, poses, color palettes, outfits,
                                or moodboards. Even rough sketches or Pinterest boards are welcome.
                            </p>
                        </details>

                        <details className="min-h-[50px] rounded-xl border-2 border-[#822a59] bg-white p-4 text-sm text-gray-600 shadow-md dark:bg-neutral-900 dark:text-gray-400">
                            <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-200 [&::marker]:text-[#c59d36]">
                                Do you draw NSFW or suggestive content?
                            </summary>
                            <p className="mt-2">
                                Yes, I accept adult-themed work within reason. If you're unsure about the content, feel free to ask privately before
                                submitting a request.
                            </p>
                        </details>

                        <details className="min-h-[50px] rounded-xl border-2 border-[#822a59] bg-white p-4 text-sm text-gray-600 shadow-md dark:bg-neutral-900 dark:text-gray-400">
                            <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-200 [&::marker]:text-[#c59d36]">
                                What’s the expected turnaround time?
                            </summary>
                            <p className="mt-2">
                                Usually 1-3 weeks depending on complexity and queue. If I expect any delays, I’ll let you know right away.
                            </p>
                        </details>

                        {showAllFaqs && (
                            <>
                                <details className="min-h-[50px] rounded-xl border-2 border-[#822a59] bg-white p-4 text-sm text-gray-600 shadow-md dark:bg-neutral-900 dark:text-gray-400">
                                    <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-200 [&::marker]:text-[#c59d36]">
                                        Can I request a faster delivery?
                                    </summary>
                                    <p className="mt-2">
                                        If you need your commission completed within a shorter timeframe (typically 2–5 business days), priority
                                        scheduling may be available depending on current workload and the complexity of the piece.
                                    </p>
                                    <p className="mt-2">
                                        To request faster delivery, please mention it in your message or subject line. Priority commissions include an
                                        additional fee of 75% of the total cost. For example, a $70 order would total $123 USD plus tax when
                                        expedited.
                                    </p>
                                </details>
                                <details className="min-h-[50px] rounded-xl border-2 border-[#822a59] bg-white p-4 text-sm text-gray-600 shadow-md dark:bg-neutral-900 dark:text-gray-400">
                                    <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-200 [&::marker]:text-[#c59d36]">
                                        Can I request a private commission?
                                    </summary>
                                    <p className="mt-2">
                                        Yes, you may request for your commission to remain private, meaning it will not be posted online, included in
                                        my portfolio, or used for promotional purposes. If you would like your piece to remain private, please mention
                                        this in your request.
                                    </p>
                                    <p className="mt-2">
                                        By default, I reserve the right to showcase commissioned artwork for the purpose of promoting my brand. This
                                        includes sharing it online, using it on merchandise, or featuring it in publications, unless explicitly
                                        requested otherwise.
                                    </p>
                                    <p className="mt-2">
                                        If a commission is to remain fully private, a <strong>35% increase in the total price</strong> will apply to
                                        account for the loss of promotional value.
                                    </p>
                                </details>
                                <details className="min-h-[50px] rounded-xl border-2 border-[#822a59] bg-white p-4 text-sm text-gray-600 shadow-md dark:bg-neutral-900 dark:text-gray-400">
                                    <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-200 [&::marker]:text-[#c59d36]">
                                        Can I use the artwork on Twitch, YouTube, or social media?
                                    </summary>
                                    <p className="mt-2">
                                        Yes! You're welcome to use the commission for personal use online. Please credit me when possible. For
                                        commercial use, a separate license is required.
                                    </p>
                                </details>
                                <details className="min-h-[50px] rounded-xl border-2 border-[#822a59] bg-white p-4 text-sm text-gray-600 shadow-md dark:bg-neutral-900 dark:text-gray-400">
                                    <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-200 [&::marker]:text-[#c59d36]">
                                        How is payment handled?
                                    </summary>
                                    <p className="mt-2">
                                        Payments are processed through PayPal. I’ll send you an invoice once the sketch is approved. Full payment is
                                        required before finalizing the artwork.
                                    </p>
                                </details>
                                <details className="min-h-[50px] rounded-xl border-2 border-[#822a59] bg-white p-4 text-sm text-gray-600 shadow-md dark:bg-neutral-900 dark:text-gray-400">
                                    <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-200 [&::marker]:text-[#c59d36]">
                                        Can I use the artwork commercially?
                                    </summary>
                                    <p className="mt-2">
                                        Commissions are intended for personal use only. If you plan to use the artwork in a way that earns money, such
                                        as printing and selling merchandise, including it in a published book, or using it in promotional materials,
                                        you will need to purchase a commercial license.
                                    </p>
                                    <p className="mt-2">
                                        Commercial licenses typically require a 300% fee increase based on the total price of the artwork. This helps
                                        account for the extended value and reach of the work.
                                    </p>
                                    <p className="mt-2">
                                        If you are not sure whether your intended use is considered commercial, just let me know in your request and I
                                        will be happy to clarify.
                                    </p>
                                </details>
                                <details className="min-h-[50px] rounded-xl border-2 border-[#822a59] bg-white p-4 text-sm text-gray-600 shadow-md dark:bg-neutral-900 dark:text-gray-400">
                                    <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-200 [&::marker]:text-[#c59d36]">
                                        What types of licenses do you offer?
                                    </summary>
                                    <ul className="mt-2 list-inside list-disc space-y-1">
                                        <li>
                                            <strong>Personal Use:</strong> Use the artwork on your social media, as an avatar, desktop background, or
                                            for personal printing. No additional charge.
                                        </li>
                                        <li>
                                            <strong>Small Commercial:</strong> Use in monetized YouTube videos, Twitch streams, or small merchandise
                                            runs. +100% fee.
                                        </li>
                                        <li>
                                            <strong>Full Commercial:</strong> Includes resale rights, publication in books, large-scale product lines,
                                            or exclusive usage. +300% fee.
                                        </li>
                                    </ul>
                                    <p className="mt-2">
                                        All commercial licenses are non-exclusive unless otherwise discussed. Please mention your intended use in your
                                        request.
                                    </p>
                                </details>
                                <details className="min-h-[50px] rounded-xl border-2 border-[#822a59] bg-white p-4 text-sm text-gray-600 shadow-md dark:bg-neutral-900 dark:text-gray-400">
                                    <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-200 [&::marker]:text-[#c59d36]">
                                        Can I get my artwork as a print or on merch?
                                    </summary>
                                    <p className="mt-2">
                                        I don’t offer physical prints directly through commissions, but you can purchase selected artworks as prints
                                        or merchandise through my INPRNT and TeePublic shops.
                                    </p>
                                </details>
                                <details className="min-h-[50px] rounded-xl border-2 border-[#822a59] bg-white p-4 text-sm text-gray-600 shadow-md dark:bg-neutral-900 dark:text-gray-400">
                                    <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-200 [&::marker]:text-[#c59d36]">
                                        Do you offer refunds?
                                    </summary>
                                    <p className="mt-2">
                                        Refunds are only available if I haven’t started working on your piece yet. After the sketch is sent, refunds
                                        are no longer possible.
                                    </p>
                                </details>
                            </>
                        )}

                        <div className="mt-4 flex justify-end">
                            <button
                                type="button"
                                onClick={toggleFaqs}
                                className="rounded bg-[#822a59] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#6e1f48] dark:bg-[#822a59] dark:text-white dark:hover:bg-[#6e1f48]"
                            >
                                {showAllFaqs ? 'Show less' : 'Show more'}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

Commissions.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
