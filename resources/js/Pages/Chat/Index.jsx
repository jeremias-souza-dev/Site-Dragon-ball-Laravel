import { useEffect, useMemo, useRef, useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Send, Users } from 'lucide-react';
import PublicLayout from '@/Layouts/PublicLayout';

function formatTime(iso) {
    if (!iso) return '';
    const date = new Date(iso);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export default function ChatIndex({ channels, characters, messages: initialMessages }) {
    const { auth } = usePage().props;
    const channelIds = useMemo(() => Object.keys(channels).map(Number), [channels]);

    const [activeChannel, setActiveChannel] = useState(channelIds[0]);
    const [messagesByChannel, setMessagesByChannel] = useState({
        [channelIds[0]]: initialMessages ?? [],
    });
    const [character, setCharacter] = useState(characters?.[0]?.name ?? '');
    const [draft, setDraft] = useState('');
    const [sending, setSending] = useState(false);
    const [error, setError] = useState(null);
    const scrollRef = useRef(null);

    const messages = messagesByChannel[activeChannel] ?? [];

    // Load history when switching to a channel we haven't fetched yet.
    useEffect(() => {
        if (messagesByChannel[activeChannel]) return;

        fetch(`/chat/history?channel_id=${activeChannel}`)
            .then((res) => res.json())
            .then((data) => {
                setMessagesByChannel((prev) => ({ ...prev, [activeChannel]: data.messages }));
            });
    }, [activeChannel]);

    // Subscribe once to the public broadcast channel; route incoming
    // messages to the right per-channel bucket regardless of which tab is active.
    useEffect(() => {
        const channel = window.Echo.channel('chat-messages');
        channel.listen('.message.sent', (payload) => {
            setMessagesByChannel((prev) => {
                const bucket = prev[payload.channel_id] ?? [];
                return { ...prev, [payload.channel_id]: [...bucket, payload] };
            });
        });

        return () => {
            window.Echo.leave('chat-messages');
        };
    }, []);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages.length, activeChannel]);

    function sendMessage(e) {
        e.preventDefault();
        if (!draft.trim() || !character || sending) return;

        setSending(true);
        setError(null);

        fetch('/chat/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content ?? '',
            },
            body: JSON.stringify({
                channel_id: activeChannel,
                character,
                message: draft.trim(),
            }),
        })
            .then((res) => {
                if (!res.ok) throw new Error('Falha ao enviar mensagem.');
                setDraft('');
            })
            .catch(() => setError('Não foi possível enviar a mensagem. Tente novamente.'))
            .finally(() => setSending(false));
    }

    return (
        <>
            <Head title="Chat" />

            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
                <h1 className="font-display text-4xl text-parchment">Chat</h1>
                <p className="mt-2 text-ash">
                    Converse com quem está no jogo em tempo real, mesmo sem estar logado no cliente.
                </p>

                {/* Channel tabs */}
                <div className="mt-8 flex gap-2 border-b border-line">
                    {channelIds.map((id) => (
                        <button
                            key={id}
                            onClick={() => setActiveChannel(id)}
                            className={`px-4 py-2 font-mono text-sm uppercase tracking-wide transition ${
                                activeChannel === id
                                    ? 'border-b-2 border-ki-orange text-ki-orange'
                                    : 'text-ash hover:text-parchment'
                            }`}
                        >
                            {channels[id]}
                        </button>
                    ))}
                </div>

                {/* Message list */}
                <div
                    ref={scrollRef}
                    className="mt-4 h-[28rem] overflow-y-auto rounded-2xl border border-line bg-ember/30 p-4 backdrop-blur-md"
                >
                    {messages.length === 0 && (
                        <p className="text-sm text-ash">Nenhuma mensagem ainda neste canal.</p>
                    )}
                    {messages.map((msg) => (
                        <div key={msg.id} className="mb-2 text-sm leading-relaxed">
                            <span className="font-mono text-[10px] text-ash">{formatTime(msg.created_at)} </span>
                            <span
                                className={`font-bold ${msg.source === 'site' ? 'text-kame-blue' : 'text-saiyan-gold'}`}
                            >
                                {msg.author_name}
                            </span>
                            <span className="text-ash">: </span>
                            <span className="text-parchment">{msg.message}</span>
                        </div>
                    ))}
                </div>

                {/* Composer */}
                {auth.user ? (
                    characters?.length > 0 ? (
                        <form onSubmit={sendMessage} className="mt-4 flex flex-wrap items-center gap-2">
                            <select
                                value={character}
                                onChange={(e) => setCharacter(e.target.value)}
                                className="rounded-xl border border-line bg-ember px-3 py-3 text-sm text-parchment"
                            >
                                {characters.map((c) => (
                                    <option key={c.id} value={c.name}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            <input
                                value={draft}
                                onChange={(e) => setDraft(e.target.value)}
                                maxLength={255}
                                placeholder={`Mensagem para ${channels[activeChannel]}...`}
                                className="min-w-[12rem] flex-1 rounded-xl border border-line bg-ember px-4 py-3 text-sm text-parchment placeholder:text-ash"
                            />
                            <button
                                type="submit"
                                disabled={sending || !draft.trim()}
                                className="btn btn-solid flex items-center gap-2 px-6 py-3 disabled:opacity-50"
                            >
                                <Send size={16} /> Enviar
                            </button>
                        </form>
                    ) : (
                        <p className="mt-4 flex items-center gap-2 text-sm text-ash">
                            <Users size={16} /> Você precisa ter um personagem criado para conversar.
                        </p>
                    )
                ) : (
                    <p className="mt-4 text-sm text-ash">Faça login para participar do chat.</p>
                )}

                {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
            </div>
        </>
    );
}

ChatIndex.layout = (page) => <PublicLayout children={page} />;
