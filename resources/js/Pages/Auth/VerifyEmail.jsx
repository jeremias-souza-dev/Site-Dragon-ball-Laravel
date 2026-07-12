import PrimaryButton from '@/Components/PrimaryButton';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <>
            <Head title="Verificar e-mail" />

            <section className="auth-panel p-6 sm:p-8">
                <span className="auth-kicker">Quase lá</span>
                <h1 className="auth-title mt-4 text-2xl sm:text-3xl">Verifique seu e-mail</h1>
                <p className="auth-copy mt-2 text-sm">
                    Obrigado por se cadastrar! Antes de começar, clique no link que
                    enviamos pro seu e-mail. Não recebeu? A gente reenvia.
                </p>

                {status === 'verification-link-sent' && (
                    <div className="mt-4 rounded-xl bg-good/10 p-3 text-sm font-semibold text-good">
                        Um novo link de verificação foi enviado pro e-mail que você
                        cadastrou.
                    </div>
                )}

                <form onSubmit={submit} className="mt-6 flex items-center justify-between gap-4">
                    <PrimaryButton disabled={processing}>
                        Reenviar e-mail
                    </PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-sm font-semibold text-ash hover:text-ki-orange"
                    >
                        Sair
                    </Link>
                </form>
            </section>
        </>
    );
}

VerifyEmail.layout = (page) => <AuthLayout children={page} />;
