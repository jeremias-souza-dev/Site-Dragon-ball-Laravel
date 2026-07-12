import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Entrar" />

            <section className="auth-panel p-6 sm:p-8">
                <span className="auth-kicker">Acesso</span>
                <h1 className="auth-title mt-4 text-2xl sm:text-3xl">Entre na sua conta</h1>
                <p className="auth-copy mt-2 text-sm">
                    Use o e-mail e senha da sua conta do servidor.
                </p>

                {status && (
                    <div className="mt-4 rounded-xl bg-good/10 p-3 text-sm font-semibold text-good">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="mt-6 space-y-4">
                    <div>
                        <InputLabel htmlFor="email" value="E-mail" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1.5"
                            autoComplete="username"
                            isFocused={true}
                            placeholder="seuemail@exemplo.com"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Senha" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1.5"
                            autoComplete="current-password"
                            placeholder="Sua senha"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span className="text-sm text-ash">Lembrar-me</span>
                        </label>

                        {canResetPassword && (
                            <Link href={route('password.request')} className="auth-link text-sm">
                                Esqueceu a senha?
                            </Link>
                        )}
                    </div>

                    <PrimaryButton className="w-full justify-center py-3" disabled={processing}>
                        Entrar
                    </PrimaryButton>
                </form>

                <p className="mt-6 text-center text-sm text-ash">
                    Ainda não tem conta?{' '}
                    <Link href={route('register')} className="auth-link">
                        Criar conta
                    </Link>
                </p>
            </section>
        </>
    );
}

Login.layout = (page) => <AuthLayout children={page} />;
