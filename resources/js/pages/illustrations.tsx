import DefaultLayout from '@/layouts/default-layout';

export default function Illustrations() {
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Illustrations</h1>
            <p>Here are my latest artworks and featured collections.</p>
        </div>
        )
}
Illustrations.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
