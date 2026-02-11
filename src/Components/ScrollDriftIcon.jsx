import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Gentler left ↔ right (less zig-zag), smooth drift down with scroll
const X_VW_LEFT = 18;
const X_VW_RIGHT = 82;
const Y_VH_TOP = 28;
const Y_VH_BOTTOM = 68;
const SECTION_COUNT = 4;
const SPRING_STIFFNESS = 120;
const SPRING_DAMPING = 24;
const FLOAT_AMP_X = 8;
const FLOAT_AMP_Y = 8;
const FLOAT_AMP_R = 2.5;
const FLOAT_FREQ = 0.0006;

/**
 * Scroll-linked drifting icon: stays at vertical center, travels left→right
 * then right→left as you scroll through the page (alternating per section).
 */
export default function ScrollDriftIcon({ src, size = 160 }) {
    const [scrollY, setScrollY] = useState(0);
    const [maxScroll, setMaxScroll] = useState(1);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const rafRef = useRef(null);
    const floatRef = useRef({ x: 0, y: 0, r: 0 });

    const targetX = useMotionValue(0);
    const targetY = useMotionValue(0);
    const smoothX = useSpring(targetX, {
        stiffness: prefersReducedMotion ? 200 : SPRING_STIFFNESS,
        damping: prefersReducedMotion ? 35 : SPRING_DAMPING,
    });
    const smoothY = useSpring(targetY, {
        stiffness: prefersReducedMotion ? 200 : SPRING_STIFFNESS,
        damping: prefersReducedMotion ? 35 : SPRING_DAMPING,
    });

    // Update maxScroll when content changes
    useEffect(() => {
        const update = () => {
            setMaxScroll(Math.max(1, document.documentElement.scrollHeight - window.innerHeight));
        };
        update();
        const obs = new ResizeObserver(update);
        obs.observe(document.documentElement);
        window.addEventListener('resize', update);
        return () => {
            obs.disconnect();
            window.removeEventListener('resize', update);
        };
    }, []);

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mq.matches);
        const handler = () => setPrefersReducedMotion(mq.matches);
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, []);

    useEffect(() => {
        const onScroll = () => setScrollY(window.scrollY ?? window.pageYOffset);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Drive position from scroll: use progress 0..1 split into SECTION_COUNT segments.
    // Each segment = one full left→right or right→left sweep. Read viewport inside effect so it always works.
    useEffect(() => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        if (vw === 0) return;

        const total = Math.max(1, maxScroll);
        const progress = Math.min(1, Math.max(0, scrollY / total));

        const segmentSize = 1 / SECTION_COUNT;
        const i = Math.min(SECTION_COUNT - 1, Math.floor(progress / segmentSize));
        const segProgress = segmentSize > 0
            ? (progress - i * segmentSize) / segmentSize
            : 0;
        const t = Math.min(1, Math.max(0, segProgress));

        const leftX = vw * (X_VW_LEFT / 100);
        const rightX = vw * (X_VW_RIGHT / 100);
        const startX = i % 2 === 0 ? leftX : rightX;
        const endX = i % 2 === 0 ? rightX : leftX;
        const rawX = startX + (endX - startX) * t;
        // Smooth vertical drift: top of page → bottom as you scroll (no zig-zag)
        const rawY = (Y_VH_TOP + (Y_VH_BOTTOM - Y_VH_TOP) * progress) / 100 * vh;

        targetX.set(rawX);
        targetY.set(rawY);
    }, [scrollY, maxScroll, targetX, targetY]);

    // Subtle float overlay (RAF), only when not reduced motion
    const floatX = useMotionValue(0);
    const floatY = useMotionValue(0);
    const floatR = useMotionValue(0);

    useEffect(() => {
        if (prefersReducedMotion) {
            floatX.set(0);
            floatY.set(0);
            floatR.set(0);
            return;
        }
        let t = 0;
        const tick = () => {
            t += 16;
            const ax = FLOAT_AMP_X;
            const ay = FLOAT_AMP_Y;
            const r = FLOAT_AMP_R;
            const w = FLOAT_FREQ;
            floatRef.current.x = ax * Math.sin(t * w) + (ax * 0.5) * Math.sin(t * w * 1.3 + 0.5);
            floatRef.current.y = ay * Math.cos(t * w * 0.9) + (ay * 0.5) * Math.sin(t * w * 1.1 + 1);
            floatRef.current.r = r * Math.sin(t * w * 0.8 + 0.3);
            floatX.set(floatRef.current.x);
            floatY.set(floatRef.current.y);
            floatR.set(floatRef.current.r);
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [prefersReducedMotion, floatX, floatY, floatR]);

    if (!src) return null;

    const half = size / 2;

    return (
        <div
            className="fixed inset-0 w-screen h-screen pointer-events-none overflow-hidden"
            style={{ zIndex: 100 }}
            aria-hidden="true"
        >
            <motion.div
                className="absolute left-0 top-0 will-change-transform"
                style={{
                    x: smoothX,
                    y: smoothY,
                }}
            >
                <motion.div
                    className="flex items-center justify-center"
                    style={{
                        x: -half,
                        y: -half,
                        width: size,
                        height: size,
                    }}
                >
                    <motion.div
                        className="w-full h-full flex items-center justify-center relative"
                        style={{
                            x: floatX,
                            y: floatY,
                            rotate: floatR,
                        }}
                    >
                        <div className="relative w-full h-full">
                            <div className="absolute inset-0 bg-[#46166C]/40 rounded-full blur-[50px] scale-90" />
                            <div className="absolute inset-0 bg-[#B794D4]/20 rounded-full blur-[30px] scale-75" />
                            <img
                                src={src}
                                alt=""
                                className="relative z-10 object-contain drop-shadow-2xl select-none"
                                style={{ width: size, height: size }}
                                draggable={false}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}
