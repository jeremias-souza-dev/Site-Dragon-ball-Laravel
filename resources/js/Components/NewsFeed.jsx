const BADGE_STYLE = {
    Atualização: 'bg-kame-blue text-void',
    Evento: 'bg-saiyan-gold text-void',
    Boss: 'bg-danger text-parchment',
};

const newsItems = [
    {
        title: 'Novo Boss Mundial: Omega Shenron',
        category: 'Boss',
        description:
            'Uma nova ameaça surge e desafia até os mais experientes fighters. Resgate recompensas exclusivas de temporada.',
        date: 'Hoje',
    },
    {
        title: 'Evento Daily Raid: Invasão Saiyan',
        category: 'Evento',
        description:
            'Forme sua equipe e defenda a Terra contra a esquadra invasora em um raid diário com loot aprimorado.',
        date: 'Ontem',
    },
    {
        title: 'Sistema de Guildas Atualizado',
        category: 'Atualização',
        description:
            'Batalhas de guildas mais intensas, novos rankings de guerra e foco em estratégia por classes.',
        date: '2 dias atrás',
    },
];

export default function NewsFeed({ limit }) {
    const items = limit ? newsItems.slice(0, limit) : newsItems;

    return (
        <div className="grid gap-4 lg:grid-cols-3">
            {items.map((item) => (
                <article
                    key={item.title}
                    className="group relative overflow-hidden rounded-[10px] border border-line bg-gradient-to-br from-ember to-ember-2 p-6 transition duration-300 hover:-translate-y-1 hover:border-ki-orange/30"
                >
                    <span className="absolute inset-y-0 left-0 w-[3px] bg-ki-orange" />
                    <div className="flex items-center justify-between gap-3">
                        <span
                            className={`rounded-sm px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.14em] ${
                                BADGE_STYLE[item.category] ?? 'bg-kame-blue text-void'
                            }`}
                        >
                            {item.category}
                        </span>
                        <span className="text-[11px] font-mono text-ash">{item.date}</span>
                    </div>
                    <h3 className="mt-4 text-lg font-extrabold text-parchment">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ash">{item.description}</p>
                    <div className="mt-5 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-ki-orange">
                        Ver detalhes <span aria-hidden="true">→</span>
                    </div>
                </article>
            ))}
        </div>
    );
}
