import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ vocations, cities, worlds }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        nickname: '',
        password: '',
        password_confirmation: '',
        character_name: '',
        sex: '1',
        vocation: '',
        town_id: '',
        world_id: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('onboarding.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Complete seu cadastro" />

            <section className="auth-panel p-6 sm:p-8">
                <span className="auth-kicker">Falta pouco</span>
                <h1 className="auth-title mt-4 text-2xl sm:text-3xl">Complete seu cadastro</h1>
                <p className="auth-copy mt-2 text-sm">
                    Sua conta Google já está conectada. Agora crie a senha do jogo e o seu
                    personagem para começar a jogar.
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
                                    placeholder="nome_da_conta"
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

                            <div>
                                <InputLabel htmlFor="password" value="Senha do jogo" />
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

                    <div>
                        <h2 className="text-sm font-semibold uppercase tracking-wide text-ki-orange">
                            Informações do personagem
                        </h2>

                        <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <InputLabel htmlFor="character_name" value="Nick do personagem" />
                                <TextInput
                                    id="character_name"
                                    name="character_name"
                                    value={data.character_name}
                                    className="mt-1.5"
                                    placeholder="Nome do personagem"
                                    onChange={(e) => setData('character_name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.character_name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="sex" value="Sexo" />
                                <SelectInput
                                    id="sex"
                                    name="sex"
                                    value={data.sex}
                                    className="mt-1.5"
                                    onChange={(e) => setData('sex', e.target.value)}
                                    required
                                >
                                    <option value="1">Masculino</option>
                                    <option value="0">Feminino</option>
                                </SelectInput>
                                <InputError message={errors.sex} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="vocation" value="Escolha vocação" />
                                <SelectInput
                                    id="vocation"
                                    name="vocation"
                                    value={data.vocation}
                                    className="mt-1.5"
                                    onChange={(e) => setData('vocation', e.target.value)}
                                    required
                                >
                                    <option value="" disabled>
                                        Selecione
                                    </option>
                                    {Object.entries(vocations).map(([id, label]) => (
                                        <option key={id} value={id}>
                                            {label}
                                        </option>
                                    ))}
                                </SelectInput>
                                <InputError message={errors.vocation} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="town_id" value="Cidade" />
                                <SelectInput
                                    id="town_id"
                                    name="town_id"
                                    value={data.town_id}
                                    className="mt-1.5"
                                    onChange={(e) => setData('town_id', e.target.value)}
                                    required
                                >
                                    <option value="" disabled>
                                        Selecione
                                    </option>
                                    {Object.entries(cities).map(([id, label]) => (
                                        <option key={id} value={id}>
                                            {label}
                                        </option>
                                    ))}
                                </SelectInput>
                                <InputError message={errors.town_id} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="world_id" value="Mundo" />
                                <SelectInput
                                    id="world_id"
                                    name="world_id"
                                    value={data.world_id}
                                    className="mt-1.5"
                                    onChange={(e) => setData('world_id', e.target.value)}
                                    required
                                >
                                    <option value="" disabled>
                                        Selecione
                                    </option>
                                    {Object.entries(worlds).map(([id, label]) => (
                                        <option key={id} value={id}>
                                            {label}
                                        </option>
                                    ))}
                                </SelectInput>
                                <InputError message={errors.world_id} className="mt-2" />
                            </div>
                        </div>
                    </div>

                    <PrimaryButton className="w-full justify-center py-3" disabled={processing}>
                        Concluir cadastro
                    </PrimaryButton>
                </form>
            </section>
        </>
    );
}

Create.layout = (page) => <AuthLayout children={page} maxWidth="max-w-2xl" />;
