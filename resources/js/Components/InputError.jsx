export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            className={'text-sm font-semibold text-danger ' + className}
        >
            {message}
        </p>
    ) : null;
}
