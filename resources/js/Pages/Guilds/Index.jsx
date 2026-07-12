import { useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import { Search, Users, Swords, ShieldAlert, Target, ChevronDown, ChevronUp, User } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import StatStrip from '@/Components/StatStrip';

const GUILDS = [
    { 
        name: 'Guerreiros Z', 
        leader: 'Kaelthorn', 
        membersCount: 34, 
        points: 18420, 
        war: true, 
        emblem: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=120',
        members: [
            { name: 'Kaelthorn', level: 412, race: 'Saiyajin', role: 'Líder' },
            { name: 'Vyrune', level: 398, race: 'Namekuseijin', role: 'Sub-Líder' },
            { name: 'Althenya', level: 275, race: 'Terráqueo', role: 'Membro' },
        ]
    },
    { 
        name: 'Legião Vegeta', 
        leader: 'Zhaelis', 
        membersCount: 29, 
        points: 16880, 
        war: true, 
        emblem: 'https://images.unsplash.com/photo-1599839334043-057563539824?q=80&w=120',
        members: [
            { name: 'Zhaelis', level: 385, race: 'Majin', role: 'Líder' },
            { name: 'Torreck', level: 371, race: 'Terráqueo', role: 'Membro' },
            { name: 'Corvain', level: 251, race: 'Androide', role: 'Membro' },
        ]
    },
    { 
        name: 'Ordem Namek', 
        leader: 'Fyorra', 
        membersCount: 22, 
        points: 11340, 
        war: false, 
        emblem: 'https://images.unsplash.com/photo-1634612301347-1f4803932e67?q=80&w=120',
        members: [
            { name: 'Fyorra', level: 312, race: 'Namekuseijin', role: 'Líder' },
            { name: 'Bralkor', level: 340, race: 'Saiyajin', role: 'Membro' },
        ]
    },
];

export default function GuildsIndex() {
    const [search, setSearch] = useState('');
    const [expandedGuild, setExpandedGuild] = useState(null);

    const results = useMemo(
        () => GUILDS.filter((g) => g.name.toLowerCase().includes(search.toLowerCase())),
        [search],
    );

    const stats = [
        { label: 'Guildas Elite', value: GUILDS.length },
        { label: 'Em Combate', value: GUILDS.filter((g) => g.war).length },
        { label: 'Score Global', value: GUILDS.reduce((sum, g) => sum + g.points, 0).toLocaleString('pt-BR') },
    ];

    const toggleGuild = (guildName) => {
        setExpandedGuild(expandedGuild === guildName ? null : guildName);
    };

    return (
        <>
            <Head title="Ranking de Guildas" />

            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
                <PageHeader
                    kicker="// Hall da Fama"
                    title="Guildas de Elite"
                    description="Clique em uma guilda para expandir e visualizar a lista completa de membros."
                />

                <StatStrip stats={stats} />

                <div className="relative mt-8">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ash" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Filtrar por nome da guilda..."
                        className="w-full rounded-xl border border-line bg-ember/40 py-3 pl-12 pr-4 text-parchment outline-none transition focus:border-ki-orange/50"
                    />
                </div>

                <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-ember/20 backdrop-blur-md">
                    <div className="flex flex-col divide-y divide-line/40">
                        {results.map((guild, index) => {
                            const isExpanded = expandedGuild === guild.name;
                            
                            return (
                                <div key={guild.name} className="group transition-colors hover:bg-white/[0.01]">
                                    {/* Linha Principal da Guilda (Clicável) */}
                                    <button
                                        onClick={() => toggleGuild(guild.name)}
                                        className="flex w-full flex-col gap-4 p-5 text-left sm:flex-row sm:items-center sm:justify-between"
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className="font-mono text-sm w-6 text-center text-ash/60">
                                                {String(index + 1).padStart(2, '0')}
                                            </div>

                                            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-line bg-void">
                                                <img src={guild.emblem} alt="" className="h-full w-full object-cover opacity-80" />
                                            </div>

                                            <div>
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <h2 className="text-lg text-parchment font-normal tracking-wide group-hover:text-ki-orange transition-colors">
                                                        {guild.name}
                                                    </h2>
                                                    {guild.war && (
                                                        <span className="inline-flex items-center gap-1 rounded bg-danger/10 px-2 py-0.5 text-[9px] uppercase tracking-widest text-danger border border-danger/20">
                                                            <Swords size={10} /> War
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-ash/80 mt-0.5 font-light">
                                                    Líder: <span className="text-ash font-normal">{guild.leader}</span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between border-t border-line/20 pt-3 sm:border-t-0 sm:pt-0 gap-8">
                                            <div className="text-left sm:text-right">
                                                <div className="text-[10px] uppercase tracking-widest text-ash/50 flex items-center sm:justify-end gap-1">
                                                    <Users size={10} /> Efetivo
                                                </div>
                                                <div className="mt-0.5 font-mono text-sm text-parchment font-light">
                                                    {guild.membersCount}
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <div className="text-[10px] uppercase tracking-widest text-ash/50 flex items-center justify-end gap-1">
                                                    <Target size={10} /> Pontuação
                                                </div>
                                                <div className="mt-0.5 font-mono text-base text-ki-orange tracking-wide">
                                                    {guild.points.toLocaleString('pt-BR')}
                                                </div>
                                            </div>

                                            <div className="text-ash/60 group-hover:text-parchment transition-colors pl-2">
                                                {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                                            </div>
                                        </div>
                                    </button>

                                    {/* Sub-lista de Membros Expandida */}
                                    {isExpanded && (
                                        <div className="bg-void/40 border-t border-line/20 px-12 py-5 transition-all">
                                            <div className="mb-3 text-[10px] uppercase tracking-widest text-ash/40">Membros do Clã</div>
                                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                                                {guild.members.map((member) => (
                                                    <div key={member.name} className="flex items-center justify-between rounded-xl border border-line/30 bg-ember/30 p-3">
                                                        <div className="flex items-center gap-2">
                                                            <User size={12} className="text-ash/60" />
                                                            <span className="text-sm text-parchment font-light">{member.name}</span>
                                                        </div>
                                                        <div className="text-right">
                                                            <span className="font-mono text-xs text-ki-orange">LVL {member.level}</span>
                                                            <span className="block text-[9px] text-ash/50 uppercase tracking-wider">{member.role}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {results.length === 0 && (
                            <div className="p-12 text-center text-ash font-light flex flex-col items-center justify-center gap-2">
                                <ShieldAlert size={24} className="text-ash/40" />
                                <span>Nenhuma coalizão localizada com esses parâmetros.</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

GuildsIndex.layout = (page) => <PublicLayout children={page} />;