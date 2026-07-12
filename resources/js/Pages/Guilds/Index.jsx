import { useMemo, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { Search, Shield, Users } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import StatStrip from '@/Components/StatStrip';

const GUILDS = [
    { name: 'Guerreiros Z', leader: 'Kaelthorn', members: 34, points: 18420, war: true },
    { name: 'Legião Vegeta', leader: 'Zhaelis', members: 29, points: 16880, war: true },
    { name: 'Ordem Namek', leader: 'Fyorra', members: 22, points: 11340, war: false },
    { name: 'Clã Androide', leader: 'Nissenka', members: 18, points: 9210, war: false },
    { name: 'Renegados de Namekusei', leader: 'Dresk', members: 15, points: 7640, war: false },
    { name: 'Aliança Terráquea', leader: 'Althenya', members: 12, points: 5120, war: false },
];

export default function GuildsIndex() {
    const [search, setSearch] = useState('');

    const results = useMemo(
        () => GUILDS.filter((g) => g.name.toLowerCase().includes(search.toLowerCase())),
        [search],
    );

    const stats = [
        { label: 'Guildas', value: GUILDS.length },
        { label: 'Em guerra', value: GUILDS.filter((g) => g.war).length },
        { label: 'Membros totais', value: GUILDS.reduce((sum, g) => sum + g.members, 0) },
    ];

    return (
        <>
            <Head title="Guildas" />

            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
                <PageHeader
                    kicker="// Comunidades"
                    title="Guildas"
                    description="As guildas mais fortes do servidor, ordenadas por pontos."
                    action={
                        <Link href={route('register')} className="btn btn-solid">
                            <Shield size={14} />
                            Criar guilda
                        </Link>
                    }
                />

                <StatStrip stats={stats} />

                <div className="relative mt-8">
                    <Search
                        size={16}
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ash"
                    />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Buscar guilda..."
                        className="w-full rounded-xl border border-white/10 bg-ember py-2.5 pl-10 pr-4 text-parchment outline-none placeholder:text-ash focus:border-ki-orange focus:ring-2 focus:ring-ki-orange/15"
                    />
                </div>

                <div className="mt-6 space-y-3">
                    {results.map((guild) => {
                        const i = GUILDS.indexOf(guild);
                        return (
                            <div
                                key={guild.name}
                                className="flex items-center gap-4 rounded-2xl border border-line bg-ember p-5"
                            >
                                <span
                                    className={`font-mono text-lg font-bold ${
                                        i === 0 ? 'text-saiyan-gold' : 'text-ki-orange'
                                    }`}
                                >
                                    #{i + 1}
                                </span>

                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h2 className="font-display text-lg text-parchment">{guild.name}</h2>
                                        {guild.war && (
                                            <span className="rounded-sm bg-danger px-2 py-0.5 text-[10px] font-mono font-bold uppercase text-parchment">
                                                Em guerra
                                            </span>
                                        )}
                                    </div>
                                    <p className="mt-1 text-sm text-ash">
                                        Líder: <span className="text-parchment">{guild.leader}</span>
                                    </p>
                                </div>

                                <div className="hidden text-right sm:block">
                                    <p className="flex items-center gap-1.5 text-sm text-ash">
                                        <Users size={13} />
                                        {guild.members} membros
                                    </p>
                                    <p className="mt-1 font-mono text-sm text-kame-blue">
                                        {guild.points.toLocaleString('pt-BR')} pts
                                    </p>
                                </div>
                            </div>
                        );
                    })}

                    {results.length === 0 && (
                        <p className="py-12 text-center text-sm text-ash">Nenhuma guilda encontrada.</p>
                    )}
                </div>
            </div>
        </>
    );
}

GuildsIndex.layout = (page) => <PublicLayout children={page} />;
