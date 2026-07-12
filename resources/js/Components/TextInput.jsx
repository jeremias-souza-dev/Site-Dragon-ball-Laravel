import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                'w-full rounded-xl border border-white/10 bg-void/60 px-4 py-2.5 text-parchment shadow-sm outline-none transition duration-150 ease-in-out placeholder:text-ash focus:border-ki-orange focus:ring-2 focus:ring-ki-orange/15 ' +
                className
            }
            ref={localRef}
        />
    );
});
