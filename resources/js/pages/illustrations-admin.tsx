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
    const m = document.cookie.match(
        new RegExp(`(?:^|; )${name.replace(/[$()*+./?[\\\]^{|}-]/g, '\\$&')}=([^;]*)`)
    );
    return m ? decodeURIComponent(m[1]) : null;
}

// Build correct headers for Laravel CSRF verification
function csrfHeaders(): Record<string, string> {
    const meta = (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null)?.content;
    const xsrf = getCookie('XSRF-TOKEN');
    const h: Record<string, string> = { 'X-Requested-With': 'XMLHttpRequest', Accept: 'application/json' };
    if (meta) h['X-CSRF-TOKEN'] = meta;   // from <meta name="csrf-token" ...>
    if (xsrf) h['X-XSRF-TOKEN'] = xsrf;   // from XSRF-TOKEN cookie (NOTE header name)
    return h;
}

export default function AdminIllustrations({ items }: Props) {
    const [list, setList] = useState<Item[]>(items);

    useEffect(() => {
        setList(items); // trust server order
    }, [items]);

    // ---------- Upload form ----------
    const fileRef = useRef<HTMLInputElement | null>(null);
    const [captions, setCaptions] = useState<string[]>([]);
    const { post, processing, reset, setData, data } = useForm<{
        images: File[];
        captions: (string | null)[];
        is_published: boolean;
    }>({ images: [], captions: [], is_published: true });

    const onFiles = (files: FileList | null) => {
        if (!files) return;
        const arr = Array.from(files);
        setData('images', arr);
        setCaptions(arr.map(() => ''));
    };

    const removePending = (i: number) => {
        setData('images', data.images.filter((_, idx) => idx !== i));
        setCaptions(captions.filter((_, idx) => idx !== i));
        if (fileRef.current && data.images.length === 1) fileRef.current.value = '';
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setData('captions', captions);
        post(route('admin.illustrations.store'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset();
                if (fileRef.current) fileRef.current.value = '';
                setCaptions([]);
            },
        });
    };

    // ---------- Publish / Delete ----------
    const togglePublish = (item: Item) => {
        router.patch(
            route('admin.illustrations.update', item.id),
            { is_published: !item.is_published },
            { preserveScroll: true }
        );
    };

    const destroyItem = (item: Item) => {
        if (!confirm('Delete this illustration permanently?')) return;
        router.delete(route('admin.illustrations.destroy', item.id), { preserveScroll: true });
    };

    const renumber = (arr: Item[]) => arr.map((it, idx) => ({ ...it, sort_order: idx + 1 }));

    async function persistOrder(arr: Item[]) {
        const ids = arr.map(i => i.id);

        const res = await fetch(route('admin.illustrations.reorder'), {
            method: 'PATCH',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                ...csrfHeaders(), // <<< FIX: send both CSRF headers correctly
            },
            body: JSON.stringify({ order: ids.map(id => ({ id })) }),
        });

        if (!res.ok) {
            console.error('Reorder failed', res.status, await res.text().catch(() => ''));
            return;
        }

        const data = await res.json(); // { ok: true, ordered: number[] }
        const idOrder: number[] = data.ordered ?? ids;

        setList(prev => {
            const byId = new Map(prev.map(it => [it.id, it]));
            return idOrder.map((id, idx) => ({ ...byId.get(id)!, sort_order: idx + 1 }));
        });

        router.reload({
            only: ['items'],
            preserveScroll: true,
            preserveState: false,
        });
    }

    const move = (from: number, to: number) => {
        if (to < 0 || to >= list.length) return;
        const next = [...list];
        const [moved] = next.splice(from, 1);
        next.splice(to, 0, moved);
        const numbered = renumber(next);
        setList(numbered);          // optimistic UI
        void persistOrder(numbered); // save
    };

    return (
        <div className="p-6">
            <Head title="Manage Illustrations" />
            <h1 className="mb-4 text-2xl font-semibold">Illustrations</h1>

            {/* Existing */}
            <h2 className="mb-3 text-xl font-semibold">Existing</h2>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {list.map((item, idx) => (
                    <li key={item.id} className="rounded-xl border bg-black/10 p-3 dark:bg:white/5">
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

                        <div className="mt-2 text-sm">{item.caption}</div>

                        <div className="mt-3 flex gap-2">
                            <button
                                type="button"
                                onClick={() => togglePublish(item)}
                                className="rounded-lg bg-neutral-700 px-3 py-1 text-sm hover:bg-neutral-600"
                            >
                                {item.is_published ? 'Hide' : 'Publish'}
                            </button>
                            <button
                                type="button"
                                onClick={() => destroyItem(item)}
                                className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Upload */}
            <h2 className="mt-10 mb-3 text-xl font-semibold">Upload</h2>
            <form onSubmit={submit} className="space-y-4 rounded-xl border p-4">
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
                                    value={captions[i] ?? ''}
                                    onChange={(e) => {
                                        const next = [...captions];
                                        next[i] = e.target.value;
                                        setCaptions(next);
                                    }}
                                    className="flex-1 rounded-lg border p-2"
                                />
                                <button
                                    type="button"
                                    onClick={() => removePending(i)}
                                    className="rounded-lg border px-3 py-1 text-sm hover:bg-neutral-800"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={data.is_published}
                        onChange={(e) => setData('is_published', e.target.checked)}
                    />
                    <span>Publish immediately</span>
                </label>

                <button type="submit" disabled={processing} className="rounded-lg bg-[#822a59] px-4 py-2 text-white hover:opacity-90">
                    {processing ? 'Uploading…' : 'Upload'}
                </button>
            </form>
        </div>
    );
}
