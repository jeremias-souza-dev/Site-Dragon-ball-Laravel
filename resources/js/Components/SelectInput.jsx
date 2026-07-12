import { forwardRef } from 'react';

export default forwardRef(function SelectInput({ className = '', children, ...props }, ref) {
    return (
        <select
            {...props}
            className={
                'w-full rounded-xl border border-white/10 bg-void/60 px-4 py-2.5 text-parchment shadow-sm outline-none transition duration-150 ease-in-out focus:border-ki-orange focus:ring-2 focus:ring-ki-orange/15 ' +
                className
            }
            ref={ref}
        >
            {children}
        </select>
    );
});
