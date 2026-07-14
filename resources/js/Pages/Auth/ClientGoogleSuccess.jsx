import AuthLayout from '@/Layouts/AuthLayout';
import { Head } from '@inertiajs/react';

export default function ClientGoogleSuccess({ accountName }) {
    return (
        <>
            <Head title="Login Autenticado" />

            <section className="auth-panel p-6 sm:p-8 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-good/20 rounded-full flex items-center justify-center text-good text-3xl animate-bounce">
                    ✓
                </div>

                <span className="auth-kicker mt-6 text-good font-semibold tracking-wider uppercase">Autenticado</span>
                <h1 className="auth-title mt-4 text-2xl sm:text-3xl text-white font-bold">Sucesso no Login Google!</h1>
                
                <div className="mt-6 p-5 bg-white/5 border border-white/10 rounded-2xl w-full text-center">
                    <p className="text-sm text-ash">Sua conta do jogo está pronta:</p>
                    <p className="text-xl font-bold text-ki-orange mt-1.5">{accountName}</p>
                </div>

                <p className="auth-copy mt-6 text-sm text-ash leading-relaxed">
                    A autenticação foi concluída com sucesso. Você pode fechar esta aba do navegador agora e retornar para o jogo. O seu cliente irá conectar automaticamente em alguns segundos.
                </p>
            </section>
        </>
    );
}

ClientGoogleSuccess.layout = (page) => <AuthLayout children={page} maxWidth="max-w-md" />;
