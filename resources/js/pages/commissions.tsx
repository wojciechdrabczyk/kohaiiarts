import DefaultLayout from '@/layouts/default-layout';
import { PageProps } from '@inertiajs/inertia';
import { Head, router, usePage } from '@inertiajs/react';
import React, { FormEvent, useState } from 'react';
import { FiUpload } from 'react-icons/fi';

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

            <section
                style={{ fontFamily: 'Montserrat, sans-serif' }}
                className=""
            >
                <div className="mx-auto max-w-4xl px-4 py-10 sm:py-16 lg:px-6">
                    <h1 className="mb-4 text-center text-3xl leading-relaxed text-black dark:text-white">
                        Commission Services
                    </h1>
                    <p className="mx-auto mb-12 max-w-2xl text-[14px] leading-[1.75]  text-gray-600 dark:text-gray-300 text-center">
                        I create custom anime-style illustrations tailored to your ideas. Whether it’s an OC, fanart, or something entirely original,
                        I’d love to bring your vision to life.
                    </p>

                    <div className="rounded-xl bg-white p-6 shadow-md dark:bg-neutral-900">
                        <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">Base Commission Prices</h2>
                        <ul className="mb-6 list-inside list-disc text-sm text-gray-600 dark:text-gray-400">
                            <li>Portrait – $88</li>
                            <li>Half Body – $108</li>
                            <li>Full Body – $128</li>
                        </ul>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Additional charges may apply for complex outfits, backgrounds, props, or pets. High-resolution formats for printing are also
                            available upon request. Turnaround time is 2–4 weeks depending on complexity and queue.
                        </p>
                    </div>

                    <div className="mt-12 rounded-xl bg-white p-6 shadow-md dark:bg-neutral-900">
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
                        className="mt-12 rounded-xl bg-white p-6 shadow-md dark:bg-neutral-900 space-y-6 scroll-mt-24"
                    >
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Request a Commission</h2>

                        {[
                            { id: 'name', label: 'Name', required: true, type: 'text', placeholder: "" },
                            { id: 'email', label: 'Email Address', required: true, type: 'email', placeholder: 'example@domain.com' },
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
                                placeholder: 'e.g. Half-body of your original character with a calm expression',
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
                                        {label}{' '}
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

                        <div className="space-y-1">
                            <label htmlFor="files" className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                Attach Image References <span className="text-xs text-gray-400">(optional)</span>
                            </label>

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
                                        className="flex items-center gap-2 cursor-pointer rounded bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300"
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
                                        {filePreviews.map((file, i) => (
                                            <img
                                                key={i}
                                                src={URL.createObjectURL(file)}
                                                alt={`Preview ${i + 1}`}
                                                className="h-20 w-20 rounded object-cover ring-1 ring-gray-300 dark:ring-gray-600"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300"
                        >
                            Send Commission Request
                        </button>

                        {status === 'success' && (
                            <p className="mt-4 text-center text-sm text-green-600 dark:text-green-400">
                                Thank you! Your message has been sent.
                            </p>
                        )}
                        {status === 'error' && (
                            <p className="mt-4 text-center text-sm text-red-600 dark:text-red-400">
                                Oops! Something went wrong. Please try again.
                            </p>
                        )}

                    </form>



                        <details className="mt-8 min-h-[50px] rounded-lg border border-gray-200 p-4 text-sm text-gray-600 dark:border-gray-600 dark:text-gray-400">

                        <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-200">
                            What can I request?
                        </summary>
                        <p className="mt-2">
                            I accept most character-based commissions, including original characters, fanart, and adult-themed works. If you’re unsure,
                            feel free to ask!
                        </p>
                    </details>
                </div>
            </section>
        </>
    );
}

Commissions.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
