import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import React, { useRef, useState } from 'react';

type Illustration = {
    id: number;
    url: string;
    caption: string | null;
    sort_order: number;
    is_published: boolean;
};

type Props = {
    recentIllustrations: Illustration[];
    illustrationCount: number;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
];

export default function Dashboard({ recentIllustrations = [], illustrationCount = 0 }: Props) {
    const fileRef = useRef<HTMLInputElement | null>(null);

    const { post, processing, reset, setData, data } = useForm<{
        images: File[];
        captions: (string | null)[];
        is_published: boolean;
    }>({ images: [], captions: [], is_published: true });

    const onFiles = (files: FileList | null) => {
        if (!files) return;
        const arr = Array.from(files);
        setData('images', arr);
        setData('captions', arr.map(() => ''));
    };


    const removePending = (i: number) => {
        setData('images', data.images.filter((_, idx) => idx !== i));
        setData('captions', (data.captions ?? []).filter((_, idx) => idx !== i));
        if (fileRef.current && data.images.length === 1) fileRef.current.value = '';
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.illustrations.store'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset();
                if (fileRef.current) fileRef.current.value = '';
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Top cards row */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {/* Quick upload */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border">
                        <div className="p-4">
                            <h2 className="mb-3 text-lg font-semibold">Quick upload</h2>

                            <form onSubmit={submit} className="space-y-3">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => fileRef.current?.click()}
                                            className="rounded-lg border px-3 py-1.5 text-sm hover:bg-neutral-800"
                                        >
                                            Choose files…
                                        </button>
                                        <input
                                            ref={fileRef}
                                            type="file"
                                            className="hidden"
                                            multiple
                                            accept="image/png,image/jpeg,image/webp"
                                            onChange={(e) => onFiles(e.target.files)}
                                        />
                                    </div>
                                </div>

                                {data.images.length > 0 && (
                                    <div className="space-y-2">
                                        {data.images.map((f, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <span className="min-w-36 truncate text-xs opacity-70">{f.name}</span>
                                                <input
                                                    type="text"
                                                    placeholder="Caption (optional)"
                                                    value={data.captions[i] ?? ''}
                                                    onChange={(e) => {
                                                        const next = [...(data.captions ?? [])];
                                                        next[i] = e.target.value;
                                                        setData('captions', next);
                                                    }}
                                                    className="flex-1 rounded-lg border p-1.5 text-sm"
                                                />                                                <button
                                                    type="button"
                                                    onClick={() => removePending(i)}
                                                    className="rounded-lg border px-2 py-1 text-xs hover:bg-neutral-800"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <label className="flex items-center gap-2 text-sm">
                                    <input
                                        type="checkbox"
                                        checked={data.is_published}
                                        onChange={(e) => setData('is_published', e.target.checked)}
                                    />
                                    <span>Publish immediately</span>
                                </label>

                                <div className="flex items-center justify-between">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-lg bg-[#822a59] px-4 py-1.5 text-sm text-white hover:opacity-90"
                                    >
                                        {processing ? 'Uploading…' : 'Upload'}
                                    </button>

                                    <a
                                        href={route('admin.illustrations.index')}
                                        className="text-sm underline underline-offset-4 hover:opacity-80"
                                    >
                                        Open full manager →
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Stats / placeholders (you can replace these later) */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border">
                        <div className="p-4">
                            <h2 className="mb-2 text-lg font-semibold">Illustrations</h2>
                            <div className="text-3xl font-bold">{illustrationCount}</div>
                            <div className="mt-1 text-sm opacity-70">Total uploaded</div>
                        </div>
                    </div>

                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>

                {/* Recent illustrations grid */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border">
                    <div className="p-4">
                        <div className="mb-3 flex items-center justify-between">
                            <h2 className="text-lg font-semibold">Recent illustrations</h2>
                            <a
                                href={route('admin.illustrations.index')}
                                className="text-sm underline underline-offset-4 hover:opacity-80"
                            >
                                Manage all →
                            </a>
                        </div>

                        {recentIllustrations.length === 0 ? (
                            <p className="text-sm opacity-70">No illustrations yet. Use Quick upload above.</p>
                        ) : (
                            <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                {recentIllustrations.map((it) => (
                                    <li key={it.id} className="rounded-lg border p-2">
                                        <img
                                            src={it.url}
                                            alt={it.caption ?? ''}
                                            className="aspect-square w-full rounded-md object-cover"
                                        />
                                        <div className="mt-2 line-clamp-1 text-xs opacity-80">{it.caption}</div>
                                        <div className="mt-1 text-[11px] opacity-60">
                                            {it.is_published ? 'Published' : 'Hidden'} • #{it.sort_order}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
