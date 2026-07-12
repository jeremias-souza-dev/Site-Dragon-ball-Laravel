export default function Footer() {
    const links = [
        { label: 'Equipe', href: '#equipe' },
        { label: 'Banidos', href: '#banidos' },
        { label: 'Últimas Mortes', href: '#mortes' },
        { label: 'Online', href: '#online' },
        { label: 'Boss System', href: '#boss' },
    ];

    return (
        <footer className="border-t border-line bg-void/80 backdrop-blur-sm mt-auto">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <p className="text-xs text-ash text-center sm:text-left">
                    © 2026 Dragon Ball War — projeto de fã, sem fins lucrativos.
                </p>
                <div className="flex flex-wrap justify-center gap-4 items-center">
                    {links.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-xs font-semibold text-ash hover:text-ki-orange transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                    <span className="font-mono text-xs text-ash/60">0.0908s</span>
                </div>
            </div>
        </footer>
    );
}
