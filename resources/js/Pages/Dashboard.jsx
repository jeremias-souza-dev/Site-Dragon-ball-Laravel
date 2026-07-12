import { Head, Link } from '@inertiajs/react';
import {
    Download,
    MessageCircle,
    Shield,
    ShoppingBag,
    Swords,
    Trophy,
    UserPlus,
    Users,
} from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import KiParticles from '@/Components/KiParticles';
import NewsFeed from '@/Components/NewsFeed';
import HighscoresTable from '@/Components/HighscoresTable';
import ServerStatus from '@/Components/ServerStatus';

const QUICK_LINKS = [
    { label: 'Personagens', href: () => route('characters.index'), icon: Users, desc: 'Busque heróis e vilões do servidor' },
    { label: 'Guildas', href: () => route('guilds.index'), icon: Shield, desc: 'As comunidades mais fortes de Terra' },
    { label: 'Guerra', href: () => route('war.index'), icon: Swords, desc: 'Batalhas ativas entre guildas' },
    { label: 'Loja', href: () => route('shop.index'), icon: ShoppingBag, desc: 'Itens, cosméticos e montarias' },
];

export default function Dashboard() {
    return (
        <>
            <Head title="Dragon Ball War" />

            <section className="relative overflow-hidden px-4 pb-16 pt-20 text-center sm:px-6">
                <KiParticles count={60} />

                <p className="relative z-10 font-mono text-xs uppercase tracking-[0.25em] text-kame-blue">
                    // Servidor Dragon Ball · Protocolo 8.60
                </p>
                <h1 className="relative z-10 mx-auto mt-4 max-w-3xl bg-gradient-to-b from-[#fff2df] via-saiyan-gold to-ki-orange bg-clip-text font-display text-[clamp(2.5rem,8vw,5rem)] leading-[0.95] text-transparent">
                    DESPERTE
                    <br />
                    SEU KI
                </h1>
                <p className="relative z-10 mx-auto mt-5 max-w-xl text-base leading-relaxed text-ash">
                    Terra está sob ameaça. Escolha sua raça, treine sob gravidade
                    extrema e entre em guerra pelas sete esferas.
                </p>

                <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-3">
                    <Link href={route('register')} className="btn btn-solid py-3 px-6">
                        <UserPlus size={15} />
                        Criar Conta Grátis
                    </Link>
                    <a href="#" className="btn btn-ghost py-3 px-6">
                        <Download size={15} />
                        Baixar Cliente
                    </a>
                </div>

                <div className="relative z-10 mx-auto mt-12 max-w-md">
                    <ServerStatus />
                </div>
            </section>

            <div className="mx-auto max-w-6xl space-y-16 px-4 pb-24 sm:px-6">
                <section>
                    <div className="flex items-end justify-between gap-4">
                        <h2 className="font-display text-2xl text-parchment">Novidades</h2>
                        <Link
                            href={route('news.index')}
                            className="text-xs font-bold uppercase tracking-wide text-ki-orange hover:text-saiyan-gold"
                        >
                            Ver todas →
                        </Link>
                    </div>
                    <div className="mt-4">
                        <NewsFeed limit={3} />
                    </div>
                </section>

                <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {QUICK_LINKS.map(({ label, href, icon: Icon, desc }) => (
                        <Link
                            key={label}
                            href={href()}
                            className="group rounded-2xl border border-line bg-ember p-5 transition hover:border-ki-orange/30"
                        >
                            <Icon size={20} className="text-ki-orange" />
                            <h3 className="mt-3 font-display text-lg text-parchment">{label}</h3>
                            <p className="mt-1.5 text-sm text-ash">{desc}</p>
                        </Link>
                    ))}
                </section>

                <section>
                    <div className="flex items-end justify-between gap-4">
                        <h2 className="flex items-center gap-2 font-display text-2xl text-parchment">
                            <Trophy size={20} className="text-saiyan-gold" />
                            Ranking
                        </h2>
                        <Link
                            href={route('highscores.index')}
                            className="text-xs font-bold uppercase tracking-wide text-ki-orange hover:text-saiyan-gold"
                        >
                            Ver ranking completo →
                        </Link>
                    </div>
                    <div className="mt-4">
                        <HighscoresTable limit={5} />
                    </div>
                </section>

                <section className="rounded-[28px] border border-line bg-gradient-to-br from-ember to-ember-2 p-8 text-center sm:p-12">
                    <h2 className="font-display text-2xl text-parchment sm:text-3xl">
                        Junte-se à comunidade no Discord
                    </h2>
                    <p className="mx-auto mt-3 max-w-lg text-sm text-ash">
                        Anúncios em tempo real, organização de raids e suporte direto
                        com a equipe.
                    </p>
                    <Link href={route('discord.index')} className="btn btn-solid mt-6 inline-flex py-3 px-6">
                        <MessageCircle size={15} />
                        Ver comunidade
                    </Link>
                </section>
            </div>
        </>
    );
}

Dashboard.layout = (page) => <PublicLayout children={page} />;
