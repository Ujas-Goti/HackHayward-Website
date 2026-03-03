import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import spaceShip from '/src/assets/imgs/Scene5/SpaceShip.webp';
import UFO from '/src/assets/imgs/Scene5/UFO.webp';

export default function LoadingScreen({ onFinished }) {
  const [phase, setPhase] = useState('idle'); // idle → launching → done
  const [progress, setProgress] = useState(0);

  const stars = useMemo(() =>
    [...Array(50)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 2 + Math.random() * 4,
      delay: Math.random() * 4,
      size: 0.5 + Math.random() * 2,
      opacity: 0.3 + Math.random() * 0.7,
    })), []);

  const finish = useCallback(() => {
    setPhase('launching');
    setTimeout(() => setPhase('done'), 1400);
    setTimeout(() => onFinished(), 2000);
  }, [onFinished]);

  useEffect(() => {
    const htmlLoader = document.getElementById('pre-loader');
    if (htmlLoader) htmlLoader.remove();

    let current = 0;
    const interval = setInterval(() => {
      const remaining = 90 - current;
      current = Math.min(current + Math.max(0.3, remaining * 0.04), 90);
      setProgress(current);
    }, 60);

    const onReady = () => {
      clearInterval(interval);
      let fill = current;
      const fillInterval = setInterval(() => {
        fill += 2;
        if (fill >= 100) {
          clearInterval(fillInterval);
          setProgress(100);
          setTimeout(finish, 400);
        } else {
          setProgress(fill);
        }
      }, 30);
    };

    if (document.readyState === 'complete') {
      setTimeout(onReady, 1400);
    } else {
      window.addEventListener('load', () => setTimeout(onReady, 600));
    }

    const safetyTimeout = setTimeout(() => { clearInterval(interval); finish(); }, 8000);
    return () => { clearInterval(interval); clearTimeout(safetyTimeout); };
  }, [finish]);

  const isLaunching = phase === 'launching' || phase === 'done';
  const isDone = phase === 'done';

  return (
    <AnimatePresence>
      {phase !== 'done' ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #1A2773 0%, #2a1a5e 40%, #46166C 70%, #1A2773 100%)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Stars */}
          <div className="absolute inset-0 pointer-events-none">
            {stars.map((s, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{ left: s.left, top: s.top, width: s.size, height: s.size }}
                animate={{ opacity: [s.opacity * 0.3, s.opacity, s.opacity * 0.3] }}
                transition={{ duration: s.duration, repeat: Infinity, ease: 'easeInOut', delay: s.delay }}
              />
            ))}
          </div>

          {/* Nebula */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-[8%] right-[12%] w-[400px] h-[400px] bg-[#46166C]/25 rounded-full blur-[140px]" />
            <div className="absolute bottom-[12%] left-[8%] w-[350px] h-[350px] bg-[#B794D4]/12 rounded-full blur-[120px]" />
          </div>

          {/* Scene */}
          <div className="relative z-10 flex flex-col items-center">

            {/* UFO */}
            <motion.div
              className="absolute -top-10 -left-16 sm:-top-14 sm:-left-24 z-0"
              animate={isLaunching
                ? { x: '110vw', y: '-20vh', scale: 0.5, rotate: -12, opacity: 0 }
                : { x: [0, 3, -2, 0], y: [0, -5, 3, 0] }
              }
              transition={isLaunching
                ? { duration: 1.8, ease: [0.4, 0, 0.1, 1], delay: 0.35 }
                : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
              }
              style={{ opacity: isLaunching ? undefined : 0.6 }}
            >
              <img src={UFO} alt="" className="w-12 sm:w-20 object-contain drop-shadow-md" />
            </motion.div>

            {/* Ship */}
            <motion.div
              animate={isLaunching
                ? { x: '100vw', y: '-25vh', scale: 0.7, opacity: 0 }
                : { y: [0, -8, 0] }
              }
              transition={isLaunching
                ? { duration: 1.6, ease: [0.4, 0, 0.1, 1] }
                : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
              }
            >
              <div className="relative">
                {/* Idle exhaust glow */}
                <motion.div
                  className="absolute top-[48%] left-[3%] -translate-y-1/2 z-0"
                  animate={isLaunching
                    ? { opacity: 0, scaleX: 2, x: -20 }
                    : { opacity: [0.2, 0.45, 0.2], scaleX: [1, 1.25, 1], x: [0, -3, 0] }
                  }
                  transition={isLaunching
                    ? { duration: 0.3 }
                    : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
                  }
                  style={{ transformOrigin: 'right center' }}
                >
                  <div style={{
                    width: '30px', height: '6px',
                    background: 'linear-gradient(to left, rgba(140,215,255,0.5), rgba(140,210,255,0.15), transparent)',
                    borderRadius: '0 50% 50% 0',
                    filter: 'blur(2px)',
                  }} />
                </motion.div>

                {/* Ship image */}
                <img
                  src={spaceShip}
                  alt="HackHayward Falcon Spaceship"
                  className="relative z-10 w-[260px] sm:w-[340px] object-contain"
                  style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.3))' }}
                />
              </div>
            </motion.div>

            {/* Text + progress */}
            <motion.div
              className="mt-5 flex flex-col items-center gap-3"
              animate={isLaunching
                ? { opacity: 0, y: 15 }
                : { opacity: 1, y: 0 }
              }
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <h2 className="text-3xl sm:text-4xl font-exo2 font-bold tracking-wide">
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[#B794D4] via-[#c593e9] to-[#B794D4] inline-block"
                  animate={{ textShadow: ['0 0 8px rgba(183,148,212,0.2)', '0 0 20px rgba(183,148,212,0.5)', '0 0 8px rgba(183,148,212,0.2)'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  HackHayward
                </motion.span>
              </h2>

              <p className="text-[#C5D4F0]/40 text-xs font-grotesk tracking-[0.25em] uppercase">
                Preparing for launch
              </p>

              {/* Progress bar */}
              <div className="w-52 sm:w-64 mt-2">
                <div className="w-full h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, #46166C, #B794D4, #c593e9)',
                    }}
                    animate={{
                      width: `${progress}%`,
                      boxShadow: ['0 0 8px rgba(183,148,212,0.4)', '0 0 16px rgba(183,148,212,0.6)', '0 0 8px rgba(183,148,212,0.4)'],
                    }}
                    transition={{
                      width: { duration: 0.15, ease: 'easeOut' },
                      boxShadow: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                    }}
                  />
                </div>
              </div>

              {/* Loading dots */}
              <div className="flex gap-2 mt-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 rounded-full bg-[#B794D4]/50"
                    animate={{ y: [0, -4, 0], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
