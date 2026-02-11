import mars from '/src/assets/imgs/Background/Mars.webp';
import jupiter from '/src/assets/imgs/Background/Jupiter.webp';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// Slideshow images
import hh1 from '/src/assets/imgs/about/hh1.png';
import hh2 from '/src/assets/imgs/about/hh2.png';
import hh3 from '/src/assets/imgs/about/hh3.png';
import hh5 from '/src/assets/imgs/about/hh5.png';
import hh6 from '/src/assets/imgs/about/hh6.png';

const slideshowImages = [
    { src: hh1, alt: 'HackHayward participants with Red Bull energy drinks' },
    { src: hh2, alt: 'HackHayward judges and organizers group photo' },
    { src: hh3, alt: 'HackHayward hackers working in the library' },
    { src: hh5, alt: 'HackHayward participants showing off stickers' },
    { src: hh6, alt: 'HackHayward award ceremony' },
];

AboutUs.propTypes = {
    year: PropTypes.number.isRequired,
    yearData: PropTypes.object.isRequired,
};

export default function AboutUs({ year, yearData }) {
    const is2026 = year === 2026;
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const aboutText2026 =
        "HackHayward 2026, hosted at California State University, East Bay, is the second annual collegiate hackathon in the Hayward area. Students collaborate in teams to ideate, build, and pitch innovative solutions to real-world challenges within a limited timeframe. The event will be held in person on campus in March 2026, bringing together over 200 participants. HackHayward empowers students of all backgrounds to learn, create, and connect through technology.";

    // Auto-advance slideshow every 3.5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slideshowImages.length);
        }, 3500);
        return () => clearInterval(interval);
    }, []);
    
    return (
        <>
            <div className="grid place-content-center gap-10 relative shadow-text-sm">
                <section className="grid xl:grid-cols-[0.9fr_1.1fr] items-center justify-items-center gap-10 text-white max-w-7xl">
                    {/* Slideshow on the left */}
                    <div className="z-20 w-full max-w-xl order-2 xl:order-1">
                        <div className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg ${
                            is2026
                                ? 'shadow-hack-lavender/30 border border-hack-lavender/20'
                                : 'shadow-cyan-500/50'
                        }`}>
                            {slideshowImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image.src}
                                    alt={image.alt}
                                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                                        index === currentSlide ? 'opacity-100' : 'opacity-0'
                                    }`}
                                />
                            ))}
                            {/* Slide indicators */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                {slideshowImages.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                            index === currentSlide
                                                ? 'bg-white w-6'
                                                : 'bg-white/50'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <article className="animate-fade-left max-w-xl z-20 space-y-5 order-1 xl:order-2">
                        <h2
                            className="text-5xl font-bold font-exo2 shadow-text-sm text-white"
                        >
                            About Us
                        </h2>
                        <div
                            className={`rounded-2xl px-6 py-5 bg-white/5 backdrop-blur-md border ${
                                is2026 ? 'border-hack-lavender/30' : 'border-white/10'
                            }`}
                        >
                            <p
                                className={`lg:text-lg sm:text-base font-grotesk leading-relaxed ${
                                    is2026 ? 'text-hack-blue-light/95' : ''
                                }`}
                            >
                                {is2026 ? aboutText2026 : yearData.aboutText}
                            </p>
                        </div>
                    </article>
                    <div
                        className={`opacity-50 absolute top-[10%] right-[-5%] h-[10%] w-[10%] ${
                            is2026 ? 'animate-float' : ''
                        }`}
                        style={{ animationDuration: '8s' }}
                    >
                        <img src={mars} loading="lazy" alt="Mars" className="object-cover" />
                    </div>
                    <div
                        className={`opacity-50 absolute bottom-[0%] left-[-15%] max-h-[30%] max-w-[30%] z-10 ${
                            is2026 ? 'animate-float' : ''
                        }`}
                        style={{ animationDuration: '12s', animationDelay: '2s' }}
                    >
                        <img src={jupiter} loading="lazy" alt="Jupiter" className="object-cover" />
                    </div>
                </section>
            </div>
        </>
    );
}
