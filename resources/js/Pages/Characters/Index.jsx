import { useMemo, useState } from 'react';
import { Head } from '@inertiajs/react';
import { Search, X, Shield, Activity, Award, User } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';

const RACES = ['Todas', 'Saiyajin', 'Namekuseijin', 'Terráqueo', 'Androide', 'Majin'];

const RACE_COLOR = {
    Saiyajin: 'bg-ki-orange',
    Namekuseijin: 'bg-good',
    Terráqueo: 'bg-kame-blue',
    Androide: 'bg-ash',
    Majin: 'bg-danger',
};

const getRaceImage = (race) => {
    const images = {
        Saiyajin: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=200',
        Namekuseijin: 'https://images.unsplash.com/photo-1634612301347-1f4803932e67?q=80&w=200',
        Terráqueo: 'https://images.unsplash.com/photo-1544376798-89aa6b82c0cd?q=80&w=200',
        Androide: 'https://images.unsplash.com/photo-1635322967690-34190141361c?q=80&w=200',
        Majin: 'https://images.unsplash.com/photo-1614728853356-119106093864?q=80&w=200',
    };
    return images[race] || 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=200';
};

const CHARACTERS = [
    { name: 'Kaelthorn', level: 412, race: 'Saiyajin', guild: 'Guerreiros Z', online: true },
    { name: 'Vyrune', level: 398, race: 'Namekuseijin', guild: 'Guerreiros Z', online: true },
    { name: 'Zhaelis', level: 385, race: 'Majin', guild: 'Legião Vegeta', online: false },
    { name: 'Torreck', level: 371, race: 'Terráqueo', guild: 'Legião Vegeta', online: true },
    { name: 'Nissenka', level: 366, race: 'Androide', guild: '—', online: false },
    { name: 'Bralkor', level: 340, race: 'Saiyajin', guild: 'Ordem Namek', online: false },
];

export default function CharactersIndex() {
    const [search, setSearch] = useState('');
    const [selectedChar, setSelectedChar] = useState(null);

    const results = useMemo(() => 
        CHARACTERS.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())),
    [search]);

    return (
        <>
            <Head title="Personagens" />

            <div className="mx-auto max-w-5xl px-4 py-12">
                <div className="mb-12 text-center">
                    <h1 className="font-display text-5xl text-parchment font-normal tracking-tight">Galeria de Guerreiros</h1>
                    <p className="mt-4 text-ash font-light text-lg">Explore os combatentes mais poderosos que habitam Terra.</p>
                </div>

                <div className="relative group max-w-xl mx-auto mb-12">
                    <div className="absolute inset-0 bg-ki-orange/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Search className="absolute left-4 top-3.5 text-ash" size={16} />
                    <input
                        type="text"
                        placeholder="Filtrar por nome..."
                        className="w-full rounded-2xl border border-line bg-ember py-3.5 pl-12 pr-4 text-parchment outline-none focus:border-ki-orange shadow-inner"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map((c) => (
                        <button 
                            key={c.name} 
                            onClick={() => setSelectedChar(c)}
                            className="flex items-center gap-4 p-4 rounded-2xl border border-line bg-ember hover:border-ki-orange/50 transition-all duration-300 hover:scale-[1.02] text-left"
                        >
                            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-line bg-void">
                                <img src={getRaceImage(c.race)} className="h-full w-full object-cover opacity-90" />
                            </div>
                            <div>
                                <div className="text-parchment text-lg font-normal tracking-wide">{c.name}</div>
                                <div className="mt-1 flex items-center gap-3 text-[10px] text-ash tracking-widest uppercase">
                                    <span className="flex items-center gap-1"><User size={10} /> {c.race}</span>
                                    <span className="text-ki-orange font-mono">LVL {c.level}</span>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {selectedChar && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/90 backdrop-blur-md">
                    <div className="w-full max-w-sm rounded-[32px] border border-line bg-ember p-8 shadow-2xl relative overflow-hidden">
                        <button onClick={() => setSelectedChar(null)} className="absolute top-6 right-6 text-ash hover:text-parchment transition">
                            <X size={24} />
                        </button>
                        
                        <div className="h-48 w-full overflow-hidden rounded-3xl border border-line mb-6">
                            <img src={getRaceImage(selectedChar.race)} className="h-full w-full object-cover" />
                        </div>
                        
                        <h2 className="text-4xl text-parchment font-normal mb-6">{selectedChar.name}</h2>
                        
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-ash font-light">
                                <Award size={18} className="text-ki-orange" />
                                <span>Nível <strong className="text-parchment font-normal">{selectedChar.level}</strong></span>
                            </div>
                            <div className="flex items-center gap-3 text-ash font-light">
                                <Shield size={18} className="text-kame-blue" />
                                <span>Guilda <strong className="text-parchment font-normal">{selectedChar.guild}</strong></span>
                            </div>
                            <div className="flex items-center gap-3 text-ash font-light">
                                <Activity size={18} className="text-good" />
                                <span>Status <strong className={selectedChar.online ? 'text-good' : 'text-ash'}>{selectedChar.online ? 'Online' : 'Offline'}</strong></span>
                            </div>
                        </div>

                        <button 
                            className="mt-8 w-full py-4 rounded-2xl bg-ki-orange text-void font-medium hover:bg-saiyan-gold transition"
                            onClick={() => setSelectedChar(null)}
                        >
                            Fechar Ficha
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

CharactersIndex.layout = (page) => <PublicLayout children={page} />;