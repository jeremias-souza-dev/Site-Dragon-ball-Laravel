import { useEffect, useRef } from 'react';

const COLORS = ['255,106,31', '255,207,92', '53,194,224'];

export default function KiParticles({ count = 60, className = '' }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) return;

        const ctx = canvas.getContext('2d');
        let width, height, particles, raf;

        const spawn = () => ({
            x: Math.random() * width,
            y: height + Math.random() * 40,
            r: (Math.random() * 1.6 + 0.4) * devicePixelRatio,
            speed: (Math.random() * 0.6 + 0.25) * devicePixelRatio,
            drift: (Math.random() - 0.5) * 0.4 * devicePixelRatio,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            alpha: Math.random() * 0.5 + 0.3,
        });

        const resize = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            width = canvas.width = rect.width * devicePixelRatio;
            height = canvas.height = rect.height * devicePixelRatio;
            canvas.style.width = rect.width + 'px';
            canvas.style.height = rect.height + 'px';
        };

        resize();
        particles = Array.from({ length: count }, () => {
            const p = spawn();
            p.y = Math.random() * height;
            return p;
        });
        window.addEventListener('resize', resize);

        const tick = () => {
            ctx.clearRect(0, 0, width, height);
            particles.forEach((p, i) => {
                p.y -= p.speed;
                p.x += p.drift;
                if (p.y < -10) {
                    particles[i] = spawn();
                    return;
                }
                ctx.beginPath();
                ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
                ctx.shadowColor = `rgba(${p.color},0.8)`;
                ctx.shadowBlur = 6 * devicePixelRatio;
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            });
            raf = requestAnimationFrame(tick);
        };
        tick();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
        };
    }, [count]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 ${className}`}
            style={{ maskImage: 'linear-gradient(to bottom, black 55%, transparent 95%)' }}
        />
    );
}
