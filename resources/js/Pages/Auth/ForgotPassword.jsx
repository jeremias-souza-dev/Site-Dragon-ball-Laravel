import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <>
            <Head title="Recuperar senha" />

            <section className="auth-panel p-6 sm:p-8">
                <span className="auth-kicker">Recuperação</span>
                <h1 className="auth-title mt-4 text-2xl sm:text-3xl">Esqueceu sua senha?</h1>
                <p className="auth-copy mt-2 text-sm">
                    Sem problemas. Informe seu e-mail e enviamos um link pra você
                    escolher uma senha nova.
                </p>

                {status && (
                    <div className="mt-4 rounded-xl bg-good/10 p-3 text-sm font-semibold text-good">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="mt-6 space-y-4">
                    <div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            placeholder="seuemail@exemplo.com"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <PrimaryButton className="w-full justify-center py-3" disabled={processing}>
                        Enviar link de recuperação
                    </PrimaryButton>
                </form>
            </section>
        </>
    );
}

ForgotPassword.layout = (page) => <AuthLayout children={page} />;
