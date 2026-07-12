import { Head, Link } from '@inertiajs/react';
import { Download, MessageCircle, Radio, Server, Shield, ShoppingBag, Swords, Trophy, UserPlus, Users } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import KiParticles from '@/Components/KiParticles';
import NewsFeed from '@/Components/NewsFeed';
import HighscoresTable from '@/Components/HighscoresTable';
import CharacterQuickSearch from '@/Components/CharacterQuickSearch';
import ServerInfoPanel from '@/Components/ServerInfoPanel';
import RaceDistribution from '@/Components/RaceDistribution';

// Definição estática para evitar re-cálculo
const QUICK_LINKS = [
    { label: 'Personagens', route: 'characters.index', icon: Users, desc: 'Busque heróis e vilões do servidor' },
    { label: 'Guildas', route: 'guilds.index', icon: Shield, desc: 'As comunidades mais fortes de Terra' },
    { label: 'Guerra', route: 'war.index', icon: Swords, desc: 'Batalhas ativas entre guildas' },
    { label: 'Loja', route: 'shop.index', icon: ShoppingBag, desc: 'Itens, cosméticos e montarias' },
];

const STATS = [
    { label: 'Online', value: '128', icon: Users },
    { label: 'Personagens', value: '5.980', icon: Trophy },
    { label: 'Contas', value: '3.412', icon: Server },
];

export default function Dashboard() {
    return (
        <>
            <Head title="Dragon Ball War - Desperte seu Ki" />

            <main className="relative overflow-hidden">
                {/* Hero Section */}
                <section className="relative px-4 pb-20 pt-24 text-center sm:px-6">
                    <KiParticles count={60} />
                    
                    <div className="relative z-10 mx-auto max-w-4xl">
                        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-ember/50 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-kame-blue backdrop-blur-sm">
                            <Radio size={12} className="animate-pulse" />
                            Servidor Dragon Ball · Protocolo 8.60
                        </span>

                        <h1 className="mt-8 bg-gradient-to-b from-[#fff2df] via-saiyan-gold to-ki-orange bg-clip-text font-display text-6xl leading-[0.9] tracking-tight text-transparent sm:text-8xl">
                            DESPERTE<br />SEU KI
                        </h1>
                        
                        <p className="mx-auto mt-6 max-w-lg text-lg text-ash">
                            Terra está sob ameaça. Escolha sua raça, treine sob gravidade extrema e entre em guerra pelas sete esferas.
                        </p>

                        <div className="mt-10 flex flex-wrap justify-center gap-4">
                            <Link href={route('register')} className="btn btn-solid flex items-center gap-2 px-8 py-4 text-lg">
                                <UserPlus size={20} /> Criar Conta Grátis
                            </Link>
                            <a href="#" className="btn btn-ghost flex items-center gap-2 px-8 py-4 text-lg">
                                <Download size={20} /> Baixar Cliente
                            </a>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
                        {STATS.map((stat) => (
                            <div key={stat.label} className="rounded-2xl border border-line bg-ember/30 p-6 backdrop-blur-md transition hover:bg-ember/50">
                                <stat.icon className="mx-auto text-ki-orange" size={24} />
                                <div className="mt-3 font-mono text-2xl font-bold text-parchment">{stat.value}</div>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-ash">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Main Content Area */}
                <div className="mx-auto max-w-6xl space-y-24 px-4 pb-24 sm:px-6">
                    <section className="grid gap-6 sm:grid-cols-3">
                        <CharacterQuickSearch />
                        <ServerInfoPanel />
                        <RaceDistribution />
                    </section>

                    <section>
                        <div className="mb-6 flex items-end justify-between">
                            <h2 className="font-display text-3xl text-parchment">Novidades</h2>
                            <Link href={route('news.index')} className="text-sm font-bold uppercase tracking-wide text-ki-orange transition hover:text-saiyan-gold">
                                Ver todas →
                            </Link>
                        </div>
                        <NewsFeed limit={3} />
                    </section>

                    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {QUICK_LINKS.map(({ label, route: r, icon: Icon, desc }) => (
                            <Link key={label} href={route(r)} className="group flex flex-col rounded-2xl border border-line bg-ember p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ki-orange/50 hover:shadow-xl hover:shadow-ki-orange/10">
                                <Icon size={24} className="text-ki-orange transition-colors group-hover:text-white" />
                                <h3 className="mt-4 font-display text-xl text-parchment">{label}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-ash">{desc}</p>
                            </Link>
                        ))}
                    </section>

                    <section>
                        <div className="mb-6 flex items-end justify-between">
                            <h2 className="flex items-center gap-3 font-display text-3xl text-parchment">
                                <Trophy className="text-saiyan-gold" size={28} /> Ranking
                            </h2>
                            <Link href={route('highscores.index')} className="text-sm font-bold uppercase tracking-wide text-ki-orange hover:text-saiyan-gold">
                                Ver ranking completo →
                            </Link>
                        </div>
                        <HighscoresTable limit={5} />
                    </section>

                    {/* Community Banner */}
                    <section className="relative overflow-hidden rounded-[32px] border border-line bg-gradient-to-br from-ember via-[#2a2419] to-ember p-12 text-center shadow-2xl">
                        <h2 className="font-display text-4xl text-parchment">Junte-se ao nosso Discord</h2>
                        <p className="mx-auto mt-4 max-w-md text-ash">Conecte-se com outros guerreiros, organize suas raids e receba suporte em tempo real.</p>
                        <Link href={route('discord.index')} className="btn btn-solid mt-8 inline-flex items-center gap-2 px-8 py-4">
                            <MessageCircle size={18} /> Entrar no Discord
                        </Link>
                    </section>
                </div>
            </main>
        </>
    );
}

Dashboard.layout = (page) => <PublicLayout children={page} />;