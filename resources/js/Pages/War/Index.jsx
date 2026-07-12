import { Head } from '@inertiajs/react';
import { Swords } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import StatStrip from '@/Components/StatStrip';

const WARS = [
    {
        a: 'Guerreiros Z',
        b: 'Legião Vegeta',
        killsA: 34,
        killsB: 29,
        limit: 40,
        status: 'Em andamento',
    },
    {
        a: 'Ordem Namek',
        b: 'Clã Androide',
        killsA: 18,
        killsB: 22,
        limit: 30,
        status: 'Em andamento',
    },
    {
        a: 'Renegados de Namekusei',
        b: 'Aliança Terráquea',
        killsA: 25,
        killsB: 12,
        limit: 25,
        status: 'Encerrada',
    },
];

const STATS = [
    { label: 'Guerras ativas', value: WARS.filter((w) => w.status === 'Em andamento').length },
    { label: 'Encerradas', value: WARS.filter((w) => w.status === 'Encerrada').length },
    { label: 'Frags totais', value: WARS.reduce((sum, w) => sum + w.killsA + w.killsB, 0) },
];

export default function WarIndex() {
    return (
        <>
            <Head title="Guerra" />

            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
                <PageHeader
                    kicker="// War System"
                    title="Guerra"
                    description="Guerras ativas e encerradas entre guildas. Limite de frags decide o vencedor."
                />

                <StatStrip stats={STATS} />

                <div className="mt-6 rounded-2xl border border-line bg-gradient-to-br from-ember to-ember-2 p-6 text-center">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-kame-blue">
                        Próxima janela de guerra livre
                    </p>
                    <p className="mt-2 font-display text-3xl text-parchment">02:14:37</p>
                </div>

                <div className="mt-8 space-y-4">
                    {WARS.map((war) => {
                        const total = war.killsA + war.killsB;
                        const pctA = total ? (war.killsA / total) * 100 : 50;
                        return (
                            <div
                                key={`${war.a}-${war.b}`}
                                className="rounded-2xl border border-line bg-ember p-5"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <span
                                        className={`inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wide ${
                                            war.status === 'Em andamento'
                                                ? 'bg-danger text-parchment'
                                                : 'bg-white/10 text-ash'
                                        }`}
                                    >
                                        <Swords size={11} />
                                        {war.status}
                                    </span>
                                    <span className="text-xs text-ash">Limite: {war.limit} frags</span>
                                </div>

                                <div className="mt-4 flex items-center justify-between text-sm font-bold text-parchment">
                                    <span>{war.a}</span>
                                    <span className="font-mono text-ash">
                                        {war.killsA} — {war.killsB}
                                    </span>
                                    <span>{war.b}</span>
                                </div>

                                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-void">
                                    <div
                                        className="h-full bg-ki-orange"
                                        style={{ width: `${pctA}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

WarIndex.layout = (page) => <PublicLayout children={page} />;
