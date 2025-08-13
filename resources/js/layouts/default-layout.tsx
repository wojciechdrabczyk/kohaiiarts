import NavBar from '@/components/nav-bar';
import Footer from '@/components/footer';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-1 w-full mx-auto max-w-full px-4 sm:px-1 lg:px-1 md:px-1 mt-4 dark:text-white">
                {children}
            </main>
            <Footer />
        </div>
    );
}
