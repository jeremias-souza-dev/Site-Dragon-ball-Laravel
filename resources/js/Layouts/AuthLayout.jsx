import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import KiParticles from '@/Components/KiParticles';

export default function AuthLayout({ children }) {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-void px-4 py-10 text-parchment">
            <KiParticles count={36} />

            <Link
                href={route('home')}
                className="relative z-10 mb-8 flex items-center gap-2"
            >
                <span className="brand-mark" />
                <span className="brand-name text-lg">
                    Dragon Ball <span className="text-ki-orange">War</span>
                </span>
            </Link>

            <div className="relative z-10 w-full max-w-md">{children}</div>

            <Link
                href={route('home')}
                className="relative z-10 mt-8 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ash hover:text-ki-orange"
            >
                <ArrowLeft size={13} />
                Voltar para o site
            </Link>
        </div>
    );
}
