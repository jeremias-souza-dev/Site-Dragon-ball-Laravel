export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block text-[11px] font-bold uppercase tracking-wide text-ash ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
