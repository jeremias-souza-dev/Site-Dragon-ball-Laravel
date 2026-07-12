export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center rounded-xl border border-line bg-transparent px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-parchment transition-all duration-150 hover:border-ki-orange hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-ki-orange/30 focus:ring-offset-2 focus:ring-offset-void disabled:opacity-25 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
