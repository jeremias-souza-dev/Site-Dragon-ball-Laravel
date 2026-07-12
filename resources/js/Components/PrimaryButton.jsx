export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center gap-1.5 rounded-xl border border-transparent bg-gradient-to-b from-ki-orange to-ki-orange-dim px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-void shadow-[0_12px_28px_rgba(255,106,31,0.32)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_rgba(255,106,31,0.42)] focus:outline-none focus:ring-2 focus:ring-ki-orange/40 focus:ring-offset-2 focus:ring-offset-void ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
