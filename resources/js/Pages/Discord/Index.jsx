import { Head } from '@inertiajs/react';
import { MessageCircle, ShieldCheck, Users } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';
import PageHeader from '@/Components/PageHeader';

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

export default function DiscordIndex() {
    return (
        <>
            <Head title="Discord" />

            <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
                <PageHeader
                    kicker="// Comunidade"
                    title="Discord"
                    description="Anúncios em tempo real, organização de raids e suporte direto com a equipe."
                />

                <div className="mt-8 rounded-2xl border border-line bg-gradient-to-br from-ember to-ember-2 p-8 text-center">
                    <MessageCircle size={32} className="mx-auto text-ki-orange" />
                    <p className="mt-4 flex items-center justify-center gap-1.5 font-mono text-sm text-ash">
                        <Users size={13} />
                        1.842 membros · 128 online agora
                    </p>
                    <a href="#" className="btn btn-solid mt-5 inline-flex py-3 px-6">
                        Entrar no servidor
                    </a>
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
