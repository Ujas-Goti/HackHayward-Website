import uranus from '/src/assets/imgs/Background/Uranus.webp';
import { useCountdown } from '../context/CountdownContext';
import { yearData } from '../data/yearData';
import PropTypes from 'prop-types';
import { useState } from 'react';

// 2025 sponsors (colored logos)
import csueb_docs from '../assets/imgs/sponsors/CSUEB_DOCS.svg';
import csueb_docs_2026 from '../assets/imgs/sponsors/cseb-docs-o_2.png';
import csueb_soe from '../assets/imgs/sponsors/CSUEB_SOE.svg';

import aws from '../assets/imgs/sponsors/Amazon_Web_Services_Logo.svg.png';
import GCP from '../assets/imgs/sponsors/GCP_Cheat_Sheet.png';
import SCLogo from '../assets/imgs/sponsors/updated_smith_logo.png';

import GroqLogo from '../assets/imgs/sponsors/GroqLogo_Black.svg';
import PerplexityLogo from '../assets/imgs/sponsors/Perplexity-Logo.jpg';
import redbull from '../assets/imgs/sponsors/redbull.webp';

import cahsi from '../assets/imgs/sponsors/CAHSI.png';
import toolhouse from '../assets/imgs/sponsors/Toolhouse.png';

// 2026 sponsors (white transparent logos)
import googleWhite from '../assets/imgs/sponsors/white sponsor/google.png';
import amazonWhite from '../assets/imgs/sponsors/white sponsor/amazon 2.png';
import cahsiWhite from '../assets/imgs/sponsors/white sponsor/cahsi white.png';
import ibmWhite from '../assets/imgs/sponsors/white sponsor/ibm.png';
import cursorWhite from '../assets/imgs/sponsors/white sponsor/cursor.png';
import omiWhite from '../assets/imgs/sponsors/white sponsor/omi white.png';
import docsWhite from '../assets/imgs/sponsors/white sponsor/csueb docs.png';
import smithWhite from '../assets/imgs/sponsors/white sponsor/smith center.png';
import csuebSoeWhite from '../assets/imgs/sponsors/white sponsor/CSUEB_SOE-nobg.png';

import ReactGA from 'react-ga4';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportOnce } from '../utils/scrollAnimations';

// sponsor URL links
const sponsorURLs = {
    // Legacy / 2025
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
    // 2026 new sponsors
    'Google': 'https://www.google.com/',
    'Amazon': 'https://aws.amazon.com/',
    'Cursor': 'https://www.cursor.com/',
    'OMI': 'https://omi.me/',
}

// Image mapping
const sponsorImages = {
    // 2025 mapping (colored)
    'GCP_Cheat_Sheet.png': GCP,
    'Amazon_Web_Services_Logo.svg.png': aws,
    'CSUEB_DOCS.svg': csueb_docs,
    'cseb-docs-o_2.png': csueb_docs_2026,
    'CSUEB_SOE.svg': csueb_soe,
    'updated_smith_logo.png': SCLogo,
    'GroqLogo_Black.svg': GroqLogo,
    'Perplexity-Logo.jpg': PerplexityLogo,
    'redbull.webp': redbull,
    'CAHSI.png': cahsi,
    'Toolhouse.png': toolhouse,
    // 2026 mapping (white)
    'ibm.png': ibmWhite,
    'google.png': googleWhite,
    'amazon 2.png': amazonWhite,
    'cahsi white.png': cahsiWhite,
    'cursor.png': cursorWhite,
    'omi white.png': omiWhite,
    'csueb docs.png': docsWhite,
    'smith center.png': smithWhite,
    'CSUEB_SOE-nobg.png': csuebSoeWhite,
}

Sponsor.propTypes = {
    year: PropTypes.number,
};

const SponsorCard = ({ sponsor, imageSrc, url, handleClick, rowIndex }) => {
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
        >
            <div
                className={`relative w-full min-h-[180px] flex items-center justify-center py-8 px-6 ${rowIndex === 2 ? 'w-[340px] h-[240px] flex-shrink-0' : ''}`}
                style={{
                    transform: isHovered 
                        ? `rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg) translateZ(10px)` 
                        : 'none',
                    transition: 'transform 0.1s ease-out',
                }}
            >
                {/* Hover-only border – no clipping container */}
                <div
                    className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#B794D4]/50 group-hover:shadow-[0_0_24px_rgba(183,148,212,0.3)] transition-all duration-300"
                    aria-hidden="true"
                />

                {/* Logo: row sizes with per-sponsor overrides */}
                <img
                    src={imageSrc}
                    alt={sponsor.alt}
                    loading="lazy"
                    className={`h-auto w-auto object-contain transition-transform duration-300 relative z-10 scale-110 group-hover:scale-125 ${
                        sponsor.key === 'CAHSI' ? 'max-h-[210px]' :
                        sponsor.key === 'IBM' || sponsor.key === 'Cursor' ? 'max-h-[110px]' :
                        rowIndex === 0 ? 'max-h-[190px]' :
                        rowIndex === 1 ? 'max-h-[125px]' :
                        'h-[185px] w-auto object-contain object-center'
                    }`}
                />
            </div>
        </a>
    );
};

SponsorCard.propTypes = {
    sponsor: PropTypes.object.isRequired,
    imageSrc: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    rowIndex: PropTypes.number,
};

export default function Sponsor(props) {
    const { hasCountdownEnded } = useCountdown();
    const year = props.year || 2025;
    const is2026 = year === 2026;
    const currentYearData = yearData[year];
    const sponsors = currentYearData.sponsors || [];
    // For 2026, treat sponsors as three centered rows (inverted triangle feel)
    const rows = [
        sponsors.slice(0, 3), // row 1: Google, Amazon, CAHSI
        sponsors.slice(3, 6), // row 2: IBM, Cursor, OMI
        sponsors.slice(6),    // row 3: CSUEB DOCS, Smith Center, CSUEB SOE
    ];

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
                <section className="flex flex-col items-center justify-items-center gap-10 text-white max-w-7xl px-4">
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

                        {/* Three centered rows for an inverted triangle feel */}
                        <div className="flex flex-col items-center gap-4 z-10">
                            {rows.map((row, rowIndex) => (
                                <motion.div
                                    key={rowIndex}
                                    className={`flex justify-center gap-10 w-full ${rowIndex === 0 ? '' : rowIndex === 1 ? 'max-w-5xl' : 'max-w-4xl'}`}
                                    variants={staggerContainer(0.1)}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={viewportOnce}
                                >
                                    {row.map((sponsor) => {
                                        const imageSrc = sponsorImages[sponsor.image];
                                        const url = sponsorURLs[sponsor.urlKey];
                                        return (
                                            <motion.div
                                                key={sponsor.key}
                                                variants={fadeUp}
                                                className={rowIndex === 2 ? 'w-[340px] flex-shrink-0' : ''}
                                            >
                                                <SponsorCard
                                                    sponsor={sponsor}
                                                    imageSrc={imageSrc}
                                                    url={url}
                                                    handleClick={handleClick}
                                                    rowIndex={rowIndex}
                                                />
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            ))}
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
