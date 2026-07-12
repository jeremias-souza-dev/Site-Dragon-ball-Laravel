import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Confirmar senha" />

            <section className="auth-panel p-6 sm:p-8">
                <span className="auth-kicker">Área segura</span>
                <h1 className="auth-title mt-4 text-2xl sm:text-3xl">Confirme sua senha</h1>
                <p className="auth-copy mt-2 text-sm">
                    Por segurança, confirme sua senha antes de continuar.
                </p>

                <form onSubmit={submit} className="mt-6 space-y-4">
                    <div>
                        <InputLabel htmlFor="password" value="Senha" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1.5"
                            isFocused={true}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <PrimaryButton className="w-full justify-center py-3" disabled={processing}>
                        Confirmar
                    </PrimaryButton>
                </form>
            </section>
        </>
    );
}

ConfirmPassword.layout = (page) => <AuthLayout children={page} />;
