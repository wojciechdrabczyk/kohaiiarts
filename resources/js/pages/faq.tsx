import DefaultLayout from '@/layouts/default-layout';

export default function Faq() {
    return (
        <div className="">
            <h1 className={'text-2xl font-bold'}>FAQ</h1>
            <p>Frequently Asked Questions</p>
        </div>
    );
}
Faq.layout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>;
