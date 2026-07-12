import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminSettings() {
    return (
        <>
            <Head title="Admin · Configurações" />

            <div className="rounded-2xl border border-line bg-ember p-6">
                <h2 className="font-display text-lg text-parchment">Configurações do servidor</h2>
                <p className="mt-2 text-sm text-ash">
                    MOTD, taxas de experiência, status do servidor e outras
                    configurações expostas ao painel.
                </p>
            </div>
        </>
    );
}

AdminSettings.layout = (page) => <AdminLayout title="Configurações" children={page} />;
