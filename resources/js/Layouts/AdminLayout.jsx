import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    Ban,
    LayoutDashboard,
    Megaphone,
    Menu,
    Settings,
    Users,
    X,
} from 'lucide-react';

const NAV_ITEMS = [
    { label: 'Visão geral', href: '/admin', icon: LayoutDashboard },
    { label: 'Contas', href: '/admin/contas', icon: Users },
    { label: 'Notícias', href: '/admin/noticias', icon: Megaphone },
    { label: 'Banimentos', href: '/admin/banimentos', icon: Ban },
    { label: 'Configurações', href: '/admin/config', icon: Settings },
];

export default function AdminLayout({ children, title }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { url } = usePage();

    return (
        <div className="min-h-screen bg-void text-parchment lg:flex">
            <aside className="hidden w-64 flex-none border-r border-line bg-ember lg:flex lg:flex-col">
                <Link href={route('home')} className="flex items-center gap-2 border-b border-line px-5 py-4">
                    <span className="brand-mark" />
                    <span className="brand-name text-base">
                        Dragon Ball <span className="text-ki-orange">War</span>
                    </span>
                </Link>
                <p className="px-5 pt-4 text-[11px] font-bold uppercase tracking-[0.2em] text-ash">
                    Administração
                </p>
                <nav className="flex flex-1 flex-col gap-1 p-3">
                    {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
                        const isActive = url === href || (href !== '/admin' && url.startsWith(href));
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all border ${
                                    isActive
                                        ? 'bg-ki-orange/15 text-ki-orange border-ki-orange/25'
                                        : 'text-ash hover:text-parchment hover:bg-white/5 border-transparent'
                                }`}
                            >
                                <Icon size={16} />
                                {label}
                            </Link>
                        );
                    })}
                </nav>
                <Link
                    href={route('home')}
                    className="border-t border-line px-5 py-4 text-xs font-semibold text-ash hover:text-ki-orange"
                >
                    ← Voltar ao site
                </Link>
            </aside>

            <div className="flex-1">
                <header className="flex items-center justify-between gap-4 border-b border-line bg-void/85 px-4 py-3.5 backdrop-blur-xl lg:px-8">
                    <button
                        type="button"
                        onClick={() => setMobileOpen(true)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-line lg:hidden"
                        aria-label="Menu"
                    >
                        <Menu size={18} />
                    </button>
                    <h1 className="font-display text-xl text-parchment">{title}</h1>
                    <div className="hidden text-xs font-mono text-ash lg:block">admin</div>
                </header>

                <main className="p-4 sm:p-6 lg:p-8">{children}</main>
            </div>

            {mobileOpen && (
                <div className="fixed inset-0 z-50 flex lg:hidden">
                    <div
                        className="absolute inset-0 bg-void/80"
                        onClick={() => setMobileOpen(false)}
                    />
                    <aside className="relative z-10 flex w-64 flex-col bg-ember">
                        <div className="flex items-center justify-between border-b border-line px-4 py-4">
                            <span className="brand-name text-base">Admin</span>
                            <button onClick={() => setMobileOpen(false)} aria-label="Fechar">
                                <X size={18} />
                            </button>
                        </div>
                        <nav className="flex flex-1 flex-col gap-1 p-3">
                            {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
                                <Link
                                    key={href}
                                    href={href}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-ash hover:bg-white/5 hover:text-parchment"
                                >
                                    <Icon size={16} />
                                    {label}
                                </Link>
                            ))}
                        </nav>
                    </aside>
                </div>
            )}
        </div>
    );
}
