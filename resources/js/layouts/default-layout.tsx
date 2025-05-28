import React from 'react';
import NavBar from '@/components/nav-bar';
import Footer from '@/components/footer';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-1 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 dark:text-white">
                {children}
            </main>
            <Footer />
        </div>
    )
}
