import { Head, router, useForm } from '@inertiajs/react';
import React, { useEffect, useRef, useState } from 'react';

type Item = {
    id: number;
    url: string;
    caption: string | null;
    sort_order: number;
    is_published: boolean;
};

type Props = { items: Item[] };

function getCookie(name: string): string | null {
    const m = document.cookie.match(new RegExp(`(?:^|; )${name.replace(/[$()*+./?[\\\]^{|}-]/g, '\\$&')}=([^;]*)`));
    return m ? decodeURIComponent(m[1]) : null;
}

function csrfHeaders(): Record<string, string> {
    const meta = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null)?.content;
    const xsrf = getCookie('XSRF-TOKEN');
    const h: Record<string, string> = { 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/json' };
    if (meta) h['X-CSRF-TOKEN'] = meta;
    if (xsrf) h['X-XSRF-TOKEN'] = xsrf;
    return h;
}

type BtnState = 'idle' | 'working' | 'done';

export default function AdminIllustrations({ items }: Props) {
    const [list, setList] = useState<Item[]>(items);
    const [captionEdits, setCaptionEdits] = useState<Record<number, string>>({});

    // Button states
    const [captionState, setCaptionState] = useState<Record<number, BtnState>>({});
    const [publishState, setPublishState] = useState<Record<number, BtnState>>({});
    const [deleteState, setDeleteState] = useState<Record<number, BtnState>>({});
    const [uploadState, setUploadState] = useState<BtnState>('idle');

    useEffect(() => {
        setList(items);
        setCaptionEdits(
            items.reduce(
                (acc, it) => {
                    acc[it.id] = it.caption ?? '';
                    return acc;
                },
                {} as Record<number, string>,
            ),
        );
    }, [items]);

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
        setData(
            'captions',
            arr.map(() => ''),
        );
    };

    const removePending = (i: number) => {
        setData(
            'images',
            data.images.filter((_, idx) => idx !== i),
        );
        setData(
            'captions',
            (data.captions ?? []).filter((_, idx) => idx !== i),
        );
        if (fileRef.current && data.images.length === 1) fileRef.current.value = '';
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setUploadState('working');
        post(route('admin.illustrations.store'), {
            forceFormData: true,
            preserveUrl: true,
            onSuccess: () => {
                reset();
                if (fileRef.current) fileRef.current.value = '';
                setUploadState('done');
                setTimeout(() => setUploadState('idle'), 2000);
            },
            onError: () => setUploadState('idle'),
        });
    };

    // --- Save caption ---
    const saveCaption = (item: Item) => {
        const newCaption = captionEdits[item.id] ?? '';
        if (newCaption === (item.caption ?? '')) return; // no change => no request

        setCaptionState((prev) => ({ ...prev, [item.id]: 'working' }));
        router.patch(
            route('admin.illustrations.update', item.id),
            { caption: newCaption },
            {
                preserveUrl: true,
                preserveScroll: true,
                onSuccess: () => {
                    setCaptionState((prev) => ({ ...prev, [item.id]: 'done' }));
                    setTimeout(() => {
                        setCaptionState((prev) => ({ ...prev, [item.id]: 'idle' }));
                    }, 2000);
                },
                onError: () => {
                    setCaptionState((prev) => ({ ...prev, [item.id]: 'idle' }));
                },
            },
        );
    };

    // --- Publish toggle ---
    const togglePublish = (item: Item) => {
        setPublishState((prev) => ({ ...prev, [item.id]: 'working' }));
        router.patch(
            route('admin.illustrations.update', item.id),
            { is_published: !item.is_published },
            {
                preserveUrl: true,
                preserveScroll: true,
                onSuccess: () => {
                    setPublishState((prev) => ({ ...prev, [item.id]: 'done' }));
                    setTimeout(() => {
                        setPublishState((prev) => ({ ...prev, [item.id]: 'idle' }));
                    }, 2000);
                },
                onError: () => {
                    setPublishState((prev) => ({ ...prev, [item.id]: 'idle' }));
                },
            },
        );
    };

    // --- Delete ---
    const destroyItem = (item: Item) => {
        if (!confirm('Delete this illustration permanently?')) return;
        setDeleteState((prev) => ({ ...prev, [item.id]: 'working' }));
        router.delete(route('admin.illustrations.destroy', item.id), {
            preserveUrl: true,
            preserveScroll: true,
            onSuccess: () => {
                setDeleteState((prev) => ({ ...prev, [item.id]: 'done' }));
                setTimeout(() => {
                    setList((prev) => prev.filter((x) => x.id !== item.id));
                }, 800);
            },
            onError: () => {
                setDeleteState((prev) => ({ ...prev, [item.id]: 'idle' }));
            },
        });
    };

    // --- Reorder ---
    const renumber = (arr: Item[]) => arr.map((it, idx) => ({ ...it, sort_order: idx + 1 }));

    async function persistOrder(arr: Item[]) {
        const ids = arr.map((i) => i.id);
        const res = await fetch(route('admin.illustrations.reorder'), {
            method: 'PATCH',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                ...csrfHeaders(),
            },
            body: JSON.stringify({ order: ids.map((id) => ({ id })) }),
        });
        if (!res.ok) return;

        const data = await res.json();
        const idOrder: number[] = data.ordered ?? ids;
        setList((prev) => {
            const byId = new Map(prev.map((it) => [it.id, it]));
            return idOrder.map((id, idx) => ({ ...byId.get(id)!, sort_order: idx + 1 }));
        });
    }

    const move = (from: number, to: number) => {
        if (to < 0 || to >= list.length) return;
        const next = [...list];
        const [moved] = next.splice(from, 1);
        next.splice(to, 0, moved);
        const numbered = renumber(next);
        setList(numbered);
        void persistOrder(numbered);
    };

    // --- Reusable action button (now supports type="submit") ---
    const ActionButton = ({
        state,
        labels,
        baseColor,
        doneColor,
        onClick,
        disabled,
        type = 'button',
        minWidth = 'min-w-[100px]',
    }: {
        state: BtnState;
        labels: { idle: string; working: string; done: string };
        baseColor: string;
        doneColor: string;
        onClick?: () => void;
        disabled?: boolean;
        type?: 'button' | 'submit';
        minWidth?: string;
    }) => (
        <button
            type={type}
            onClick={onClick}
            disabled={state === 'working' || disabled}
            className={`relative inline-flex h-9 ${minWidth} items-center justify-center rounded-lg px-3 text-sm font-medium text-white transition-colors duration-300 ${
                state === 'done' ? doneColor : baseColor
            } disabled:opacity-60`}
        >
            <span className={`absolute transition-opacity duration-300 ${state === 'idle' ? 'opacity-100' : 'opacity-0'}`}>{labels.idle}</span>
            <span className={`absolute transition-opacity duration-300 ${state === 'working' ? 'opacity-100' : 'opacity-0'}`}>{labels.working}</span>
            <span className={`absolute transition-opacity duration-300 ${state === 'done' ? 'opacity-100' : 'opacity-0'}`}>{labels.done}</span>
        </button>
    );

    return (
        <div className="p-6">
            <Head title="Manage Illustrations" />
            <h1 className="mb-6 text-2xl font-semibold">Illustrations</h1>

            {/* Upload Form */}
            <h2 className="mb-3 text-xl font-semibold">Upload</h2>
            <form onSubmit={submit} className="mb-10 space-y-4 rounded-xl border p-4">
                <div>
                    <label className="mb-2 block font-medium">Upload images</label>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => fileRef.current?.click()}
                            className="rounded-lg border px-4 py-2 text-sm hover:bg-neutral-800"
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
                    <div className="space-y-3">
                        {data.images.map((f, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="min-w-40 truncate text-sm opacity-70">{f.name}</span>
                                <input
                                    type="text"
                                    placeholder="Caption (optional)"
                                    value={data.captions[i] ?? ''}
                                    onChange={(e) => {
                                        const next = [...(data.captions ?? [])];
                                        next[i] = e.target.value;
                                        setData('captions', next);
                                    }}
                                    className="h-9 flex-1 rounded-lg border px-3 text-sm"
                                />
                                <ActionButton
                                    state="idle"
                                    labels={{ idle: 'Remove', working: 'Removing…', done: 'Removed' }}
                                    baseColor="bg-neutral-700 hover:bg-neutral-600"
                                    doneColor="bg-green-600"
                                    onClick={() => removePending(i)}
                                />
                            </div>
                        ))}
                    </div>
                )}

                <label className="flex items-center gap-2">
                    <input type="checkbox" checked={data.is_published} onChange={(e) => setData('is_published', e.target.checked)} />
                    <span>Publish immediately</span>
                </label>

                {/* Submit button now uses type="submit" so the form posts */}
                <ActionButton
                    type="submit"
                    state={uploadState}
                    labels={{ idle: 'Upload', working: 'Uploading…', done: 'Uploaded' }}
                    baseColor="bg-[#822a59] hover:opacity-90"
                    doneColor="bg-green-600"
                    disabled={data.images.length === 0 || processing}
                />
            </form>

            {/* Existing images */}
            <h2 className="mb-3 text-xl font-semibold">Existing</h2>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {list.map((item, idx) => {
                    const capState = captionState[item.id] ?? 'idle';
                    const pubState = publishState[item.id] ?? 'idle';
                    const delState = deleteState[item.id] ?? 'idle';
                    const unchanged = (captionEdits[item.id] ?? '') === (item.caption ?? '');

                    return (
                        <li key={item.id} className="dark:bg:white/5 rounded-xl border bg-black/10 p-3">
                            <div className="mb-2 flex items-center justify-between">
                                <span className="text-xs opacity-70">
                                    Order: {item.sort_order} • {item.is_published ? 'Published' : 'Hidden'}
                                </span>
                                <div className="flex gap-1">
                                    <button
                                        type="button"
                                        className="rounded-md border px-2 py-1 text-xs hover:bg-neutral-800 disabled:opacity-40"
                                        onClick={() => move(idx, idx - 1)}
                                        disabled={idx === 0}
                                    >
                                        ↑
                                    </button>
                                    <button
                                        type="button"
                                        className="rounded-md border px-2 py-1 text-xs hover:bg-neutral-800 disabled:opacity-40"
                                        onClick={() => move(idx, idx + 1)}
                                        disabled={idx === list.length - 1}
                                    >
                                        ↓
                                    </button>
                                </div>
                            </div>

                            <img
                                src={item.url}
                                alt={item.caption ?? ''}
                                className="mt-1 aspect-square w-full rounded-md object-cover"
                                draggable={false}
                                style={{ WebkitUserDrag: 'none' } as React.CSSProperties}
                            />

                            {/* Editable caption row */}
                            <div className="mt-2 flex items-center gap-2">
                                <input
                                    type="text"
                                    value={captionEdits[item.id] ?? ''}
                                    onChange={(e) => setCaptionEdits((prev) => ({ ...prev, [item.id]: e.target.value }))}
                                    className="h-9 flex-1 rounded-lg border px-3 text-sm"
                                    placeholder="No caption"
                                />

                                <ActionButton
                                    state={capState}
                                    labels={{ idle: 'Save', working: 'Saving…', done: 'Saved' }}
                                    baseColor={`${unchanged ? 'bg-blue-600/60' : 'bg-blue-600 hover:bg-blue-500'}`}
                                    doneColor="bg-green-600"
                                    onClick={() => saveCaption(item)}
                                    disabled={unchanged}
                                />
                            </div>

                            <div className="mt-3 flex gap-2">
                                <ActionButton
                                    state={pubState}
                                    labels={{
                                        idle: item.is_published ? 'Hide' : 'Publish',
                                        working: 'Updating…',
                                        done: 'Updated',
                                    }}
                                    baseColor="bg-neutral-700 hover:bg-neutral-600"
                                    doneColor="bg-green-600"
                                    onClick={() => togglePublish(item)}
                                />
                                <ActionButton
                                    state={delState}
                                    labels={{ idle: 'Delete', working: 'Deleting…', done: 'Deleted' }}
                                    baseColor="bg-red-600 hover:bg-red-500"
                                    doneColor="bg-green-600"
                                    onClick={() => destroyItem(item)}
                                />
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
