import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page = 1, totalPages = 1, onChange }) {
    if (totalPages <= 1) return null;

    return (
        <div className="mt-6 flex items-center justify-center gap-1.5">
            <button
                type="button"
                disabled={page === 1}
                onClick={() => onChange(page - 1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-ash transition hover:text-parchment disabled:opacity-30"
                aria-label="Página anterior"
            >
                <ChevronLeft size={14} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                    key={p}
                    type="button"
                    onClick={() => onChange(p)}
                    className={`h-8 min-w-8 rounded-lg px-2 font-mono text-xs font-semibold transition ${
                        p === page
                            ? 'bg-ki-orange text-void'
                            : 'text-ash hover:bg-white/5 hover:text-parchment'
                    }`}
                >
                    {p}
                </button>
            ))}

            <button
                type="button"
                disabled={page === totalPages}
                onClick={() => onChange(page + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-ash transition hover:text-parchment disabled:opacity-30"
                aria-label="Próxima página"
            >
                <ChevronRight size={14} />
            </button>
        </div>
    );
}
