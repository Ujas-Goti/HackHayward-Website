import PropTypes from 'prop-types';
import heroMobile from '/src/assets/imgs/hero/HeroScene-mobile.webp';
import heroDesktop from '/src/assets/imgs/hero/HeroScene.webp';
import astro from '/src/assets/imgs/hero/Astro.webp';
import ReactGA from 'react-ga4';
import CountdownTimer from './CountdownTimer';
import { useCountdown } from '../context/CountdownContext';
import ShinyText from './ShinyText';
import { Link } from 'react-router-dom';

Hero.propTypes = {
    register: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    yearData: PropTypes.object.isRequired,
};

export default function Hero(props) {
    const { hasCountdownEnded } = useCountdown();
    const { year, yearData } = props;
    
    const handleClick = (platform) => {
        ReactGA.event({
            category: 'hackathon',
            action: 'Click',
            label: platform,
        });
        console.log(`Google Analytics Event: ${platform} clicked`);
    };

    const is2026 = props.year === 2026;

    return (
        <>
            {/* Title */}
            <div className={`${is2026 ? 'bg-gradient-to-br from-[#1a0f1a] via-[#30252d] to-[#1a0f1a]' : 'bg-[#30252d]'} min-h-[calc(100vh-8rem)] grid grid-cols-10 pt-24 relative overflow-hidden`}>
                {is2026 && (
                    <>
                        {/* Futuristic background effects */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c593e9]/10 to-transparent animate-pulse"></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(197,147,233,0.1),transparent_70%)]"></div>
                    </>
                )}
                <div className="text-white col-[2/10] row-[1] place-content-center z-10 flex flex-col gap-6">
                    <h1 className={`lg:text-6xl sm:text-4xl text-4xl max-[340px]:text-4xl font-bold z-3 max-lg:text-center font-exo2 animate-fade-up shadow-text ${is2026 ? 'text-white drop-shadow-[0_0_20px_rgba(197,147,233,0.6),0_0_40px_rgba(197,147,233,0.4)]' : ''}`}>
                        {is2026 ? (
                            <>
                                Hackhayward 2026: Build with AI
                                <br className="mb-4" />
                                <span className="inline-block mt-4">+ An Entrepreneurial Eye</span>
                            </>
                        ) : (
                            yearData.title
                        )}
                    </h1>
                    {/* Tagline or mission statement */}
                    {/* <p className="lg:text-3xl text-xl mt-2 max-lg:text-center font-thin animate-fade-up shadow-text">
                        Innovate. Create. Collaborate.
                    </p> */}
                    {/* <p className="lg:text-4xl text-2xl mt-2 max-lg:text-center font-grotesk animate-fade-up shadow-text">
                        Hosted by:
                        <br />
                        <p className="lg:text-3xl text-xl font-thin">
                            Department of Computer Science @ CSUEB
                        </p>
                    </p> */}
                    <p className={`lg:text-4xl text-2xl max-lg:text-center font-grotesk animate-fade-up shadow-text ${is2026 ? 'text-[#c593e9] font-semibold' : ''}`}>
                        {yearData.dates}
                    </p>
                    
                    {/* Countdown Timer - only shown before event starts */}
                    {!hasCountdownEnded && (
                        <div className="flex gap-4 max-lg:justify-center animate-fade-up">
                            <div className={`${is2026 ? 'bg-gradient-to-br from-black/40 via-black/30 to-black/40 backdrop-blur-md border border-[#c593e9]/30 shadow-[0_0_20px_rgba(197,147,233,0.3)]' : 'bg-black/30 backdrop-blur-sm'} p-1 pb-4 rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.5)]`}>
                                <div className="animate-fade-up">
                                    <CountdownTimer targetDate={yearData.countdownDate} />
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Conditional rendering based on countdown status */}
                    {is2026 ? (
                        // 2026: Show two separate buttons with space between them
                        <div className="flex gap-4 max-lg:flex-col max-lg:items-center font-mono lg:pb-0 max-[375px]:pb-4">
                            {/* Register Button - Purple */}
                            <a
                                className="bg-gradient-to-r from-[#c593e9] to-[#a06bc9] hover:from-[#cfb0e8] hover:to-[#b88dd4] text-white lg:h-16 h-12 lg:px-14 px-10 rounded-full
                                transition-all duration-300 max-lg:text-sm lg:text-base font-semibold text-center flex items-center justify-center shadow-[0_0_20px_rgba(197,147,233,0.4)] hover:shadow-[0_0_30px_rgba(197,147,233,0.6)] animate-flip-up"
                                target="_blank"
                                href={props.register}
                                onClick={() => handleClick('Register')}
                            >
                                Register
                            </a>
                            {/* Live Dashboard Button - Transparent with white border, white on hover */}
                            <Link
                                className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#c593e9] lg:h-16 h-12 lg:px-14 px-10 rounded-full
                                transition-all duration-300 max-lg:text-sm lg:text-base font-semibold text-center flex items-center justify-center gap-2 animate-flip-up"
                                to="/live-2026"
                                onClick={() => handleClick('View Live Dashboard')}
                            >
                                {/* Live indicator dot with pulsing animation - changes color on hover */}
                                <div className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75 group-hover:bg-[#c593e9]"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white group-hover:bg-[#c593e9]"></span>
                                </div>
                                <span className="font-semibold tracking-wide lg:text-base text-white group-hover:text-[#c593e9] transition-colors duration-300">
                                    Live Dashboard
                                </span>
                            </Link>
                        </div>
                    ) : hasCountdownEnded ? (
                        // 2025: Countdown ended - Show View Live Dashboard button
                        <div className="flex gap-4 max-lg:justify-center lg:mt-4 mt-2 font-mono lg:pb-0 max-[375px]:pb-4">
                            <Link
                                className="bg-[#c593e9] hover:bg-[#cfb0e8] text-white lg:h-16 lg:px-14 h-12 px-7
                                transition-all duration-300 max-lg:text-sm rounded-full animate-flip-up text-center flex items-center"
                                to="/live"
                                onClick={() => handleClick('View Live Dashboard')}
                            >
                                <div className="flex items-center gap-2">
                                    {/* Live indicator dot with pulsing animation */}
                                    <div className="relative flex h-2.5 w-2.5 mr-1">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                                    </div>
                                    <ShinyText 
                                        text="View Live Dashboard" 
                                        disabled={false} 
                                        speed={1.5} 
                                        className="font-semibold text-white tracking-wide lg:text-lg" 
                                    />
                                </div>
                            </Link>
                        </div>
                    ) : (
                        // 2025: Countdown still active - Show Register button only
                        <div className="flex gap-4 max-lg:justify-center lg:mt-4 mt-2 font-mono lg:pb-0 max-[375px]:pb-4">
                            <a
                                className="bg-[#c593e9] hover:bg-[#cfb0e8] text-white lg:h-16 lg:px-14 h-12 px-6 pr-10
                                transition max-lg:text-sm rounded-full animate-flip-up text-center flex items-center"
                                target="_blank"
                                href={props.register}
                                onClick={() => handleClick('Register')}
                            >
                                {/* Invisible span to reserve width */}
                                <span className="absolute inset-0 flex items-center justify-center">Register</span>
                                {/* Actual visible text */}
                                <span className="invisible">Pre-Register</span>
                            </a>
                        </div>
                    )}
                </div>
                <div className="col-[1/11] row-[1] place-self-end z-0">
                    <div className="relative">
                        <picture>
                            <source
                                srcSet={heroMobile}
                                media="(max-width: 26.5625rem)"
                            />
                            <img
                                src={heroDesktop}
                                alt="A space cave background scene with warm yellow lighting"
                                className="object-contain max-h-[calc(100vh-2rem)]"
                            />
                        </picture>

                        <img
                            src={astro}
                            alt="A cartoon astronaut falcon mascot in a space suit, floating in space"
                            className="absolute bottom-[1%] right-[3%] h-[80%] w-[80%] object-contain
        animate-wiggle animate-infinite animate-duration-[10000ms] animate-delay-1000 animate-ease-in-out"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
