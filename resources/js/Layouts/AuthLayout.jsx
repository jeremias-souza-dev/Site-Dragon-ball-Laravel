import SiteHeader from '@/Components/SiteHeader';
import Footer from '@/Components/Footer';
import KiParticles from '@/Components/KiParticles';

export default function AuthLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col bg-void text-parchment">
            <SiteHeader />

            <main className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-12">
                <KiParticles count={36} />
                <div className="relative z-10 w-full max-w-md">{children}</div>
            </main>

            <Footer />
        </div>
    );
}
