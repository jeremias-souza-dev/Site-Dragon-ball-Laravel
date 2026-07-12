import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Search } from 'lucide-react';

export default function CharacterQuickSearch() {
    const [name, setName] = useState('');

    const submit = (e) => {
        e.preventDefault();
        router.visit(route('characters.index', name ? { q: name } : {}));
    };

    return (
        <form onSubmit={submit} className="rounded-2xl border border-line bg-ember p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ash">
                Buscar personagem
            </p>
            <div className="relative mt-3">
                <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ash" />
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Digite um nome..."
                    className="w-full rounded-xl border border-white/10 bg-void py-2.5 pl-10 pr-4 text-sm text-parchment outline-none placeholder:text-ash focus:border-ki-orange focus:ring-2 focus:ring-ki-orange/15"
                />
            </div>
        </form>
    );
}
