import DefaultLayout from '@/layouts/default-layout';
import { PageProps } from '@inertiajs/inertia';
import { Head, router, usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';

type Status = 'success' | 'error' | null;
export default function Commissions() {
    const [status, setStatus] = useState<Status>(null);
    const [filePreviews, setFilePreviews] = useState<File[]>([]);

    const { errors } = usePage<PageProps>().props as {
        errors: Record<string, string>;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        router.post('/commissions', formData, {
            onSuccess: () => {
                setStatus('success');
                setFilePreviews([]);
                e.currentTarget.reset();
            },
            onError: () => {
                setStatus('error');
            },
        });
    };

    return (
        <div>
            <Head>
                <title>Commissions</title>
                <meta name="support" content="Thank you for supporting me!" />
            </Head>
            <section style={{ fontFamily: 'Montserrat, sans-serif' }}>
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
                    <h1 className="mb-4 flex justify-center text-center tracking-normal text-black sm:text-3xl dark:text-gray-200">
                        Commission Services
                    </h1>
                    <div className="mb-12 px-2 text-center text-[12px] text-gray-600 dark:text-gray-300">
                        <p className="mx-auto max-w-xl leading-relaxed">
                            I create custom anime-style illustrations tailored to your ideas. Whether it's a portrait of your OC, fanart, or something
                            completely original, I'd love to help bring your vision to life!
                        </p>
                    </div>

                    <div className="border-t border-gray-200 pt-8 text-center dark:border-gray-700">
                        <div className="mb-12">
                            <h2 className="mb-4 text-xl tracking-normal text-black dark:text-white">Base Commission Prices</h2>
                            <div className="mx-auto max-w-2xl text-center">
                                <ul className="mt-2 mb-4 list-inside list-disc text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                    <li>Portrait – $88</li>
                                    <li>Half Body – $108</li>
                                    <li>Full Body – $128</li>
                                </ul>
                                <p className="mx-auto mb-12 max-w-2xl space-y-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                    Complex accessories, weapons, backgrounds, and pets may incur additional charges depending on the request.
                                    Increased canvas size for printing will also add costs due to more detailed work. Turnaround time is typically 2–4
                                    weeks depending on the complexity and queue.
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="mb-4 text-xl tracking-normal text-black dark:text-white">How It Works</h2>
                            <div className="mx-auto mb-12 max-w-2xl space-y-4 text-left text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                                <p>
                                    <strong>1. Request Review:</strong> Once I receive your form, I’ll review it and confirm whether I can take on the
                                    commission.
                                </p>
                                <p>
                                    <strong>2. Sketch Phase:</strong> If accepted, we’ll discuss the concept and I’ll send a rough sketch along with
                                    an estimated deadline.
                                </p>
                                <p>
                                    <strong>3. Payment:</strong> After sketch approval, I’ll request full payment via PayPal to begin lineart and
                                    coloring. A 5% PayPal fee is added to the final total.
                                </p>
                                <p>
                                    <strong>4. Final Delivery:</strong> Once payment is received, I’ll complete the artwork and send it to you by the
                                    agreed deadline.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} id="commissionForm" className="mx-auto max-w-lg space-y-6 px-2">
                                {[
                                    { id: 'name', label: 'Name', required: true },
                                    { id: 'email', label: 'Email Address', required: true, type: 'email' },
                                    {
                                        id: 'paypal_email',
                                        label: 'PayPal Email Address',
                                        required: false,
                                        type: 'email',
                                        placeholder: 'Only required if you want to receive a PayPal invoice directly.',
                                    },
                                    { id: 'subject', label: 'Subject / Commission Type', required: true },
                                    {
                                        id: 'message',
                                        label: 'Commission Details',
                                        required: true,
                                        type: 'textarea',
                                        placeholder:
                                            'Please describe your commission request in detail. Include character info, pose ideas, or scene descriptions. If you have references, attach them below — the more details, the better!',
                                    },
                                    { id: 'files', label: 'Attach image / images', required: false, type: 'file' },
                                ].map(({ id, label, required, type, placeholder }) => {
                                    const error = errors[id];

                                    return (
                                        <div key={id} className="space-y-1">
                                            <label
                                                htmlFor={id}
                                                className="flex items-baseline gap-1 text-sm font-medium text-gray-500 dark:text-gray-300"
                                            >
                                                <span>{label}</span>
                                                <span className="text-xs text-gray-400">{required ? '(required)' : '(optional)'}</span>
                                            </label>

                                            {type === 'textarea' ? (
                                                <textarea
                                                    id={id}
                                                    name={id}
                                                    required={required}
                                                    rows={5}
                                                    placeholder={placeholder}
                                                    className={`w-full rounded border px-4 py-3 text-sm ${
                                                        error
                                                            ? 'border-red-600'
                                                            : 'border-gray-300 bg-white text-gray-900 dark:border-gray-600 dark:bg-neutral-800 dark:text-gray-100'
                                                    }`}
                                                />
                                            ) : type === 'file' ? (
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            id="files"
                                                            name="files[]"
                                                            type="file"
                                                            accept="image/*"
                                                            multiple
                                                            onChange={(e) => setFilePreviews(Array.from(e.target.files || []))}
                                                            className="hidden"
                                                        />
                                                        <label
                                                            htmlFor="files"
                                                            className="inline-block cursor-pointer rounded border-0 bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300"
                                                        >
                                                            Choose Files
                                                        </label>
                                                        <span className="text-sm text-gray-600 dark:text-gray-300">
                                                            {filePreviews.length} {filePreviews.length === 1 ? 'file' : 'files'} selected
                                                        </span>
                                                    </div>
                                                    {filePreviews.length > 0 && (
                                                        <div className="flex flex-wrap gap-2">
                                                            {filePreviews.map((file, i) => (
                                                                <img
                                                                    key={i}
                                                                    src={URL.createObjectURL(file)}
                                                                    alt={`Preview ${i + 1}`}
                                                                    className="h-16 w-16 rounded border border-gray-300 object-cover dark:border-gray-600"
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <input
                                                    id={id}
                                                    name={id}
                                                    type={type ?? 'text'}
                                                    required={required}
                                                    placeholder={placeholder}
                                                    className={`w-full rounded border px-4 py-3 text-sm ${
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

                                <button
                                    type="submit"
                                    className="w-full rounded border-0 bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300"
                                >
                                    Send
                                </button>

                                {status === 'success' && (
                                    <p className="text-center text-green-600 dark:text-green-400">Thank you! Your message has been sent.</p>
                                )}
                                {status === 'error' && (
                                    <p className="text-center text-red-600 dark:text-red-400">Oops! Something went wrong. Please try again.</p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

Commissions.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
