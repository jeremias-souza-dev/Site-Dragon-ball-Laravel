import { Link } from '@inertiajs/react';

export default function Footer() {
    const links = [
        { label: 'Novidades', href: () => route('news.index') },
        { label: 'Ranking', href: () => route('highscores.index') },
        { label: 'Guildas', href: () => route('guilds.index') },
        { label: 'Guerra', href: () => route('war.index') },
        { label: 'Discord', href: () => route('discord.index') },
    ];

    return (
        <footer className="border-t border-line bg-void/80 backdrop-blur-sm mt-auto">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-ash text-center sm:text-left">
                        © 2026 Dragon Ball War — projeto de fã, sem fins lucrativos.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 items-center">
                        {links.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href()}
                                className="text-xs font-semibold text-ash hover:text-ki-orange transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                        <span className="font-mono text-xs text-ash/60">0.0908s</span>
                    </div>
                </div>

                <p className="mt-4 border-t border-line pt-4 text-center text-[11px] leading-relaxed text-ash/70 sm:text-left">
                    Dragon Ball é uma marca registrada de Bird Studio / Shueisha / Toei
                    Animation. Este é um servidor de fã sem fins lucrativos, sem
                    afiliação oficial com os detentores dos direitos.
                </p>
            </div>
        </footer>
    );
}
