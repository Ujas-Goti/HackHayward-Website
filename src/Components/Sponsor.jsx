import uranus from '/src/assets/imgs/Background/Uranus.webp';
import { useCountdown } from '../context/CountdownContext';
import { yearData } from '../data/yearData';
import PropTypes from 'prop-types';
import { useState } from 'react';

// import sponsors
import csueb_docs from '/src/assets/imgs/sponsors/CSUEB_DOCS.svg';
import csueb_docs_2026 from '/src/assets/imgs/sponsors/cseb-docs-o_2.png';
import csueb_soe from '/src/assets/imgs/sponsors/CSUEB_SOE.svg';
import aws from '/src/assets/imgs/sponsors/Amazon_Web_Services_Logo.svg.png';
import GCP from '/src/assets/imgs/sponsors/GCP_Cheat_Sheet.png';
import SCLogo from '/src/assets/imgs/sponsors/updated_smith_logo.png';
import GroqLogo from '/src/assets/imgs/sponsors/GroqLogo_Black.svg';
import PerplexityLogo from '/src/assets/imgs/sponsors/Perplexity-Logo.jpg';
import redbull from '/src/assets/imgs/sponsors/redbull.webp';
import ibm from '/src/assets/imgs/sponsors/ibm.png';

import ReactGA from 'react-ga4';

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
    'IBM': 'https://www.ibm.com/'
}

// Image mapping
const sponsorImages = {
    'GCP_Cheat_Sheet.png': GCP,
    'Amazon_Web_Services_Logo.svg.png': aws,
    'CSUEB_DOCS.svg': csueb_docs,
    'cseb-docs-o_2.png': csueb_docs_2026,
    'CSUEB_SOE.svg': csueb_soe,
    'updated_smith_logo.png': SCLogo,
    'GroqLogo_Black.svg': GroqLogo,
    'Perplexity-Logo.jpg': PerplexityLogo,
    'redbull.webp': redbull,
    'ibm.png': ibm,
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
                className={`relative ${padding} rounded-xl w-full h-[140px] flex items-center justify-center overflow-hidden
                    backdrop-blur-md bg-white/90 
                    border-2 border-transparent
                    shadow-lg
                    transition-all duration-300 ease-out
                    before:absolute before:inset-0 before:rounded-xl before:p-[2px] 
                    before:bg-gradient-to-br before:from-purple-400 before:via-pink-400 before:to-purple-600
                    before:opacity-0 before:transition-opacity before:duration-300
                    hover:before:opacity-100 hover:shadow-[0_0_30px_rgba(197,147,233,0.4)]
                    hover:bg-white
                    active:scale-95`}
            >
                {/* Gradient border effect */}
                <div className="absolute inset-[2px] bg-white rounded-[10px] z-0"></div>
                
                {/* Glow effect on hover */}
                {isHovered && (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-transparent to-pink-400/20 rounded-xl animate-pulse"></div>
                )}
                
                {/* Logo */}
                <img 
                    src={imageSrc} 
                    alt={sponsor.alt} 
                    className={`${sponsor.height} object-contain relative z-10 transition-transform duration-300 
                        ${sponsor.key === 'Smith Center' || sponsor.key === 'Perplexity' || sponsor.key === 'Groq' || sponsor.key === 'Redbull' ? 'mt-2' : ''} 
                        ${sponsor.key === 'CSUEB SOE' ? 'select-none' : ''}
                        group-hover:scale-105`}
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
};

export default function Sponsor(props) {
    const { hasCountdownEnded } = useCountdown();
    const year = props.year || 2025;
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
                        <h2 className="text-5xl text-balance font-bold shadow-text-sm text-white animate-fade-up">
                            Sponsors
                        </h2>
                        
                        <div className="flex flex-col gap-8">
                            {/* Sponsor Logos */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto z-10">
                                {sponsors.map((sponsor, index) => {
                                    const imageSrc = sponsorImages[sponsor.image];
                                    const url = sponsorURLs[sponsor.urlKey];
                                    
                                    return (
                                        <div 
                                            key={sponsor.key}
                                            className="animate-fade-up w-full"
                                            style={{ animationDelay: `${index * 100}ms` }}
                                        >
                                            <SponsorCard
                                                sponsor={sponsor}
                                                imageSrc={imageSrc}
                                                url={url}
                                                handleClick={handleClick}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <p className="lg:text-xl sm:text-lg font-grotesk text-pretty sm:px-10 z-50 shadow-text-sm animate-fade-up max-w-3xl">
                            Your sponsorship is crucial in bringing this event
                            to life. Every contribution you make will be
                            allocated to cover essential expenses, including
                            meals, branded apparel, and all necessary resources
                            for hosting a successful hackathon. By taking care
                            of these logistics, we will create an environment
                            where participants can fully immerse themselves in
                            the creative process. This support allows hackers to
                            develop and launch their innovative ideas, without
                            worrying about any concerns.
                        </p>
                    </div>
                    <a
                        href={hasCountdownEnded ? "mailto:contact@hackhayward.com" : "mailto:sponsor@hackhayward.com"}
                        className="relative bg-gradient-to-r from-[#c593e9] to-[#b57ed8] hover:from-[#cfb0e8] hover:to-[#c593e9] 
                            rounded-full p-4 px-8 transition-all duration-300 text-white lg:text-lg text-sm font-grotesk font-medium text-nowrap
                            shadow-[0_0_20px_rgba(197,147,233,0.3)] hover:shadow-[0_0_30px_rgba(197,147,233,0.5)]
                            hover:scale-105 active:scale-95 animate-fade-up z-50
                            before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r before:from-white/20 before:to-transparent 
                            before:opacity-0 hover:before:opacity-100 before:transition-opacity"
                        onClick={() => handleClick(hasCountdownEnded ? 'Contact Us' : 'Sponsor Us')}
                    >
                        <span className="relative z-10">{hasCountdownEnded ? 'Contact Us' : 'Sponsor Us'}</span>
                    </a>
                </section>
                <div className="opacity-50 absolute bottom-[30%] left-[-8%] max-h-[30%] max-w-[30%] animate-pulse">
                    <img src={uranus} loading="lazy" alt="Uranus" className="object-cover" />
                </div>
                
                {/* Ambient glow effects */}
                <div className="absolute top-1/4 right-[-10%] w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-neon-pulse"></div>
                <div className="absolute bottom-1/4 left-[-10%] w-80 h-80 bg-pink-500/10 rounded-full blur-[100px] animate-neon-pulse-delayed"></div>
            </div>
        </>
    );
}
