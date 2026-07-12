import { Head } from '@inertiajs/react';
import { MessageCircle, ShieldCheck, Trophy, Users } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';
import StatStrip from '@/Components/StatStrip';

const STAFF = [
    { name: 'ITALOx', role: 'Administrador' },
    { name: 'Kaelthorn', role: 'Game Master' },
    { name: 'Fyorra', role: 'Suporte' },
];

const RULES = [
    'Respeite todos os jogadores e a equipe.',
    'Proibido divulgar outros servidores.',
    'Sem spam ou flood nos canais.',
    'Bugs devem ser reportados no canal #bugs, não explorados.',
];

const ACTIVITY = [
    { text: 'Vyrune derrotou o boss Freeza (Forma Final)', time: '2 min atrás' },
    { text: 'Guerreiros Z venceu a guerra contra Ordem Namek', time: '18 min atrás' },
    { text: 'Corvain alcançou o nível 250', time: '41 min atrás' },
    { text: 'Nova guilda registrada: Renegados de Namekusei', time: '1h atrás' },
];

export default function DiscordIndex() {
    const stats = [
        { label: 'Membros', value: '1.842' },
        { label: 'Online agora', value: '128' },
        { label: 'Canais', value: '24' },
    ];

    return (
        <>
            <Head title="Discord" />

            <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
                <PageHeader
                    kicker="// Comunidade"
                    title="Discord"
                    description="Anúncios em tempo real, organização de raids e suporte direto com a equipe."
                />

                <StatStrip stats={stats} />

                <div className="mt-6 rounded-2xl border border-line bg-gradient-to-br from-ember to-ember-2 p-8 text-center">
                    <MessageCircle size={32} className="mx-auto text-ki-orange" />
                    <a href="#" className="btn btn-solid mt-5 inline-flex py-3 px-6">
                        Entrar no servidor
                    </a>
                </div>

                <div className="mt-8 rounded-2xl border border-line bg-ember p-6">
                    <h2 className="flex items-center gap-2 font-display text-lg text-parchment">
                        <Trophy size={16} className="text-saiyan-gold" />
                        Atividade recente
                    </h2>
                    <ul className="mt-3 space-y-3">
                        {ACTIVITY.map((item) => (
                            <li key={item.text} className="flex items-center justify-between gap-3 text-sm">
                                <span className="text-parchment">{item.text}</span>
                                <span className="shrink-0 font-mono text-xs text-ash">{item.time}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-line bg-ember p-6">
                        <h2 className="flex items-center gap-2 font-display text-lg text-parchment">
                            <ShieldCheck size={16} className="text-kame-blue" />
                            Regras
                        </h2>
                        <ul className="mt-3 space-y-2 text-sm text-ash">
                            {RULES.map((rule) => (
                                <li key={rule} className="flex gap-2">
                                    <span className="text-ki-orange">•</span>
                                    {rule}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-2xl border border-line bg-ember p-6">
                        <h2 className="font-display text-lg text-parchment">Equipe</h2>
                        <ul className="mt-3 space-y-3">
                            {STAFF.map((member) => (
                                <li key={member.name} className="flex items-center justify-between text-sm">
                                    <span className="font-bold text-parchment">{member.name}</span>
                                    <span className="text-xs font-mono uppercase text-ash">{member.role}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

DiscordIndex.layout = (page) => <PublicLayout children={page} />;
