import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Flame, Gem, ShoppingCart } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import StatStrip from '@/Components/StatStrip';

const CATEGORIES = ['Todos', 'Bênçãos', 'Itens', 'Cosméticos', 'Montarias'];

const ITEMS = [
    { name: 'Bênção da Terra', category: 'Bênçãos', price: 120, desc: '+5% de proteção contra todos os elementos.' },
    { name: 'Bênção Saiyajin', category: 'Bênçãos', price: 150, desc: 'Reduz o tempo de recarga da transformação.' },
    { name: 'Esfera do Dragão (fragmento)', category: 'Itens', price: 300, desc: 'Colecione 7 para invocar Shenlong.', hot: true },
    { name: 'Poção de Ki Máximo', category: 'Itens', price: 60, desc: 'Restaura 100% do ki instantaneamente.', hot: true },
    { name: 'Aura Dourada', category: 'Cosméticos', price: 200, desc: 'Efeito visual permanente ao redor do personagem.' },
    { name: 'Skin Namekuseijin Ancestral', category: 'Cosméticos', price: 250, desc: 'Visual exclusivo, sem alterar atributos.' },
    { name: 'Nimbus Voador', category: 'Montarias', price: 400, desc: 'Montaria com +20% de velocidade de voo.' },
    { name: 'Dragão Shenlong (montaria)', category: 'Montarias', price: 900, desc: 'Montaria lendária, edição limitada.' },
];

export default function ShopIndex() {
    const [filter, setFilter] = useState('Todos');
    const balance = 480;

    const filtered = filter === 'Todos' ? ITEMS : ITEMS.filter((i) => i.category === filter);

    const stats = [
        { label: 'Itens à venda', value: ITEMS.length },
        { label: 'Seu saldo', value: `${balance} pts` },
        { label: 'Categorias', value: CATEGORIES.length - 1 },
    ];

    return (
        <>
            <Head title="Loja" />

            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
                <PageHeader
                    kicker="// Premium points"
                    title="Loja"
                    description="Itens exclusivos, cosméticos e montarias pra sua jornada."
                    action={
                        <div className="flex items-center gap-2 rounded-xl border border-line bg-ember px-4 py-2.5">
                            <Gem size={15} className="text-saiyan-gold" />
                            <span className="font-mono text-sm text-parchment">{balance} pts</span>
                        </div>
                    }
                />

                <StatStrip stats={stats} />

                <div className="mt-8 flex flex-wrap gap-2">
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

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((item) => (
                        <div
                            key={item.name}
                            className={`relative flex flex-col rounded-2xl border p-5 ${
                                item.hot ? 'border-ki-orange/40 bg-gradient-to-br from-ember to-ember-2' : 'border-line bg-ember'
                            }`}
                        >
                            {item.hot && (
                                <span className="absolute -top-2.5 right-4 inline-flex items-center gap-1 rounded-full bg-ki-orange px-2.5 py-1 text-[10px] font-mono font-bold uppercase text-void">
                                    <Flame size={10} />
                                    Mais vendido
                                </span>
                            )}
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wide text-kame-blue">
                                {item.category}
                            </span>
                            <h3 className="mt-2 text-base font-extrabold text-parchment">{item.name}</h3>
                            <p className="mt-1.5 flex-1 text-sm leading-6 text-ash">{item.desc}</p>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="flex items-center gap-1.5 font-mono text-sm text-saiyan-gold">
                                    <Gem size={13} />
                                    {item.price}
                                </span>
                                <button type="button" className="btn btn-solid py-1.5 px-3 text-[11px]">
                                    <ShoppingCart size={12} />
                                    Comprar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

ShopIndex.layout = (page) => <PublicLayout children={page} />;
