import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, LogIn, LogOut, Menu, User, UserPlus, X } from 'lucide-react';
import Dropdown from '@/Components/Dropdown';

const NAV_LINKS = [
    { label: 'Novidades', href: () => route('news.index') },
    { label: 'Personagens', href: () => route('characters.index') },
    { label: 'Guildas', href: () => route('guilds.index') },
    { label: 'Ranking', href: () => route('highscores.index') },
    { label: 'Guerra', href: () => route('war.index') },
    { label: 'Loja', href: () => route('shop.index') },
    { label: 'Discord', href: () => route('discord.index') },
];

export default function SiteHeader() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { url, props } = usePage();
    const user = props.auth.user;

    return (
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
                    {user ? (
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button
                                    type="button"
                                    className="flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm font-semibold text-parchment transition hover:bg-white/5"
                                >
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ki-orange/15 text-ki-orange">
                                        <User size={14} />
                                    </span>
                                    {user.name}
                                </button>
                            </Dropdown.Trigger>

                            <Dropdown.Content
                                contentClasses="border border-line bg-void py-1"
                            >
                                <Dropdown.Link
                                    href={route('dashboard')}
                                    className="!text-parchment hover:!bg-white/5"
                                >
                                    <span className="flex items-center gap-2">
                                        <LayoutDashboard size={14} />
                                        Dashboard
                                    </span>
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route('profile.edit')}
                                    className="!text-parchment hover:!bg-white/5"
                                >
                                    <span className="flex items-center gap-2">
                                        <User size={14} />
                                        Perfil
                                    </span>
                                </Dropdown.Link>
                                <Dropdown.Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="!text-parchment hover:!bg-white/5"
                                >
                                    <span className="flex items-center gap-2">
                                        <LogOut size={14} />
                                        Sair
                                    </span>
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    ) : (
                        <>
                            <Link href={route('login')} className="btn btn-ghost">
                                <LogIn size={14} />
                                Entrar
                            </Link>
                            <Link href={route('register')} className="btn btn-solid">
                                <UserPlus size={14} />
                                Criar Conta
                            </Link>
                        </>
                    )}
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
                        {user ? (
                            <>
                                <Link
                                    href={route('dashboard')}
                                    className="btn btn-ghost justify-center"
                                >
                                    <LayoutDashboard size={14} />
                                    Dashboard
                                </Link>
                                <Link
                                    href={route('profile.edit')}
                                    className="btn btn-ghost justify-center"
                                >
                                    <User size={14} />
                                    Perfil
                                </Link>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="btn btn-solid justify-center"
                                >
                                    <LogOut size={14} />
                                    Sair
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href={route('login')} className="btn btn-ghost justify-center">
                                    Entrar
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="btn btn-solid justify-center"
                                >
                                    Criar Conta
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
