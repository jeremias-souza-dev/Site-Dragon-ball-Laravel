export default function DangerButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-xl border border-transparent bg-danger px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-parchment transition-all duration-150 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-danger/50 focus:ring-offset-2 focus:ring-offset-void ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
