const INFO = [
    { label: 'Estado', value: 'Em produção' },
    { label: 'Jogadores online', value: '128' },
    { label: 'Contas', value: '3.412' },
    { label: 'Personagens', value: '5.980' },
    { label: 'Registro mais recente', value: 'Corvain' },
];

export default function ServerInfoPanel() {
    return (
        <div className="rounded-2xl border border-line bg-ember p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ash">
                Informações do servidor
            </p>
            <dl className="mt-3 space-y-2">
                {INFO.map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-sm">
                        <dt className="text-ash">{item.label}</dt>
                        <dd className="font-mono font-semibold text-parchment">{item.value}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
}
