export default function ServerStatus({ online = true, players = 150, maxPlayers = 500, uptime = '12h 47m' }) {
    return (
        <section className="rounded-[28px] border border-line bg-ember p-6">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-mono uppercase tracking-[0.28em] text-ash">Servidor</p>
                    <h3 className="mt-2 font-display text-2xl text-parchment">Terra</h3>
                </div>

                <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-mono font-semibold uppercase tracking-wide ${
                        online ? 'bg-good/15 text-good' : 'bg-danger/15 text-danger'
                    }`}
                >
                    <span className={`h-1.5 w-1.5 rounded-full ${online ? 'bg-good' : 'bg-danger'}`} />
                    {online ? 'Online' : 'Offline'}
                </span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-void/60 p-4">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-ash">Uptime</p>
                    <p className="mt-2 font-mono text-lg text-parchment">{online ? uptime : '—'}</p>
                </div>
                <div className="rounded-2xl bg-void/60 p-4">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-ash">Jogadores</p>
                    <p className="mt-2 font-mono text-lg text-parchment">
                        {online ? `${players} / ${maxPlayers}` : `0 / ${maxPlayers}`}
                    </p>
                </div>
            </div>
        </section>
    );
}
