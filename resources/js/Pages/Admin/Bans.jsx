import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminBans() {
    return (
        <>
            <Head title="Admin · Banimentos" />

            <div className="rounded-2xl border border-line bg-ember p-6">
                <h2 className="font-display text-lg text-parchment">Contas banidas</h2>
                <p className="mt-2 text-sm text-ash">
                    Listagem de banimentos ativos, com motivo, duração e opção de
                    revogar.
                </p>
            </div>
        </>
    );
}

AdminBans.layout = (page) => <AdminLayout title="Banimentos" children={page} />;
