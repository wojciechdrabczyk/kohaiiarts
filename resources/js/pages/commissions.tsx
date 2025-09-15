import DefaultLayout from '@/layouts/default-layout';
import { Form, Head, usePage } from '@inertiajs/react';
import React, { useMemo, useRef, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import { toast } from 'sonner';

type HoneypotProps = {
    enabled: boolean;
    nameFieldName: string;
    validFromFieldName: string;
    encryptedValidFrom: string;
};

type PageProps = {
    honeypot?: HoneypotProps;
};

export default function Commissions() {
    const { honeypot } = usePage().props as PageProps;

    const [showAllFaqs, setShowAllFaqs] = useState(false);
    const faqRef = useRef<HTMLDivElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const toastIdRef = useRef<string | number | undefined>(undefined);

    // local previews for the file input (the <Form> itself stays uncontrolled)
    const [files, setFiles] = useState<File[]>([]);
    const filePreviews = useMemo(() => files.map((f) => ({ file: f, url: URL.createObjectURL(f) })), [files]);

    React.useEffect(() => {
        return () => {
            filePreviews.forEach((p) => URL.revokeObjectURL(p.url));
        };
    }, [filePreviews]);

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

    // helper to remove a file from the <input type="file"> by rebuilding its FileList
    const removeFileAt = (index: number) => {
        const dt = new DataTransfer();
        files.forEach((f, i) => {
            if (i !== index) dt.items.add(f);
        });
        if (fileInputRef.current) {
            fileInputRef.current.files = dt.files;
        }
        setFiles(Array.from(dt.files));
    };

    // match "files" / "files.0" / "files.1" etc.
    const getFilesError = (errors: Record<string, string> | undefined) => {
        if (!errors) return undefined;
        if (errors['files']) return errors['files'];
        const keyed = Object.keys(errors).find((k) => k === 'files' || k.startsWith('files.'));
        return keyed ? errors[keyed] : undefined;
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

                    {/* Inertia v2 Form — keeps your markup but manages submission/errors/progress */}
                    <Form
                        action="/commissions"
                        method="post"
                        encType="multipart/form-data"
                        className="mt-12 scroll-mt-24 space-y-6 rounded-xl border-2 border-[#822a59] bg-white p-6 shadow-md dark:bg-neutral-900"
                        // inject honeypot fields just before submit (docs: transform)
                        transform={(data) => {
                            if (honeypot?.enabled) {
                                data[honeypot.nameFieldName] = '';
                                data[honeypot.validFromFieldName] = honeypot.encryptedValidFrom;
                            }
                            return data;
                        }}
                        // visit handling (docs: options & events)
                        options={{ preserveScroll: true }}
                        disableWhileProcessing
                        onStart={() => {
                            toastIdRef.current = toast.loading('Sending your commission request…');
                        }}
                        onProgress={(e) => {
                            if (toastIdRef.current && e?.percentage != null) {
                                toast.message(`Uploading… ${e.percentage}%`, { id: toastIdRef.current });
                            }
                        }}
                        onSuccess={() => {
                            toast.success('Your commission request has been received!', { id: toastIdRef.current });
                            // Clear file input + previews
                            if (fileInputRef.current) fileInputRef.current.value = '';
                            setFiles([]);
                            setTimeout(() => {
                                document.getElementById('commissionForm')?.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
                        }}
                        onError={() => {
                            toast.error('Please fix the errors and try again.', { id: toastIdRef.current });
                        }}
                        onFinish={() => {
                            toastIdRef.current = undefined;
                        }}
                    >
                        {({ errors, processing, progress, recentlySuccessful }) => (
                            <>
                                <h2 id="commissionForm" className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                    Request a Commission
                                </h2>

                                {/* Text fields (uncontrolled; just use name=... so Form collects them) */}
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
                                        type: 'text',
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
                                    const err = errors?.[id];
                                    const common =
                                        `w-full rounded border px-4 py-3 text-sm transition focus:border-[#822a59] focus:ring-1 focus:ring-[#822a59] focus:outline-none ` +
                                        (err
                                            ? 'border-red-600'
                                            : 'border-gray-300 bg-white text-gray-900 dark:border-gray-600 dark:bg-neutral-800 dark:text-gray-100');
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
                                                    className={common}
                                                />
                                            ) : (
                                                <input
                                                    id={id}
                                                    name={id}
                                                    type={type}
                                                    required={required}
                                                    placeholder={placeholder}
                                                    className={common}
                                                />
                                            )}

                                            {err && (
                                                <p id={`${id}-error`} className="text-sm text-red-600 dark:text-red-400">
                                                    {err}
                                                </p>
                                            )}
                                        </div>
                                    );
                                })}

                                {/* Hidden honeypot is optional since we inject via transform; harmless to keep out */}

                                {/* Files */}
                                <div>
                                    <label htmlFor="files" className="mb-2 block text-sm font-medium text-gray-600 dark:text-gray-300">
                                        Attach Image References <span className="text-xs text-gray-400">(optional)</span>
                                    </label>

                                    <div className="flex items-center gap-3">
                                        <input
                                            ref={fileInputRef}
                                            id="files"
                                            name="files[]"
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            multiple
                                            onChange={(e) => {
                                                const list = Array.from(e.target.files || []);
                                                setFiles(list);
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
                                            {files.length} {files.length === 1 ? 'file' : 'files'} selected
                                        </span>
                                    </div>

                                    {files.length > 0 && (
                                        <div className="mt-2 flex flex-wrap gap-2">
                                            {filePreviews.map((p, i) => (
                                                <div key={i} className="relative">
                                                    <img
                                                        src={p.url}
                                                        alt={`Preview ${i + 1}`}
                                                        className="h-20 w-20 rounded object-cover ring-1 ring-gray-300 dark:ring-gray-600"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFileAt(i)}
                                                        className="bg-opacity-75 absolute top-0 right-0 rounded-full bg-black px-2 py-1 text-xs text-white hover:bg-red-600 dark:bg-white dark:text-black dark:hover:bg-red-600"
                                                        style={{ fontSize: '14px' }}
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {(() => {
                                        const filesError = getFilesError(errors);
                                        return (
                                            filesError && (
                                                <p id="files-error" className="mt-2 text-sm text-red-600 dark:text-red-400">
                                                    {filesError}
                                                </p>
                                            )
                                        );
                                    })()}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className={`w-full rounded px-4 py-3 text-sm font-semibold text-white transition ${
                                        processing
                                            ? 'cursor-not-allowed bg-gray-400'
                                            : 'bg-[#822a59] hover:bg-[#6e1f48] dark:bg-[#822a59] dark:hover:bg-[#6e1f48]'
                                    }`}
                                >
                                    {processing
                                        ? progress?.percentage != null
                                            ? `Sending… ${progress.percentage}%`
                                            : 'Sending…'
                                        : 'Send Commission Request'}
                                </button>

                                {recentlySuccessful && (
                                    <p className="mt-4 text-center text-sm text-green-600 dark:text-green-400">
                                        Thank you! Your message has been sent.
                                    </p>
                                )}
                            </>
                        )}
                    </Form>

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
                                className="rounded bg-[#822a59] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#9c3d6e] dark:bg-[#822a59] dark:text-white dark:hover:bg-[#6e1f48]"
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
