import { Link } from '@inertiajs/react';
import { LogIn, UserPlus } from 'lucide-react';

export default function Topbar() {
    return (
        <header className="topbar">
            <Link href={route('home')} className="brand">
                <span className="brand-mark" />
                <span className="brand-name">
                    Dragon Ball <span className="text-ki-orange">War</span>
                </span>
            </Link>

            <div className="flex items-center gap-2">
                <Link href={route('login')} className="btn btn-ghost">
                    <LogIn size={14} />
                    Entrar
                </Link>
                <Link href={route('register')} className="btn btn-solid">
                    <UserPlus size={14} />
                    Criar Conta
                </Link>
            </div>
        </header>
    );
}
