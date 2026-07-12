export default function PageHeader({ kicker, title, description, action }) {
    return (
        <div className="flex flex-col gap-4 border-b border-line pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-kame-blue">
                    {kicker}
                </p>
                <h1 className="mt-2 font-display text-3xl text-parchment sm:text-4xl">
                    {title}
                </h1>
                {description && (
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-ash">
                        {description}
                    </p>
                )}
            </div>
            {action}
        </div>
    );
}
