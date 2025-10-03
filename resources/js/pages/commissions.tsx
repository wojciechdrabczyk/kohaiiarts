// resources/js/pages/commissions.tsx
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
    const { props } = usePage();
    const hp = (props as PageProps).honeypot;

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

                    {/* NEW: What's Included */}
                    <div className="mt-12 rounded-xl border-2 border-[#822a59] bg-white p-6 shadow-md dark:bg-neutral-900">
                        <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">What’s Included</h2>
                        <ul className="list-inside list-disc space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            <li>Full line art</li>
                            <li>Fully rendered / colored</li>
                            <li>
                                High-res PNG/JPEG – <strong>3000×3000 @ 300dpi</strong>
                            </li>
                            <li>Simple background included (unless stated otherwise)</li>
                        </ul>
                    </div>

                    {/* NEW: Pricing & Details (replaces old Base Commission Prices) */}
                    <div className="mt-6 rounded-xl border-2 border-[#822a59] bg-white p-6 shadow-md dark:bg-neutral-900">
                        <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">Pricing & Details</h2>
                        <ul className="list-inside list-disc space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            <li>
                                <strong>Portrait / Bust-Up</strong> — <strong>$128</strong>
                            </li>
                            <li>
                                <strong>Half-Body</strong> — <strong>$168</strong>
                            </li>
                            <li>
                                <strong>Full Body</strong> — <strong>$188</strong>
                            </li>
                        </ul>
                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">Simple background included (unless stated otherwise).</p>
                    </div>

                    {/* NEW: Add-ons */}
                    <div className="mt-6 rounded-xl border-2 border-[#822a59] bg-white p-6 shadow-md dark:bg-neutral-900">
                        <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">Add-ons</h2>
                        <ul className="list-inside list-disc space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            <li>
                                Extra character — <strong>+80%</strong> of base price
                            </li>
                            <li>
                                NSFW version (with & without outfit) — <strong>+50%</strong>
                            </li>
                            <li>
                                Complex background — <strong>+ $150</strong>
                            </li>
                            <li>Additional accessories / details may add extra costs</li>
                        </ul>
                    </div>

                    {/* NEW: Important notes */}
                    <div className="mt-6 rounded-xl border-2 border-[#822a59] bg-white p-6 shadow-md dark:bg-neutral-900">
                        <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">Important</h2>
                        <ul className="list-inside list-disc space-y-1 text-sm text-gray-600 dark:text-gray-400">
                            <li>
                                Minimum time to finish is <strong>7 days</strong> from sketch start; more items/complex details can add a few extra
                                days.
                            </li>
                            <li>
                                I’m most confident drawing <strong>female / androgynous</strong> characters, but I can adapt to male characters as
                                well.
                            </li>
                        </ul>
                    </div>

                    {/* Commission Process (kept) */}
                    <div className="mt-12 rounded-xl border-2 border-[#822a59] bg-white p-6 shadow-md dark:bg-neutral-900">
                        <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200">Commission Process</h2>
                        <ol className="list-decimal space-y-2 pl-4 text-sm text-gray-600 dark:text-gray-400">
                            <li>Submit your request using the form below.</li>
                            <li>If accepted, I’ll contact you with a rough sketch and estimated delivery.</li>
                            <li>Once the sketch is approved, I’ll send a PayPal invoice (5% fee applies).</li>
                            <li>After payment, I’ll complete the illustration and deliver it by the agreed date.</li>
                        </ol>
                    </div>

                    <Form
                        action="/commissions"
                        method="post"
                        encType="multipart/form-data"
                        className="mt-12 scroll-mt-24 space-y-6 rounded-xl border-2 border-[#822a59] bg-white p-6 shadow-md dark:bg-neutral-900"
                        transform={(data) => {
                            // ✅ Use pre-fetched hp; no hook calls here
                            if (hp?.enabled) {
                                data[hp.nameFieldName] = '';
                                data[hp.validFromFieldName] = hp.encryptedValidFrom;
                            }
                            return data;
                        }}
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

                                {/* Text fields */}
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

                    {/* FAQ / Terms (friendlier question-style headings) */}
                    <div ref={faqRef} className="mt-8 space-y-4">
                        {/* GENERAL */}
                        <details className="min-h-[50px] rounded-xl border-2 border-[#822a59] bg-white p-4 text-sm text-gray-600 shadow-md dark:bg-neutral-900 dark:text-gray-400">
                            <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-200 [&::marker]:text-[#c59d36]">
                                Do you stream progress? Can I use the art for AI/Crypto/NFT?
                            </summary>
                            <p className="mt-2">
                                I may stream progress on my social platforms. My artwork <strong>cannot</strong> be used for{' '}
                                <strong>AI, Crypto, or NFT</strong> purposes under any circumstances.
                            </p>
                        </details>

                        {/* PAYMENTS */}
                        <details className="min-h-[50px] rounded-xl border-2 border-[#822a59] bg-white p-4 text-sm text-gray-600 shadow-md dark:bg-neutral-900 dark:text-gray-400">
                            <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-200 [&::marker]:text-[#c59d36]">
                                How do payments work?
                            </summary>
                            <p className="mt-2">
                                Upfront payment is required. For orders over <strong>$600</strong>, I may accept a 50/50 split (first half to start,
                                second half upon completion).
                            </p>
                        </details>

                        {/* REVISIONS */}
                        <details className="min-h-[50px] rounded-xl border-2 border-[#822a59] bg-white p-4 text-sm text-gray-600 shadow-md dark:bg-neutral-900 dark:text-gray-400">
                            <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-200 [&::marker]:text-[#c59d36]">
                                How many revisions are included?
                            </summary>
                            <p className="mt-2">
                                I include up to <strong>2 revisions</strong> at the sketch/WIP stage. Additional revisions after that may incur extra
                                costs.
                            </p>
                        </details>

                        {/* DEADLINES & DELIVERY */}
                        <details className="min-h-[50px] rounded-xl border-2 border-[#822a59] bg-white p-4 text-sm text-gray-600 shadow-md dark:bg-neutral-900 dark:text-gray-400">
                            <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-200 [&::marker]:text-[#c59d36]">
                                How long will my commission take?
                            </summary>
                            <p className="mt-2">
                                If not specified or rushed, typical completion time is <strong>1–2 weeks</strong>, depending on the complexity and
                                details requested.
                            </p>
                        </details>

                        {/* USAGE & COMMERCIAL RIGHTS */}
                        <details className="min-h-[50px] rounded-xl border-2 border-[#822a59] bg-white p-4 text-sm text-gray-600 shadow-md dark:bg-neutral-900 dark:text-gray-400">
                            <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-200 [&::marker]:text-[#c59d36]">
                                Can I use the artwork commercially or in public?
                            </summary>
                            <p className="mt-2">
                                Finished artwork is for <strong>personal use</strong> by default. If you intend to use it commercially or under an
                                NDA, please state this in your request so we can agree on terms in advance.
                            </p>
                        </details>

                        {/* IP RIGHTS */}
                        <details className="min-h-[50px] rounded-xl border-2 border-[#822a59] bg-white p-4 text-sm text-gray-600 shadow-md dark:bg-neutral-900 dark:text-gray-400">
                            <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-200 [&::marker]:text-[#c59d36]">
                                Who owns the artwork and rights?
                            </summary>
                            <p className="mt-2">
                                I retain exclusive rights to my artwork, including reproduction, distribution, and public display. I may showcase
                                commissioned pieces in my portfolio, on social media, or for promotional use unless we agree otherwise.
                            </p>
                        </details>

                        {/* REFUNDS */}
                        <details className="min-h-[50px] rounded-xl border-2 border-[#822a59] bg-white p-4 text-sm text-gray-600 shadow-md dark:bg-neutral-900 dark:text-gray-400">
                            <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-200 [&::marker]:text-[#c59d36]">
                                Do you offer refunds?
                            </summary>
                            <p className="mt-2">
                                Refunds are only granted if I’m unable to deliver the project. I’ll reach out to you if that ever happens.
                            </p>
                        </details>

                        {/* Helpful non-conflicting FAQs */}
                        <details className="min-h-[50px] rounded-xl border-2 border-[#822a59] bg-white p-4 text-sm text-gray-600 shadow-md dark:bg-neutral-900 dark:text-gray-400">
                            <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-200 [&::marker]:text-[#c59d36]">
                                What references should I include?
                            </summary>
                            <p className="mt-2">
                                Visuals that help describe your idea—character sheets, poses, color palettes, outfits, moodboards, or even rough
                                sketches and Pinterest boards—are very helpful.
                            </p>
                        </details>

                        <details className="min-h-[50px] rounded-xl border-2 border-[#822a59] bg-white p-4 text-sm text-gray-600 shadow-md dark:bg-neutral-900 dark:text-gray-400">
                            <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-200 [&::marker]:text-[#c59d36]">
                                Do you draw NSFW or suggestive content?
                            </summary>
                            <p className="mt-2">
                                Yes—adult-themed work is accepted within reason. If you’re unsure, feel free to ask privately before submitting a
                                request.
                            </p>
                        </details>

                        {showAllFaqs && (
                            <>
                                <details className="min-h-[50px] rounded-xl border-2 border-[#822a59] bg-white p-4 text-sm text-gray-600 shadow-md dark:bg-neutral-900 dark:text-gray-400">
                                    <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-200 [&::marker]:text-[#c59d36]">
                                        Can I request a faster delivery?
                                    </summary>
                                    <p className="mt-2">
                                        Priority scheduling may be available depending on workload and complexity. Mention your deadline in the
                                        request and we’ll confirm feasibility and any additional cost before starting.
                                    </p>
                                </details>

                                <details className="min-h-[50px] rounded-xl border-2 border-[#822a59] bg-white p-4 text-sm text-gray-600 shadow-md dark:bg-neutral-900 dark:text-gray-400">
                                    <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-200 [&::marker]:text-[#c59d36]">
                                        Can I request a private commission?
                                    </summary>
                                    <p className="mt-2">
                                        Yes—private commissions won’t be posted or added to my portfolio. Please mention this in your request so we
                                        can align on terms before work begins.
                                    </p>
                                </details>

                                <details className="min-h-[50px] rounded-xl border-2 border-[#822a59] bg-white p-4 text-sm text-gray-600 shadow-md dark:bg-neutral-900 dark:text-gray-400">
                                    <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-200 [&::marker]:text-[#c59d36]">
                                        Can I use the artwork on Twitch, YouTube, or social media?
                                    </summary>
                                    <p className="mt-2">
                                        Personal use online is welcome (credit appreciated). For any commercial or monetized use, please mention it in
                                        your request so we can agree on terms beforehand.
                                    </p>
                                </details>

                                <details className="min-h-[50px] rounded-xl border-2 border-[#822a59] bg-white p-4 text-sm text-gray-600 shadow-md dark:bg-neutral-900 dark:text-gray-400">
                                    <summary className="cursor-pointer font-semibold text-gray-700 dark:text-gray-200 [&::marker]:text-[#c59d36]">
                                        Can I get my artwork as a print or on merch?
                                    </summary>
                                    <p className="mt-2">
                                        I don’t offer physical prints directly through commissions, but selected artworks may be available on my
                                        storefronts (e.g., INPRNT ). Feel free to ask if you’re looking for something specific.
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
