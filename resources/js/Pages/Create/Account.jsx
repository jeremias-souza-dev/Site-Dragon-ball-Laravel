import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Account({ isAuthenticated }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        nickname: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Criar conta" />

            <section className="auth-panel p-6 sm:p-8">
                <span className="auth-kicker">Cadastro</span>
                <h1 className="auth-title mt-4 text-2xl sm:text-3xl">Crie sua conta</h1>
                <p className="auth-copy mt-2 text-sm">
                    {isAuthenticated
                        ? 'Sua conta Google já está conectada. Agora crie a senha do jogo para continuar.'
                        : 'Leva menos de um minuto. Depois disso você cria seu personagem para começar a jogar.'}
                </p>

                <form onSubmit={submit} className="mt-6 space-y-8">
                    <div>
                        <h2 className="text-sm font-semibold uppercase tracking-wide text-ki-orange">
                            Informações da conta
                        </h2>

                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <div>
                                <InputLabel htmlFor="name" value="Login" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1.5"
                                    autoComplete="username"
                                    isFocused={true}
                                    placeholder="Nome da Conta"
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="nickname" value="Nickname" />
                                <TextInput
                                    id="nickname"
                                    name="nickname"
                                    value={data.nickname}
                                    className="mt-1.5"
                                    placeholder="Como quer ser chamado"
                                    onChange={(e) => setData('nickname', e.target.value)}
                                    required
                                />
                                <InputError message={errors.nickname} className="mt-2" />
                            </div>

                            {!isAuthenticated && (
                                <div className="sm:col-span-2">
                                    <InputLabel htmlFor="email" value="E-mail" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1.5"
                                        autoComplete="email"
                                        placeholder="seuemail@exemplo.com"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>
                            )}

                            <div>
                                <InputLabel htmlFor="password" value="Senha" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1.5"
                                    autoComplete="new-password"
                                    placeholder="Sua senha"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirmar senha"
                                />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1.5"
                                    autoComplete="new-password"
                                    placeholder="Repita a senha"
                                    onChange={(e) =>
                                        setData('password_confirmation', e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    <PrimaryButton className="w-full justify-center py-3" disabled={processing}>
                        Criar conta
                    </PrimaryButton>
                </form>

                {!isAuthenticated && (
                    <>
                        <div className="mt-6 flex items-center gap-3">
                            <span className="h-px flex-1 bg-white/10" />
                            <span className="text-xs uppercase tracking-wide text-ash">ou</span>
                            <span className="h-px flex-1 bg-white/10" />
                        </div>

                        <a
                            href={route('auth.google')}
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    fill="#4285F4"
                                    d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v2.98h3.89c2.28-2.1 3.53-5.19 3.53-8.8z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M12 24c3.24 0 5.95-1.08 7.93-2.93l-3.89-2.98c-1.08.72-2.45 1.15-4.04 1.15-3.11 0-5.74-2.1-6.68-4.92H1.29v3.09C3.26 21.3 7.31 24 12 24z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M5.32 14.32A7.19 7.19 0 0 1 4.94 12c0-.81.14-1.6.38-2.32V6.59H1.29A11.98 11.98 0 0 0 0 12c0 1.94.46 3.77 1.29 5.41z"
                                />
                                <path
                                    fill="#EA4335"
                                    d="M12 4.75c1.76 0 3.34.61 4.59 1.8l3.44-3.44C17.94 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.59l4.03 3.09c.94-2.82 3.57-4.93 6.68-4.93z"
                                />
                            </svg>
                            Continuar com Google
                        </a>
                        <p className="mt-2 text-center text-xs text-ash">
                            Com o Google você completa os dados da conta no próximo passo.
                        </p>

                        <p className="mt-6 text-center text-sm text-ash">
                            Já tem conta?{' '}
                            <Link href={route('login')} className="auth-link">
                                Entrar
                            </Link>
                        </p>
                    </>
                )}
            </section>
        </>
    );
}

Account.layout = (page) => <AuthLayout children={page} maxWidth="max-w-2xl" />;
