import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { LogIn, Menu, UserPlus, X } from 'lucide-react';
import Footer from '@/Components/Footer';

const NAV_LINKS = [
    { label: 'Novidades', href: () => route('news.index') },
    { label: 'Personagens', href: () => route('characters.index') },
    { label: 'Guildas', href: () => route('guilds.index') },
    { label: 'Ranking', href: () => route('highscores.index') },
    { label: 'Guerra', href: () => route('war.index') },
    { label: 'Loja', href: () => route('shop.index') },
    { label: 'Discord', href: () => route('discord.index') },
];

export default function PublicLayout({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { url } = usePage();

    return (
        <div className="min-h-screen bg-void text-parchment">
            <header className="sticky top-0 z-40 border-b border-line bg-void/85 backdrop-blur-xl">
                <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
                    <Link href={route('home')} className="flex items-center gap-2">
                        <span className="brand-mark" />
                        <span className="brand-name text-lg">
                            Dragon Ball <span className="text-ki-orange">War</span>
                        </span>
                    </Link>

                    <nav className="hidden items-center gap-1 md:flex">
                        {NAV_LINKS.map((link) => {
                            const href = link.href();
                            const isActive = url === new URL(href, window.location.origin).pathname;
                            return (
                                <Link
                                    key={link.label}
                                    href={href}
                                    className={`nav-link ${isActive ? 'active' : ''}`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="hidden items-center gap-2 md:flex">
                        <Link href={route('login')} className="btn btn-ghost">
                            <LogIn size={14} />
                            Entrar
                        </Link>
                        <Link href={route('register')} className="btn btn-solid">
                            <UserPlus size={14} />
                            Criar Conta
                        </Link>
                    </div>

                    <button
                        type="button"
                        onClick={() => setMobileOpen((v) => !v)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-parchment md:hidden"
                        aria-label="Menu"
                    >
                        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>

                {mobileOpen && (
                    <div className="border-t border-line px-4 py-3 md:hidden">
                        <div className="flex flex-col gap-1">
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href()}
                                    onClick={() => setMobileOpen(false)}
                                    className="nav-link text-left"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                        <div className="mt-3 flex flex-col gap-2">
                            <Link href={route('login')} className="btn btn-ghost justify-center">
                                Entrar
                            </Link>
                            <Link href={route('register')} className="btn btn-solid justify-center">
                                Criar Conta
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            <main>{children}</main>

            <Footer />
        </div>
    );
}
