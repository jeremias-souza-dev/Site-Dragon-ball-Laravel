import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function ChatTest({ players }) {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [playerId, setPlayerId] = useState(players[0]?.id ?? '');
    const [error, setError] = useState(null);
    const lastIdRef = useRef(0);
    const listRef = useRef(null);

    useEffect(() => {
        let cancelled = false;

        async function poll() {
            try {
                const { data } = await window.axios.get(route('chat.index'), {
                    params: { since_id: lastIdRef.current },
                });

                if (cancelled || data.messages.length === 0) {
                    return;
                }

                lastIdRef.current = data.messages[data.messages.length - 1].id;
                setMessages((current) => [...current, ...data.messages]);
            } catch {
                // silencioso: apenas um teste, tenta de novo no proximo tick
            }
        }

        poll();
        const interval = setInterval(poll, 2000);
        return () => {
            cancelled = true;
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        listRef.current?.scrollTo(0, listRef.current.scrollHeight);
    }, [messages]);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);

        if (!text.trim() || !playerId) {
            return;
        }

        try {
            await window.axios.post(route('chat.store'), {
                player_id: playerId,
                message: text,
            });
            setText('');
        } catch (err) {
            setError(err.response?.data?.message ?? 'Falha ao enviar mensagem.');
        }
    }

    return (
        <>
            <Head title="Teste de Chat" />

            <main className="mx-auto max-w-2xl px-4 py-16">
                <h1 className="font-display text-3xl text-parchment">Chat (teste) — canal Site</h1>
                <p className="mt-2 text-sm text-ash">
                    Mensagens enviadas aqui aparecem no canal "Site" do jogo via <code>chatbridge.lua</code>. Qualquer
                    mensagem falada nesse canal no jogo aparece aqui automaticamente.
                </p>

                <div ref={listRef} className="mt-6 h-96 space-y-2 overflow-y-auto rounded-2xl border border-line bg-ember/30 p-4">
                    {messages.length === 0 && (
                        <p className="text-sm text-ash">Nenhuma mensagem ainda.</p>
                    )}
                    {messages.map((m) => (
                        <div key={m.id} className="text-sm">
                            <span className={m.source === 'game' ? 'text-kame-blue' : 'text-ki-orange'}>
                                {m.author_name}
                            </span>
                            <span className="text-ash"> ({m.source}): </span>
                            <span className="text-parchment">{m.message}</span>
                        </div>
                    ))}
                </div>

                {error && <p className="mt-2 text-sm text-red-400">{error}</p>}

                <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
                    {players.length > 1 && (
                        <select
                            value={playerId}
                            onChange={(e) => setPlayerId(e.target.value)}
                            className="rounded-xl border border-line bg-ember px-3 py-2 text-sm text-parchment"
                        >
                            {players.map((p) => (
                                <option key={p.id} value={p.id}>{p.name}</option>
                            ))}
                        </select>
                    )}
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        maxLength={255}
                        placeholder="Digite uma mensagem..."
                        className="flex-1 rounded-xl border border-line bg-ember px-4 py-2 text-sm text-parchment placeholder:text-ash"
                    />
                    <button type="submit" className="btn btn-solid px-6 py-2">Enviar</button>
                </form>
            </main>
        </>
    );
}

ChatTest.layout = (page) => <PublicLayout children={page} />;
