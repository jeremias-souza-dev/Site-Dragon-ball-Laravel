const RACES = [
    { label: 'Saiyajin', count: 1842 },
    { label: 'Terráqueo', count: 1520 },
    { label: 'Namekuseijin', count: 980 },
    { label: 'Androide', count: 812 },
    { label: 'Majin', count: 826 },
];

export default function RaceDistribution() {
    const max = Math.max(...RACES.map((r) => r.count));

    return (
        <div className="rounded-2xl border border-line bg-ember p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ash">
                Personagens por raça
            </p>
            <div className="mt-3 space-y-2.5">
                {RACES.map((race) => (
                    <div key={race.label}>
                        <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-parchment">{race.label}</span>
                            <span className="font-mono text-ash">{race.count.toLocaleString('pt-BR')}</span>
                        </div>
                        <div className="mt-1 h-1 overflow-hidden rounded-full bg-void">
                            <div
                                className="h-full bg-kame-blue"
                                style={{ width: `${(race.count / max) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
