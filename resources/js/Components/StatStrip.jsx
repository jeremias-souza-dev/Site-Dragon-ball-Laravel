export default function StatStrip({ stats }) {
    return (
        <div className="mt-6 grid gap-3" style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))` }}>
            {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-line bg-ember px-4 py-3 text-center">
                    <p className="font-mono text-lg text-parchment">{stat.value}</p>
                    <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-ash">
                        {stat.label}
                    </p>
                </div>
            ))}
        </div>
    );
}
