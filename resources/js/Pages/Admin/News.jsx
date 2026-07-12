import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminNews() {
    return (
        <>
            <Head title="Admin · Notícias" />

            <div className="rounded-2xl border border-line bg-ember p-6">
                <h2 className="font-display text-lg text-parchment">Publicar notícias</h2>
                <p className="mt-2 text-sm text-ash">
                    Formulário de criação/edição das notícias que aparecem no feed
                    da home pública.
                </p>
            </div>
        </>
    );
}

AdminNews.layout = (page) => <AdminLayout title="Notícias" children={page} />;
