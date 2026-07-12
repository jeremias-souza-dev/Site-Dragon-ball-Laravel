const highscores = [
    { position: 1, name: 'Goku', vocation: 'Super Saiyan', level: 2750, points: '1.954.320' },
    { position: 2, name: 'Vegeta', vocation: 'Príncipe Saiyan', level: 2688, points: '1.842.700' },
    { position: 3, name: 'Gohan', vocation: 'Místico', level: 2623, points: '1.740.980' },
    { position: 4, name: 'Trunks', vocation: 'Futurista', level: 2591, points: '1.612.430' },
    { position: 5, name: 'Piccolo', vocation: 'Nomekuseijin', level: 2547, points: '1.503.210' },
];

export default function HighscoresTable({ limit }) {
    const rows = limit ? highscores.slice(0, limit) : highscores;

    return (
        <div className="overflow-hidden rounded-2xl border border-line bg-ember">
            <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-ash">
                    <tr>
                        <th className="px-5 py-4 text-[11px] font-mono uppercase tracking-[0.2em]">#</th>
                        <th className="px-5 py-4 text-[11px] font-mono uppercase tracking-[0.2em]">Personagem</th>
                        <th className="px-5 py-4 text-[11px] font-mono uppercase tracking-[0.2em]">Vocação</th>
                        <th className="px-5 py-4 text-[11px] font-mono uppercase tracking-[0.2em]">Nível</th>
                        <th className="px-5 py-4 text-[11px] font-mono uppercase tracking-[0.2em]">Pontos</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr
                            key={row.position}
                            className="border-t border-line transition-colors duration-200 hover:bg-white/5"
                        >
                            <td
                                className={`px-5 py-4 font-mono font-bold ${
                                    row.position === 1 ? 'text-saiyan-gold' : 'text-ki-orange'
                                }`}
                            >
                                {row.position}
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
    );
}
