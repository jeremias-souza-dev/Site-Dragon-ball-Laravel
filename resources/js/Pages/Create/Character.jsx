import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import AuthLayout from '@/Layouts/AuthLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Character({ vocations, cities, worlds }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        character_name: '',
        sex: '1',
        vocation: '',
        town_id: '',
        world_id: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('onboarding.store'), {
            onFinish: () => reset(),
        });
    };

    return (
        <>
            <Head title="Crie seu personagem" />

            <section className="auth-panel p-6 sm:p-8">
                <span className="auth-kicker">Falta pouco</span>
                <h1 className="auth-title mt-4 text-2xl sm:text-3xl">Crie seu personagem</h1>
                <p className="auth-copy mt-2 text-sm">
                    Sua conta já está pronta. Agora crie o seu personagem para começar a jogar.
                </p>

                <form onSubmit={submit} className="mt-6 space-y-8">
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
                                    isFocused={true}
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
                        Criar personagem
                    </PrimaryButton>
                </form>
            </section>
        </>
    );
}

Character.layout = (page) => <AuthLayout children={page} maxWidth="max-w-2xl" />;
