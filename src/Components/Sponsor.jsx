import uranus from '/src/assets/imgs/Background/Uranus.webp';
import { useCountdown } from '../context/CountdownContext';
import { yearData } from '../data/yearData';
import PropTypes from 'prop-types';
import { useState } from 'react';

// import sponsors
import csueb_docs from '/src/assets/imgs/sponsors/CSUEB_DOCS.svg';
import csueb_docs_2026 from '/src/assets/imgs/sponsors/cseb-docs-o_2.webp';
import csueb_soe from '/src/assets/imgs/sponsors/CSUEB_SOE.svg';
import aws from '/src/assets/imgs/sponsors/Amazon_Web_Services_Logo.webp';
import GCP from '/src/assets/imgs/sponsors/GCP_Cheat_Sheet.webp';
import SCLogo from '/src/assets/imgs/sponsors/updated_smith_logo.webp';
import GroqLogo from '/src/assets/imgs/sponsors/GroqLogo_Black.svg';
import PerplexityLogo from '/src/assets/imgs/sponsors/Perplexity-Logo.webp';
import redbull from '/src/assets/imgs/sponsors/redbull.webp';
import ibm from '/src/assets/imgs/sponsors/ibm.webp';
import cahsi from '/src/assets/imgs/sponsors/CAHSI.webp';
import toolhouse from '/src/assets/imgs/sponsors/Toolhouse.webp';

import ReactGA from 'react-ga4';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOnce } from '../utils/scrollAnimations';

// sponsor URL links
const sponsorURLs = {
    'CSUEB DOCS': 'https://cs.csueastbay.edu/',
    'CSUEB SOE': 'https://www.csueastbay.edu/engineering/',
    'AWS': 'https://aws.amazon.com/',
    'GCP': 'https://cloud.google.com/',
    'Smith Center': 'https://www.csueastbay.edu/smith-center/',
    'Groq': 'https://groq.com/',
    'Perplexity': 'https://www.perplexity.ai/',
    'Redbull': 'https://www.redbull.com/',
    'IBM': 'https://www.ibm.com/',
    'CAHSI': 'https://cahsi.org/',
    'Toolhouse': 'https://toolhouse.com/',
}

// Image mapping
const sponsorImages = {
    'GCP_Cheat_Sheet.webp': GCP,
    'Amazon_Web_Services_Logo.webp': aws,
    'CSUEB_DOCS.svg': csueb_docs,
    'cseb-docs-o_2.webp': csueb_docs_2026,
    'CSUEB_SOE.svg': csueb_soe,
    'updated_smith_logo.webp': SCLogo,
    'GroqLogo_Black.svg': GroqLogo,
    'Perplexity-Logo.webp': PerplexityLogo,
    'redbull.webp': redbull,
    'ibm.webp': ibm,
    'CAHSI.webp': cahsi,
    'Toolhouse.webp': toolhouse,
}

Sponsor.propTypes = {
    year: PropTypes.number,
};

const SponsorCard = ({ sponsor, imageSrc, url, handleClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 10;
        const y = (e.clientY - rect.top - rect.height / 2) / 10;
        setMousePosition({ x, y });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
    };

    const padding = sponsor.padding || 'p-4';

    return (
        <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => handleClick(sponsor.urlKey)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="block w-full group perspective-1000"
            style={{
                transform: isHovered 
                    ? `rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg) translateZ(20px)` 
                    : 'none',
                transition: 'transform 0.1s ease-out'
            }}
        >
            <div
                className={`relative ${padding} rounded-2xl w-full h-[150px] flex items-center justify-center overflow-hidden
                    bg-white/5 backdrop-blur-xl
                    border border-[#B794D4]/30
                    shadow-[0_18px_45px_rgba(0,0,0,0.45)]
                    transition-all duration-300 ease-out
                    before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-[#B794D4]/40 before:via-[#46166C]/30 before:to-transparent
                    before:opacity-0 before:transition-opacity before:duration-300
                    group-hover:before:opacity-100 group-hover:border-[#B794D4]
                    group-hover:shadow-[0_0_30px_rgba(183,148,212,0.45),0_0_60px_rgba(70,22,108,0.3)]
                    active:scale-95`}
            >
                {/* Soft inner glass layer */}
                <div className="absolute inset-[1px] rounded-[1rem] bg-gradient-to-br from-white/15 via-white/8 to-transparent z-0" />
                
                {/* Logo plate to keep dark text readable on any background */}
                <div className="relative z-10 flex items-center justify-center rounded-xl bg-white px-6 py-4 shadow-inner shadow-black/10 border border-black/5 max-h-[120px] w-full mx-4">
                    <img
                        src={imageSrc}
                        alt={sponsor.alt}
                        loading="lazy"
                        className={`${sponsor.height} max-h-[80px] w-auto object-contain transition-transform duration-300 
                            ${sponsor.key === 'Smith Center' || sponsor.key === 'Perplexity' || sponsor.key === 'Groq' || sponsor.key === 'Redbull' ? 'mt-1' : ''} 
                            ${sponsor.key === 'CSUEB SOE' ? 'select-none' : ''}
                            group-hover:scale-110`}
                    />
                </div>
            </div>
        </a>
    );
};

SponsorCard.propTypes = {
    sponsor: PropTypes.object.isRequired,
    imageSrc: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
};

export default function Sponsor(props) {
    const { hasCountdownEnded } = useCountdown();
    const year = props.year || 2025;
    const is2026 = year === 2026;
    const currentYearData = yearData[year];
    const sponsors = currentYearData.sponsors || [];

    const handleClick = (platform) => {
        ReactGA.event({
            category: 'hackathon',
            action: 'Click',
            label: platform,
        });
        console.log(`Google Analytics Event: ${platform} clicked`);
    };
    
    return (
        <>
            <div className="relative flex justify-center py-16">
                <section className="flex flex-col items-center justify-items-center gap-10 text-white max-w-screen-lg px-4">
                    <div className="text-white text-center font-exo2 flex flex-col gap-9">
                        <motion.h2
                            className="text-5xl text-balance font-bold shadow-text-sm text-white"
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewportOnce}
                        >
                            Sponsors
                        </motion.h2>

                        {/* Sponsor logos laid out in a modern responsive layout */}
                        <div className="flex flex-col gap-10">
                            {/* Top two rows: 3x2 grid using first 6 sponsors */}
                            <motion.div
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto z-10"
                                variants={staggerContainer(0.1)}
                                initial="hidden"
                                whileInView="visible"
                                viewport={viewportOnce}
                            >
                                {sponsors.slice(0, 6).map((sponsor) => {
                                    const imageSrc = sponsorImages[sponsor.image];
                                    const url = sponsorURLs[sponsor.urlKey];

                                    return (
                                        <motion.div
                                            key={sponsor.key}
                                            variants={fadeUp}
                                        >
                                            <SponsorCard
                                                sponsor={sponsor}
                                                imageSrc={imageSrc}
                                                url={url}
                                                handleClick={handleClick}
                                            />
                                        </motion.div>
                                    );
                                })}
                            </motion.div>

                            {/* Bottom row: remaining sponsors centered */}
                            {sponsors.length > 6 && (
                                <motion.div
                                    className="flex justify-center gap-6 max-w-3xl mx-auto z-10 flex-wrap"
                                    variants={staggerContainer(0.1)}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={viewportOnce}
                                >
                                    {sponsors.slice(6).map((sponsor) => {
                                        const imageSrc = sponsorImages[sponsor.image];
                                        const url = sponsorURLs[sponsor.urlKey];

                                        return (
                                            <motion.div
                                                key={sponsor.key}
                                                className="w-full sm:w-[260px]"
                                                variants={fadeUp}
                                            >
                                                <SponsorCard
                                                    sponsor={sponsor}
                                                    imageSrc={imageSrc}
                                                    url={url}
                                                    handleClick={handleClick}
                                                />
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </div>

                    </div>
                    <motion.a
                        href={hasCountdownEnded ? "mailto:contact@hackhayward.com" : "mailto:sponsor@hackhayward.com"}
                        className={`relative rounded-full p-4 px-8 transition-all duration-300 text-white lg:text-lg text-sm font-grotesk font-medium text-nowrap
                            hover:scale-105 active:scale-95 z-50
                            before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-white/20 before:to-transparent
                            before:opacity-0 hover:before:opacity-100 before:transition-opacity
                            ${is2026
                                ? 'bg-gradient-to-r from-hack-lavender to-hack-purple hover:from-hack-purple-light hover:to-hack-lavender shadow-[0_0_20px_rgba(183,148,212,0.3)] hover:shadow-[0_0_30px_rgba(183,148,212,0.5)]'
                                : 'bg-gradient-to-r from-[#c593e9] to-[#b57ed8] hover:from-[#cfb0e8] hover:to-[#c593e9] shadow-[0_0_20px_rgba(197,147,233,0.3)] hover:shadow-[0_0_30px_rgba(197,147,233,0.5)]'
                            }`}
                        onClick={() => handleClick(hasCountdownEnded ? 'Contact Us' : 'Sponsor Us')}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                    >
                        <span className="relative z-10">{hasCountdownEnded ? 'Contact Us' : 'Sponsor Us'}</span>
                    </motion.a>
                </section>
                <div className={`opacity-50 absolute bottom-[30%] left-[-8%] max-h-[30%] max-w-[30%] ${is2026 ? 'animate-float' : 'animate-pulse'}`} style={{ animationDuration: '10s' }}>
                    <img src={uranus} loading="lazy" alt="Uranus" className="object-cover" />
                </div>
                
                {/* Ambient glow effects */}
                <div className={`absolute top-1/4 right-[-10%] w-96 h-96 rounded-full blur-[120px] animate-neon-pulse ${is2026 ? 'bg-hack-purple/10' : 'bg-purple-500/10'}`}></div>
                <div className={`absolute bottom-1/4 left-[-10%] w-80 h-80 rounded-full blur-[100px] animate-neon-pulse-delayed ${is2026 ? 'bg-hack-blue/10' : 'bg-pink-500/10'}`}></div>
            </div>
        </>
    );
}
