import { useState } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';

const TABS = ['Nível', 'Magia', 'Força', 'Ki'];

const RANKING = [
    { name: 'Kaelthorn', vocation: 'Super Saiyajin', level: 2750, points: '1.954.320' },
    { name: 'Vegeta', vocation: 'Príncipe Saiyajin', level: 2688, points: '1.842.700' },
    { name: 'Gohan', vocation: 'Místico', level: 2623, points: '1.740.980' },
    { name: 'Trunks', vocation: 'Futurista', level: 2591, points: '1.612.430' },
    { name: 'Piccolo', vocation: 'Nomekuseijin', level: 2547, points: '1.503.210' },
    { name: 'Zhaelis', vocation: 'Majin', level: 2498, points: '1.455.870' },
    { name: 'Torreck', vocation: 'Terráqueo', level: 2431, points: '1.390.220' },
    { name: 'Nissenka', vocation: 'Androide', level: 2387, points: '1.322.610' },
    { name: 'Fyorra', vocation: 'Nomekuseijin', level: 2340, points: '1.276.900' },
    { name: 'Bralkor', vocation: 'Saiyajin', level: 2298, points: '1.201.450' },
    { name: 'Dresk', vocation: 'Majin', level: 2255, points: '1.167.300' },
    { name: 'Althenya', vocation: 'Terráqueo', level: 2210, points: '1.098.760' },
];

export default function HighscoresIndex() {
    const [tab, setTab] = useState('Nível');

    return (
        <>
            <Head title="Ranking" />

            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
                <PageHeader
                    kicker="// Highscores"
                    title="Ranking"
                    description="Os guerreiros mais fortes do servidor."
                />

                <div className="mt-6 flex flex-wrap gap-2">
                    {TABS.map((t) => (
                        <button
                            key={t}
                            type="button"
                            onClick={() => setTab(t)}
                            className={`rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${
                                tab === t ? 'bg-ki-orange text-void' : 'bg-ember text-ash hover:text-parchment'
                            }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-ember">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 text-ash">
                            <tr>
                                <th className="px-5 py-4 text-[11px] font-mono uppercase tracking-[0.2em]">#</th>
                                <th className="px-5 py-4 text-[11px] font-mono uppercase tracking-[0.2em]">
                                    Personagem
                                </th>
                                <th className="px-5 py-4 text-[11px] font-mono uppercase tracking-[0.2em]">
                                    Vocação
                                </th>
                                <th className="px-5 py-4 text-[11px] font-mono uppercase tracking-[0.2em]">
                                    Nível
                                </th>
                                <th className="px-5 py-4 text-[11px] font-mono uppercase tracking-[0.2em]">
                                    Pontos
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {RANKING.map((row, i) => (
                                <tr key={row.name} className="border-t border-line hover:bg-white/5">
                                    <td
                                        className={`px-5 py-4 font-mono font-bold ${
                                            i === 0 ? 'text-saiyan-gold' : 'text-ki-orange'
                                        }`}
                                    >
                                        {i + 1}
                                    </td>
                                    <td className="px-5 py-4 font-bold text-parchment">{row.name}</td>
                                    <td className="px-5 py-4 text-ash">{row.vocation}</td>
                                    <td className="px-5 py-4 font-mono text-parchment">{row.level}</td>
                                    <td className="px-5 py-4 font-mono text-kame-blue">{row.points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

HighscoresIndex.layout = (page) => <PublicLayout children={page} />;
