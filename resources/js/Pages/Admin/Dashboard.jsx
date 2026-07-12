import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

const STATS = [
    { label: 'Contas totais', value: '3.412' },
    { label: 'Online agora', value: '128' },
    { label: 'Personagens', value: '5.980' },
    { label: 'Banimentos ativos', value: '7' },
];

export default function AdminDashboard() {
    return (
        <>
            <Head title="Admin · Visão geral" />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {STATS.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-line bg-ember p-5">
                        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ash">
                            {stat.label}
                        </p>
                        <p className="mt-2 font-mono text-2xl text-parchment">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="mt-6 rounded-2xl border border-line bg-ember p-6">
                <h2 className="font-display text-lg text-parchment">Atividade recente</h2>
                <p className="mt-2 text-sm text-ash">
                    Nenhuma integração de dados ainda — esta é a estrutura do painel,
                    pronta para conectar nas tabelas reais (accounts, players, news,
                    bans) quando o backend estiver pronto.
                </p>
            </div>
        </>
    );
}

AdminDashboard.layout = (page) => <AdminLayout title="Visão geral" children={page} />;
