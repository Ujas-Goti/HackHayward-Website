import astro from '/src/assets/imgs/hero/Astro.webp';

/**
 * Fixed-position Astro mascot that stays visible as you scroll,
 * guiding the user through each section of the page.
 */
export default function AstroGuide() {
    return (
        <div
            className="fixed right-4 lg:right-8 top-1/2 -translate-y-1/2 z-[100] pointer-events-none select-none hidden sm:block"
            aria-hidden="true"
        >
            <div className="relative">
                {/* Soft glow behind mascot */}
                <div className="absolute inset-0 bg-[#46166C]/40 rounded-full blur-[60px] scale-90" />
                <div className="absolute inset-0 bg-[#B794D4]/20 rounded-full blur-[40px] scale-75" />
                <img
                    src={astro}
                    alt=""
                    className="relative z-10 w-[800px] sm:w-[900px] lg:w-[1000px] object-contain drop-shadow-2xl animate-wiggle animate-infinite animate-duration-[8000ms] animate-ease-in-out opacity-95"
                />
            </div>
        </div>
    );
}
