import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <>
            <Head title="Meu perfil" />

            <div className="mx-auto max-w-3xl space-y-6 px-4 py-12 sm:px-6">
                <h1 className="font-display text-2xl text-parchment">Meu perfil</h1>

                <div className="rounded-2xl border border-line bg-ember p-4 sm:p-8">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        className="max-w-xl"
                    />
                </div>

                <div className="rounded-2xl border border-line bg-ember p-4 sm:p-8">
                    <UpdatePasswordForm className="max-w-xl" />
                </div>

                <div className="rounded-2xl border border-danger/30 bg-ember p-4 sm:p-8">
                    <DeleteUserForm className="max-w-xl" />
                </div>
            </div>
        </>
    );
}

Edit.layout = (page) => <PublicLayout children={page} />;
