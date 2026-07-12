import SiteHeader from '@/Components/SiteHeader';
import Footer from '@/Components/Footer';

export default function PublicLayout({ children }) {
    return (
        <div className="min-h-screen bg-void text-parchment">
            <SiteHeader />

            <main>{children}</main>

            <Footer />
        </div>
    );
}
