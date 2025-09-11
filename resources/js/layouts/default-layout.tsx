import Footer from '@/components/footer';
import NavBar from '@/components/nav-bar';
import { Toaster } from 'sonner';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <NavBar />
            <main className="mx-auto mt-4 w-full max-w-full flex-1 px-4 sm:px-1 md:px-1 lg:px-1 dark:text-white">{children}</main>
            <Toaster />
            <Footer />
        </div>
    );
}
