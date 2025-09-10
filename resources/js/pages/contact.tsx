import InprntIcon from '@/assets/icons/InprntIcon';
import NewgroundsIcon from '@/assets/icons/NewgroundsIcon';
import ThroneIcon from '@/assets/icons/ThroneIcon';
import DefaultLayout from '@/layouts/default-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { motion, MotionConfig, stagger } from 'framer-motion';
import React, { FormEvent, useState } from 'react';
import { BsInstagram } from 'react-icons/bs';
import { FaDiscord } from 'react-icons/fa';
import { FaPatreon, FaThreads, FaXTwitter } from 'react-icons/fa6';

type Status = 'success' | 'error' | null;
type HoneypotProps = {
    enabled: boolean;
    nameFieldName: string;
    validFromFieldName: string;
    encryptedValidFrom: string;
};

export default function Contact() {
    const [status, setStatus] = useState<Status>(null);
    const { errors, honeypot } = usePage().props as {
        errors: Record<string, string>;
        honeypot?: HoneypotProps;
    };
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (submitting) return;

        setSubmitting(true);

        const formData = new FormData(e.currentTarget);

        router.post('/contact', formData, {
            onSuccess: () => {
                setStatus('success');
                e.currentTarget.reset();
            },
            onError: () => {
                setStatus('error');
            },
            onFinish: () => {
                setSubmitting(false);
            },
        });
    };

    const socialLinks = [
        { name: 'X', url: 'https://x.com/KohaiiArts', icon: <FaXTwitter size={32} />, title: 'X' },
        { name: 'Threads', url: 'https://www.threads.com/@kohaii_arts', icon: <FaThreads size={32} />, title: 'Threads' },
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/kohaii_arts/',
            icon: <BsInstagram size={32} className="text-pink-500" />,
            title: 'Instagram',
        },
        { name: 'Discord', url: 'https://discord.gg/hqGs4fGQXm', icon: <FaDiscord size={32} className="text-indigo-500" />, title: 'Discord' },
        { name: 'Newgrounds', url: 'https://kohaiiarts.newgrounds.com/art', icon: <NewgroundsIcon size={32} />, title: 'Newgrounds' },
        { name: 'Patreon', url: 'https://www.patreon.com/KohaiiArts', icon: <FaPatreon size={32} className="text-[#f96854]" />, title: 'Patreon' },
        { name: 'Throne', url: 'https://throne.com/kohaiiarts', icon: <ThroneIcon size={32} />, title: 'Throne' },
        { name: 'Inprnt', url: 'https://www.inprnt.com/gallery/kohaiiarts/', icon: <InprntIcon size={32} />, title: 'Inprnt' },
    ];

    return (
        <div className="mt-6 p-4 sm:px-6 md:px-10" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <Head>
                <title>Contact</title>
                <meta name="description" content="Contact me" />
            </Head>

            <MotionConfig reducedMotion="never">
                <motion.h1
                    className="mb-6 flex justify-center text-2xl tracking-tight text-gray-800 sm:text-3xl dark:text-gray-200"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.25 } }}
                >
                    You can find me on
                </motion.h1>

                <motion.ul
                    className="mb-12 flex flex-wrap justify-center gap-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0, y: 6 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.25, staggerChildren: 0.06 },
                        },
                    }}
                >
                    {socialLinks.map(({ name, url, icon, title }) => (
                        <motion.li
                            key={url}
                            className="relative flex flex-col items-center space-y-1"
                            variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                        >
                            <motion.a
                                href={url}
                                title={title}
                                target="_blank"
                                aria-label={name}
                                rel="noopener noreferrer"
                                className="flex items-center justify-center rounded-full border-2 border-[#822a59] bg-white p-5 dark:bg-neutral-800 dark:hover:bg-neutral-700"
                                whileHover={{ scale: 1.05, y: -1 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: 'tween', duration: 0.12 }}
                            >
                                {icon}
                            </motion.a>
                        </motion.li>
                    ))}
                </motion.ul>

                <div className="mb-10 px-2 text-center text-sm">
                    <motion.p
                        className="mx-auto mb-12 max-w-2xl text-[14px] leading-[1.75] text-gray-600 dark:text-gray-300"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.24, delay: 0.05 } }}
                    >
                        Thank you so much for checking out my art! You can support me through INPRNT, Throne, or Patreon, or just say hi on social
                        media. For commissions or collaborations, feel free to DM me on Instagram, X, Threads, or connect on Discord. I’m happy to
                        chat! You can also just send me a message directly below.
                    </motion.p>
                </div>

                <motion.form
                    onSubmit={handleSubmit}
                    id="contactForm"
                    className="mx-auto mt-12 max-w-xl scroll-mt-24 space-y-6 rounded-xl border-2 border-[#822a59] bg-white p-12 shadow-md dark:bg-neutral-900"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0, y: 8 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.28, ...stagger(0.06) },
                        },
                    }}
                >
                    <motion.h2
                        className="text-xl font-semibold text-gray-800 dark:text-gray-200"
                        variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.2 } } }}
                    >
                        Contact me
                    </motion.h2>

                    {[
                        { id: 'name', label: 'Name', required: true, type: 'text', placeholder: 'Your name, nickname, @discord' },
                        { id: 'email', label: 'Email Address', required: true, type: 'email', placeholder: 'example@domain.com' },
                        { id: 'subject', label: 'Subject', required: false, type: 'text', placeholder: 'e.g. Collab, Feedback, Inquiry' },
                        {
                            id: 'message',
                            label: 'Message',
                            required: true,
                            type: 'textarea',
                            placeholder: 'Feel free to share your thoughts, questions, or inquiries here.',
                        },
                    ].map(({ id, label, required, type, placeholder }) => {
                        const error = errors[id];
                        return (
                            <motion.div
                                key={id}
                                className="space-y-1"
                                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.2 } } }}
                            >
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
                            </motion.div>
                        );
                    })}

                    {honeypot?.enabled && (
                        <div className="hidden" aria-hidden="true">
                            <input type="text" name={honeypot.nameFieldName} defaultValue="" autoComplete="off" tabIndex={-1} />
                            <input type="text" name={honeypot.validFromFieldName} defaultValue={honeypot.encryptedValidFrom} readOnly />
                        </div>
                    )}

                    <motion.button
                        type="submit"
                        disabled={submitting}
                        className={`w-full rounded px-4 py-3 text-sm font-semibold text-white transition ${submitting ? 'cursor-not-allowed bg-gray-400' : 'bg-[#822a59] hover:bg-[#6e1f48] dark:bg-[#822a59] dark:hover:bg-[#6e1f48]'}`}
                        whileHover={!submitting ? { y: -1 } : {}}
                        whileTap={!submitting ? { scale: 0.98 } : {}}
                        transition={{ type: 'tween', duration: 0.12 }}
                    >
                        {submitting ? 'Sending…' : 'Send'}
                    </motion.button>
                </motion.form>

                {status && (
                    <motion.div
                        className="mx-auto mt-5 max-w-xl rounded-xl bg-white px-6 py-4 shadow-md dark:bg-neutral-900"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
                    >
                        {status === 'success' && (
                            <p className="text-center text-sm text-green-600 dark:text-green-400">Thank you! Your message has been sent.</p>
                        )}
                        {status === 'error' && (
                            <p className="text-center text-sm text-red-600 dark:text-red-400">Oops! Something went wrong. Please try again.</p>
                        )}
                    </motion.div>
                )}
            </MotionConfig>
        </div>
    );
}

Contact.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
