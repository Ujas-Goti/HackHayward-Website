import uranus from '/src/assets/imgs/Background/Uranus.webp';
import { useCountdown } from '../context/CountdownContext';
import { yearData } from '../data/yearData';
import PropTypes from 'prop-types';

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
            <div className="relative flex justify-center ">
                <section className="flex flex-col items-center justify-items-center gap-10 text-white max-w-screen-lg">
                    <div className="text-white text-center font-exo2 flex flex-col gap-9">
                        <h2 className="text-5xl text-balance font-bold shadow-text-sm">
                            Sponsors
                        </h2>
                        
                        <div className="flex flex-col gap-8">
                            {/* Sponsor Logos */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-items-center z-10">
                                {sponsors.map((sponsor) => {
                                    const imageSrc = sponsorImages[sponsor.image];
                                    const url = sponsorURLs[sponsor.urlKey];
                                    const padding = sponsor.padding || 'p-4';
                                    const maxWidth = sponsor.key === 'AWS' ? 'max-w-[299px]' : 'max-w-[300px]';
                                    
                                    return (
                                        <a 
                                            key={sponsor.key}
                                            href={url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            onClick={() => handleClick(sponsor.urlKey)}
                                            className={`block w-full ${maxWidth} transform transition-all duration-200 active:scale-95 hover:scale-[0.98]`}
                                        >
                                            <div className={`bg-white ${padding} rounded-lg w-full h-[100px] flex items-center justify-center overflow-hidden hover:bg-gray-50 transition-colors`}>
                                                <img 
                                                    src={imageSrc} 
                                                    alt={sponsor.alt} 
                                                    className={`${sponsor.height} object-contain ${sponsor.key === 'Smith Center' || sponsor.key === 'Perplexity' || sponsor.key === 'Groq' || sponsor.key === 'Redbull' ? 'mt-2' : ''} ${sponsor.key === 'CSUEB SOE' ? 'select-none' : ''}`}
                                                />
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        <p className="lg:text-xl sm:text-lg font-grotesk text-pretty sm:px-10 z-50 shadow-text-sm">
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
                        className="bg-[#c593e9] hover:bg-[#cfb0e8] rounded-full p-4 px-8 transition text-white lg:text-lg text-sm font-grotesk font-medium text-nowrap"
                        onClick={() => handleClick(hasCountdownEnded ? 'Contact Us' : 'Sponsor Us')}
                    >
                        {hasCountdownEnded ? 'Contact Us' : 'Sponsor Us'}
                    </a>
                </section>
                <div className="opacity-50 absolute bottom-[30%] left-[-8%] max-h-[30%] max-w-[30%]">
                    <img src={uranus} loading="lazy" alt="Uranus" className="object-cover" />
                </div>
            </div>
        </>
    );
}
