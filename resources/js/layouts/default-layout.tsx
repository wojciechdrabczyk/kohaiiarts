import React from 'react';
import NavBar from '@/components/nav-bar';
import Footer from '@/components/footer';

export default function DefaultLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    )
}
