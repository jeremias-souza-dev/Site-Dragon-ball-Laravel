import { Head, Link } from '@inertiajs/react';
import { Shield, Users } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';

const GUILDS = [
    { name: 'Guerreiros Z', leader: 'Kaelthorn', members: 34, points: 18420, war: true },
    { name: 'Legião Vegeta', leader: 'Zhaelis', members: 29, points: 16880, war: true },
    { name: 'Ordem Namek', leader: 'Fyorra', members: 22, points: 11340, war: false },
    { name: 'Clã Androide', leader: 'Nissenka', members: 18, points: 9210, war: false },
    { name: 'Renegados de Namekusei', leader: 'Dresk', members: 15, points: 7640, war: false },
    { name: 'Aliança Terráquea', leader: 'Althenya', members: 12, points: 5120, war: false },
];

export default function GuildsIndex() {
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

                <div className="mt-8 space-y-3">
                    {GUILDS.map((guild, i) => (
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
                    ))}
                </div>
            </div>
        </>
    );
}

GuildsIndex.layout = (page) => <PublicLayout children={page} />;
