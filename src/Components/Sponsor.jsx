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
import cursorWhite from '../assets/imgs/sponsors/white sponsor/LOCKUP_HORIZONTAL_2D_DARK.png';
import perplexityWhite from '../assets/imgs/sponsors/white sponsor/perplexity-Photoroom.png';
import omiWhite from '../assets/imgs/sponsors/white sponsor/omi white.png';
import doorDashWhite from '../assets/imgs/sponsors/white sponsor/DOORDASH-Photoroom.png';
import warpWhite from '../assets/imgs/sponsors/white sponsor/Warp.png';
import asiWhite from '../assets/imgs/sponsors/white sponsor/asi.png';
import docsWhite from '../assets/imgs/sponsors/white sponsor/csueb docs.png';
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
    'Groq': 'https://groq.com/',
    'Perplexity': 'https://www.perplexity.ai/',
    'Smith Center': 'https://www.csueastbay.edu/smith-center/',
    'Redbull': 'https://www.redbull.com/',
    'IBM': 'https://www.ibm.com/',
    'CAHSI': 'https://cahsi.org/',
    'Toolhouse': 'https://toolhouse.com/',
    // 2026 new sponsors
    'Google': 'https://www.google.com/',
    'Amazon': 'https://aws.amazon.com/',
    'Cursor': 'https://www.cursor.com/',
    'OMI': 'https://omi.me/',
    'DoorDash': 'https://www.doordash.com/',
    'ASI': 'https://www.csueastbay.edu/asi/',
    'Warp': 'https://www.warp.dev/',
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
    'perplexity-Photoroom.png': perplexityWhite,
    'omi white.png': omiWhite,
    'DOORDASH-Photoroom.png': doorDashWhite,
    'Warp.png': warpWhite,
    'asi.png': asiWhite,
    'csueb docs.png': docsWhite,
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
                className={`relative w-full min-h-[180px] flex items-center justify-center py-3 px-4 ${rowIndex === 3 ? 'sm:w-[340px] sm:min-h-[180px] sm:flex-shrink-0' : ''}`}
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
                        sponsor.key === 'Warp' ? 'max-h-[70px]' :
                        sponsor.key === 'Perplexity' ? 'max-h-[150px]' :
                        sponsor.key === 'IBM' || sponsor.key === 'Cursor' ? 'max-h-[110px]' :
                        rowIndex === 0 ? 'max-h-[190px]' :
                        rowIndex === 1 ? 'max-h-[125px]' :
                        rowIndex === 2 ? 'max-h-[105px]' :
                        'max-h-[140px] w-auto object-contain object-center'
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
    // For 2026, four rows
    const rows = [
        sponsors.slice(0, 3),  // row 1: Google, Amazon, CAHSI
        sponsors.slice(3, 6),  // row 2: Cursor, IBM, Perplexity
        sponsors.slice(6, 9),  // row 3: OMI, DoorDash, ASI
        sponsors.slice(9),     // row 4: CSUEB DOCS, CSUEB SOE
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

                        {/* Mobile: stacked list */}
                        <div className="flex flex-col items-center gap-4 z-10 sm:hidden">
                            {is2026 ? (
                                sponsors.map((sponsor, index) => {
                                    const imageSrc = sponsorImages[sponsor.image];
                                    const url = sponsorURLs[sponsor.urlKey];
                                    const rowIndex = Math.floor(index / 3);
                                    return (
                                        <motion.div key={sponsor.key} variants={fadeUp} className="w-full">
                                            <SponsorCard
                                                sponsor={sponsor}
                                                imageSrc={imageSrc}
                                                url={url}
                                                handleClick={handleClick}
                                                rowIndex={rowIndex}
                                            />
                                        </motion.div>
                                    );
                                })
                            ) : (
                                sponsors.map((sponsor) => {
                                    const imageSrc = sponsorImages[sponsor.image];
                                    const url = sponsorURLs[sponsor.urlKey];
                                    return (
                                        <motion.a
                                            key={sponsor.key}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => handleClick(sponsor.urlKey)}
                                            variants={fadeUp}
                                            className="w-full max-w-[340px] bg-white rounded-xl p-4 flex items-center justify-center shadow-md"
                                        >
                                            <img
                                                src={imageSrc}
                                                alt={sponsor.alt}
                                                loading="lazy"
                                                className={`object-contain ${
                                                    sponsor.key === 'AWS' ? 'max-h-[56px]' :
                                                    sponsor.key === 'Smith Center' ? 'max-h-[52px]' :
                                                    sponsor.key === 'CSUEB DOCS' || sponsor.key === 'CSUEB SOE' ? 'max-h-[48px]' :
                                                    sponsor.key === 'Groq' ? 'max-h-[58px]' :
                                                    'max-h-[60px]'
                                                }`}
                                            />
                                        </motion.a>
                                    );
                                })
                            )}
                        </div>

                        {/* Desktop / tablet */}
                        <div className="hidden sm:flex flex-col items-center gap-2 z-10">
                            {is2026 ? (
                                // 2026: four-row structured layout
                                rows.map((row, rowIndex) => (
                                    <motion.div
                                        key={rowIndex}
                                        className={`flex justify-center w-full ${rowIndex === 3 ? 'gap-2 max-w-2xl' : rowIndex === 0 ? 'gap-10' : rowIndex === 1 ? 'gap-10 max-w-5xl' : 'gap-10 max-w-5xl'}`}
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
                                                    className={rowIndex === 3 ? 'sm:w-[340px] sm:flex-shrink-0' : ''}
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
                                ))
                            ) : (
                                // 2025: white-tile layout (2,2,3) like previous year design
                                [
                                    sponsors.slice(0, 2),
                                    sponsors.slice(2, 4),
                                    sponsors.slice(4),
                                ].map((legacyRow, legacyRowIndex) => (
                                    <motion.div
                                        key={legacyRowIndex}
                                        className={`flex justify-center gap-6 w-full ${legacyRowIndex === 2 ? 'max-w-6xl' : 'max-w-4xl'}`}
                                        variants={staggerContainer(0.1)}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={viewportOnce}
                                    >
                                        {legacyRow.map((sponsor) => {
                                            const imageSrc = sponsorImages[sponsor.image];
                                            const url = sponsorURLs[sponsor.urlKey];
                                            return (
                                                <motion.a
                                                    key={sponsor.key}
                                                    href={url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={() => handleClick(sponsor.urlKey)}
                                                    variants={fadeUp}
                                                    className="w-[320px] h-[110px] bg-white rounded-xl p-4 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200"
                                                >
                                                    <img
                                                        src={imageSrc}
                                                        alt={sponsor.alt}
                                                        loading="lazy"
                                                        className={`object-contain ${
                                                            sponsor.key === 'AWS' ? 'max-h-[62px]' :
                                                            sponsor.key === 'Smith Center' ? 'max-h-[56px]' :
                                                            sponsor.key === 'CSUEB DOCS' || sponsor.key === 'CSUEB SOE' ? 'max-h-[52px]' :
                                                            sponsor.key === 'Groq' ? 'max-h-[66px]' :
                                                            'max-h-[64px]'
                                                        }`}
                                                    />
                                                </motion.a>
                                            );
                                        })}
                                    </motion.div>
                                ))
                            )}
                        </div>

                    </div>
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
