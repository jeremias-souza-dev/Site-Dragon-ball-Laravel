export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-line bg-void/60 text-ki-orange shadow-sm focus:ring-2 focus:ring-ki-orange/40 ' +
                className
            }
        />
    );
}
