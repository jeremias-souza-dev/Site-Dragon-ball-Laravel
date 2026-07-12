import { useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import StatStrip from '@/Components/StatStrip';
import Pagination from '@/Components/Pagination';
import { Calendar, Tag } from 'lucide-react';

const CATEGORIES = ['Todas', 'Atualização', 'Evento', 'Boss'];
const PER_PAGE = 5;

// Mock de imagens via Unsplash com foco em texturas e tons de cyber/dark
const getMockImg = (category) => {
    const images = {
        'Atualização': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800',
        'Evento': 'https://images.unsplash.com/photo-1514525253343-7f61b0337c89?q=80&w=800',
        'Boss': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800',
    };
    return images[category] || 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=800';
};

const NEWS = [
    { title: 'Patch 1.4 — Sistema de Guild Wars revisado', category: 'Atualização', date: '11 Jul 2026', excerpt: 'Rebalanceamos o custo de declaração de guerra, adicionamos zonas neutras na Ilha do Papaya e corrigimos o bug de invulnerabilidade ao trocar de forma durante o combate.' },
    { title: 'Fim de semana Saiyajin: EXP em dobro até domingo', category: 'Evento', date: '08 Jul 2026', excerpt: 'De sexta 18h até domingo 23h59, toda experiência ganha em Namekusei e no Planeta Vegeta é dobrada.' },
    { title: 'Freeza (Forma Final) liberado na Ilha Deserta', category: 'Boss', date: '03 Jul 2026', excerpt: 'Nova raid semanal para grupos de 5 a 10 jogadores nível 350+. Drop garantido de fragmento de Dragon Ball.' },
    { title: 'Correção de bug: teleporte da Torre de Karin', category: 'Atualização', date: '29 Jun 2026', excerpt: 'Corrigido o teleporte que prendia personagens no segundo andar da Torre de Karin após reconexão.' },
    { title: 'Evento especial: Torneio de Artes Marciais', category: 'Evento', date: '22 Jun 2026', excerpt: 'Inscrições abertas até sexta. Chaveamento eliminatório 1x1, premiação em premium points pros 3 primeiros colocados.' },
];

export default function NewsIndex() {
    const [filter, setFilter] = useState('Todas');
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => 
        filter === 'Todas' ? NEWS : NEWS.filter((n) => n.category === filter),
    [filter]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    const visible = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    return (
        <>
            <Head title="Novidades" />

            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
                <PageHeader
                    kicker="// Feed de notícias"
                    title="Novidades"
                    description="Atualizações, eventos e bosses liberados no servidor."
                />

                <StatStrip stats={[
                    { label: 'Publicadas', value: NEWS.length },
                    { label: 'Eventos', value: NEWS.filter(n => n.category === 'Evento').length },
                    { label: 'Bosses', value: NEWS.filter(n => n.category === 'Boss').length },
                ]} />

                <div className="mt-10 flex gap-2 overflow-x-auto pb-4">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => { setFilter(cat); setPage(1); }}
                            className={`whitespace-nowrap rounded-full px-5 py-2 text-xs font-medium uppercase tracking-widest transition ${
                                filter === cat ? 'bg-ki-orange text-void' : 'bg-ember text-ash hover:bg-ember-hover'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="mt-8 grid gap-6">
                    {visible.map((item) => (
                        <article 
                            key={item.title}
                            className="flex flex-col overflow-hidden rounded-2xl border border-line bg-ember transition-all hover:border-ki-orange/30 lg:flex-row"
                        >
                            <div className="h-48 w-full shrink-0 overflow-hidden lg:w-64">
                                <img 
                                    src={getMockImg(item.category)} 
                                    alt={item.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <div className="flex flex-col p-6">
                                <div className="flex gap-4 text-[10px] font-medium uppercase tracking-widest text-ki-orange">
                                    <span className="flex items-center gap-1"><Tag size={12} /> {item.category}</span>
                                    <span className="flex items-center gap-1"><Calendar size={12} /> {item.date}</span>
                                </div>
                                <h2 className="mt-3 text-lg font-normal text-parchment leading-tight">
                                    {item.title}
                                </h2>
                                <p className="mt-2 text-sm leading-relaxed text-ash font-light">
                                    {item.excerpt}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-12">
                    <Pagination page={page} totalPages={totalPages} onChange={setPage} />
                </div>
            </div>
        </>
    );
}

NewsIndex.layout = (page) => <PublicLayout children={page} />;