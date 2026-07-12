import { useState } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';

const CATEGORIES = ['Todas', 'Atualização', 'Evento', 'Boss'];

const BADGE_STYLE = {
    Atualização: 'bg-kame-blue text-void',
    Evento: 'bg-saiyan-gold text-void',
    Boss: 'bg-danger text-parchment',
};

const NEWS = [
    {
        title: 'Patch 1.4 — Sistema de Guild Wars revisado',
        category: 'Atualização',
        date: '11 Jul 2026',
        excerpt:
            'Rebalanceamos o custo de declaração de guerra, adicionamos zonas neutras na Ilha do Papaya e corrigimos o bug de invulnerabilidade ao trocar de forma durante o combate.',
    },
    {
        title: 'Fim de semana Saiyajin: EXP em dobro até domingo',
        category: 'Evento',
        date: '08 Jul 2026',
        excerpt:
            'De sexta 18h até domingo 23h59, toda experiência ganha em Namekusei e no Planeta Vegeta é dobrada.',
    },
    {
        title: 'Freeza (Forma Final) liberado na Ilha Deserta',
        category: 'Boss',
        date: '03 Jul 2026',
        excerpt:
            'Nova raid semanal para grupos de 5 a 10 jogadores nível 350+. Drop garantido de fragmento de Dragon Ball.',
    },
    {
        title: 'Correção de bug: teleporte da Torre de Karin',
        category: 'Atualização',
        date: '29 Jun 2026',
        excerpt:
            'Corrigido o teleporte que prendia personagens no segundo andar da Torre de Karin após reconexão.',
    },
    {
        title: 'Evento especial: Torneio de Artes Marciais',
        category: 'Evento',
        date: '22 Jun 2026',
        excerpt:
            'Inscrições abertas até sexta. Chaveamento eliminatório 1x1, premiação em premium points pros 3 primeiros colocados.',
    },
    {
        title: 'Cell (Segunda Forma) agora ronda a Zona Leste',
        category: 'Boss',
        date: '15 Jun 2026',
        excerpt:
            'Boss de campo com spawn a cada 6 horas. Cuidado: absorve energia de jogadores próximos.',
    },
    {
        title: 'Nova vocação: Fusão liberada no nível 250',
        category: 'Atualização',
        date: '08 Jun 2026',
        excerpt:
            'Personagens level 250+ podem realizar a fusão Potara com outro jogador da mesma raça por tempo limitado em combate.',
    },
    {
        title: 'Manutenção programada — 2 de junho',
        category: 'Atualização',
        date: '01 Jun 2026',
        excerpt:
            'Servidor ficará offline por aproximadamente 1 hora para aplicação de melhorias de performance.',
    },
];

export default function NewsIndex() {
    const [filter, setFilter] = useState('Todas');

    const filtered = filter === 'Todas' ? NEWS : NEWS.filter((n) => n.category === filter);

    return (
        <>
            <Head title="Novidades" />

            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
                <PageHeader
                    kicker="// Feed de notícias"
                    title="Novidades"
                    description="Atualizações, eventos e bosses liberados no servidor."
                />

                <div className="mt-6 flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            type="button"
                            onClick={() => setFilter(cat)}
                            className={`rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide transition-colors ${
                                filter === cat
                                    ? 'bg-ki-orange text-void'
                                    : 'bg-ember text-ash hover:text-parchment'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="mt-8 space-y-4">
                    {filtered.map((item) => (
                        <article
                            key={item.title}
                            className="relative overflow-hidden rounded-2xl border border-line bg-ember p-6 transition hover:border-ki-orange/30"
                        >
                            <span className="absolute inset-y-0 left-0 w-[3px] bg-ki-orange" />
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <span
                                    className={`rounded-sm px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.14em] ${BADGE_STYLE[item.category]}`}
                                >
                                    {item.category}
                                </span>
                                <span className="text-[11px] font-mono text-ash">{item.date}</span>
                            </div>
                            <h2 className="mt-4 text-lg font-extrabold text-parchment">
                                {item.title}
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-ash">{item.excerpt}</p>
                        </article>
                    ))}

                    {filtered.length === 0 && (
                        <p className="py-12 text-center text-sm text-ash">
                            Nenhuma notícia nessa categoria ainda.
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}

NewsIndex.layout = (page) => <PublicLayout children={page} />;
