import { useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import { ArrowUpDown, Search } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import StatStrip from '@/Components/StatStrip';
import Pagination from '@/Components/Pagination';

const RACES = ['Todas', 'Saiyajin', 'Namekuseijin', 'Terráqueo', 'Androide', 'Majin'];
const PER_PAGE = 6;

const RACE_COLOR = {
    Saiyajin: 'bg-ki-orange',
    Namekuseijin: 'bg-good',
    Terráqueo: 'bg-kame-blue',
    Androide: 'bg-ash',
    Majin: 'bg-danger',
};

const CHARACTERS = [
    { name: 'Kaelthorn', level: 412, race: 'Saiyajin', guild: 'Guerreiros Z', online: true },
    { name: 'Vyrune', level: 398, race: 'Namekuseijin', guild: 'Guerreiros Z', online: true },
    { name: 'Zhaelis', level: 385, race: 'Majin', guild: 'Legião Vegeta', online: false },
    { name: 'Torreck', level: 371, race: 'Terráqueo', guild: 'Legião Vegeta', online: true },
    { name: 'Nissenka', level: 366, race: 'Androide', guild: '—', online: false },
    { name: 'Bralkor', level: 340, race: 'Saiyajin', guild: 'Ordem Namek', online: false },
    { name: 'Fyorra', level: 312, race: 'Namekuseijin', guild: 'Ordem Namek', online: true },
    { name: 'Dresk', level: 298, race: 'Majin', guild: '—', online: false },
    { name: 'Althenya', level: 275, race: 'Terráqueo', guild: 'Guerreiros Z', online: false },
    { name: 'Corvain', level: 251, race: 'Androide', guild: 'Legião Vegeta', online: true },
];

export default function CharactersIndex({ initialQuery = '' }) {
    const [search, setSearch] = useState(initialQuery);
    const [race, setRace] = useState('Todas');
    const [sortDesc, setSortDesc] = useState(true);
    const [page, setPage] = useState(1);

    const results = useMemo(() => {
        const filtered = CHARACTERS.filter((c) => {
            const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
            const matchesRace = race === 'Todas' || c.race === race;
            return matchesSearch && matchesRace;
        });
        return filtered.sort((a, b) => (sortDesc ? b.level - a.level : a.level - b.level));
    }, [search, race, sortDesc]);

    const totalPages = Math.max(1, Math.ceil(results.length / PER_PAGE));
    const visible = results.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    const stats = [
        { label: 'Personagens', value: CHARACTERS.length },
        { label: 'Online agora', value: CHARACTERS.filter((c) => c.online).length },
        { label: 'Resultados', value: results.length },
    ];

    return (
        <>
            <Head title="Personagens" />

            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
                <PageHeader
                    kicker="// Busca de personagens"
                    title="Personagens"
                    description="Encontre heróis e vilões do servidor por nome ou raça."
                />

                <StatStrip stats={stats} />

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <div className="relative flex-1">
                        <Search
                            size={16}
                            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ash"
                        />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            placeholder="Buscar por nome..."
                            className="w-full rounded-xl border border-white/10 bg-ember py-2.5 pl-10 pr-4 text-parchment outline-none placeholder:text-ash focus:border-ki-orange focus:ring-2 focus:ring-ki-orange/15"
                        />
                    </div>
                    <select
                        value={race}
                        onChange={(e) => {
                            setRace(e.target.value);
                            setPage(1);
                        }}
                        className="rounded-xl border border-white/10 bg-ember px-4 py-2.5 text-parchment outline-none focus:border-ki-orange focus:ring-2 focus:ring-ki-orange/15"
                    >
                        {RACES.map((r) => (
                            <option key={r} value={r}>
                                {r}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-ember">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 text-ash">
                            <tr>
                                <th className="px-5 py-3 text-[11px] font-mono uppercase tracking-[0.2em]">
                                    Personagem
                                </th>
                                <th className="px-5 py-3 text-[11px] font-mono uppercase tracking-[0.2em]">
                                    Raça
                                </th>
                                <th className="px-5 py-3 text-[11px] font-mono uppercase tracking-[0.2em]">
                                    Guilda
                                </th>
                                <th className="px-5 py-3 text-[11px] font-mono uppercase tracking-[0.2em]">
                                    <button
                                        type="button"
                                        onClick={() => setSortDesc((v) => !v)}
                                        className="flex items-center gap-1 hover:text-parchment"
                                    >
                                        Nível
                                        <ArrowUpDown size={11} />
                                    </button>
                                </th>
                                <th className="px-5 py-3 text-[11px] font-mono uppercase tracking-[0.2em]">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {visible.map((c) => (
                                <tr key={c.name} className="border-t border-line hover:bg-white/5">
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-2.5">
                                            <span
                                                className={`h-2 w-2 rounded-full ${RACE_COLOR[c.race]}`}
                                                aria-hidden="true"
                                            />
                                            <span className="font-bold text-parchment">{c.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 text-ash">{c.race}</td>
                                    <td className="px-5 py-3.5 text-ash">{c.guild}</td>
                                    <td className="px-5 py-3.5 font-mono text-kame-blue">{c.level}</td>
                                    <td className="px-5 py-3.5">
                                        <span
                                            className={`inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase ${
                                                c.online ? 'text-good' : 'text-ash'
                                            }`}
                                        >
                                            <span
                                                className={`h-1.5 w-1.5 rounded-full ${c.online ? 'bg-good' : 'bg-ash'}`}
                                            />
                                            {c.online ? 'Online' : 'Offline'}
                                        </span>
                                    </td>
                                </tr>
                            ))}

                            {visible.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-5 py-10 text-center text-ash">
                                        Nenhum personagem encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <Pagination page={page} totalPages={totalPages} onChange={setPage} />
            </div>
        </>
    );
}

CharactersIndex.layout = (page) => <PublicLayout children={page} />;
