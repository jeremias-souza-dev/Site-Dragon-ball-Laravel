import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminAccounts() {
    return (
        <>
            <Head title="Admin · Contas" />

            <div className="rounded-2xl border border-line bg-ember p-6">
                <h2 className="font-display text-lg text-parchment">Gestão de contas</h2>
                <p className="mt-2 text-sm text-ash">
                    Aqui entra a listagem/busca de contas (accounts), com ações de
                    editar, banir e ver personagens vinculados — assim que o CRUD
                    for conectado ao banco.
                </p>
            </div>
        </>
    );
}

AdminAccounts.layout = (page) => <AdminLayout title="Contas" children={page} />;
