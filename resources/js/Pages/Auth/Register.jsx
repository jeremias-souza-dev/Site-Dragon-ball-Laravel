import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
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
                    Leva menos de um minuto. Você já pode criar personagens depois.
                </p>

                <form onSubmit={submit} className="mt-6 space-y-4">
                    <div>
                        <InputLabel htmlFor="name" value="Nome da conta" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1.5"
                            autoComplete="name"
                            isFocused={true}
                            placeholder="nome_da_conta"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="E-mail" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1.5"
                            autoComplete="username"
                            placeholder="seuemail@exemplo.com"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
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

                    <PrimaryButton className="w-full justify-center py-3" disabled={processing}>
                        Criar conta
                    </PrimaryButton>
                </form>

                <p className="mt-6 text-center text-sm text-ash">
                    Já tem conta?{' '}
                    <Link href={route('login')} className="auth-link">
                        Entrar
                    </Link>
                </p>
            </section>
        </>
    );
}

Register.layout = (page) => <AuthLayout children={page} />;
