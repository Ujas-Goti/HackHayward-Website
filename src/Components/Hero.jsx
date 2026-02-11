import PropTypes from 'prop-types';
import { useEffect } from 'react';
import heroMobile from '/src/assets/imgs/hero/HeroScene-mobile.webp';
import heroDesktop from '/src/assets/imgs/hero/HeroScene.webp';
import astro from '/src/assets/imgs/hero/Astro.webp';
import saturn from '/src/assets/imgs/Background/Saturn.webp';
import jupiter from '/src/assets/imgs/Background/Jupiter.webp';
import mars from '/src/assets/imgs/Background/Mars.webp';
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

    // Modern 2026 Hero Design
    if (is2026) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#1A2773] via-[#46166C] to-[#1A2773] relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Gradient orbs with accent purple */}
                    <div className="absolute top-[5%] right-[10%] w-[500px] h-[500px] bg-[#46166C]/50 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[10%] left-[5%] w-[400px] h-[400px] bg-[#46166C]/40 rounded-full blur-[100px]"></div>
                    <div className="absolute top-[50%] left-[50%] w-[300px] h-[300px] bg-[#B794D4]/20 rounded-full blur-[80px]"></div>
                    
                    {/* Planet decorations */}
                    <img 
                        src={saturn} 
                        alt="" 
                        className="absolute top-[15%] right-[-5%] w-[250px] opacity-60"
                    />
                    <img 
                        src={jupiter} 
                        alt="" 
                        className="absolute bottom-[10%] left-[-8%] w-[350px] opacity-40"
                    />
                    
                    {/* Star particles */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%222%22%20cy%3D%222%22%20r%3D%221%22%20fill%3D%22white%22%20fill-opacity%3D%220.3%22%2F%3E%3C%2Fsvg%3E')] opacity-50"></div>
                </div>

                {/* Main content */}
                <div className="relative z-10 min-h-screen flex items-center">
                    <div className="w-full max-w-6xl mx-auto px-6 lg:px-24 pt-40 pb-12">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
                            {/* Left side - Text content */}
                            <div className="text-white space-y-5 text-center lg:text-left max-w-xl lg:max-w-2xl mx-auto lg:mx-0 order-2 lg:order-1">
                                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-exo2 leading-tight">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B794D4] via-[#c593e9] to-[#B794D4] whitespace-nowrap">
                                        Hackhayward 2026
                                    </span>
                                    <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B794D4] via-[#c593e9] to-[#B794D4] whitespace-nowrap">
                                        Build with AI
                                    </span>
                                    <br />
                                    <span className="inline-block mt-2 text-2xl sm:text-3xl lg:text-4xl text-[#C5D4F0]">
                                        + An Entrepreneurial Eye
                                    </span>
                                </h1>
                                
                                <p className="text-lg lg:text-xl font-grotesk text-white max-w-xl mx-auto lg:mx-0">
                                    Fostering Innovation, Empowering Talent:
                                    <br />
                                    <span className="font-semibold text-white">Building the Future of Tech</span>
                                </p>
                                
                                <div className="text-[#C5D4F0] text-lg lg:text-xl font-semibold shadow-text-sm">
                                    {yearData.dates}
                                </div>
                                
                                {/* Countdown Timer */}
                                {!hasCountdownEnded && (
                                    <div className="flex max-lg:justify-center">
                                        <div className="bg-black/30 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-lg shadow-black/60">
                                            <CountdownTimer targetDate={yearData.countdownDate} />
                                        </div>
                                    </div>
                                )}
                                
                                {/* CTA Section */}
                                <div className="space-y-4 pt-2">
                                    <p className="text-[#C5D4F0] text-base font-grotesk">
                                        Become part of something amazing!
                                    </p>
                                    <div className="flex gap-4 max-lg:justify-center flex-wrap">
                                        <a
                                            className="bg-[#B794D4] hover:bg-[#c593e9] text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg shadow-[#46166C]/50 hover:shadow-[#B794D4]/50 hover:shadow-xl hover:scale-105"
                                            target="_blank"
                                            href={props.register}
                                            onClick={() => handleClick('Register')}
                                        >
                                            Apply Here
                                        </a>
                                        <a
                                            className="bg-transparent border-2 border-[#B794D4] text-[#B794D4] hover:bg-[#B794D4] hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105"
                                            href="#why-sponsor"
                                            onClick={() => handleClick('Sponsor Us')}
                                        >
                                            Sponsor Us
                                        </a>
                                    </div>
                                </div>
                                
                                {/* Scroll indicator */}
                                <div className="pt-6 hidden lg:block">
                                    <p className="text-[#C5D4F0]/60 text-sm font-grotesk flex items-center gap-2">
                                        <span className="animate-bounce">↓</span>
                                        Scroll to know more about us
                                    </p>
                                </div>
                            </div>
                            
                            {/* Right side - Astro mascot with floating elements */}
                            <div className="relative flex justify-center items-center order-1 lg:order-2">
                                {/* Floating stars around the Astro */}
                                <div className="absolute top-[5%] right-[10%] w-3 h-3 bg-yellow-300 rounded-full animate-pulse opacity-80" style={{ animationDuration: '2s' }}></div>
                                <div className="absolute top-[15%] left-[5%] w-2 h-2 bg-yellow-400 rounded-full animate-pulse opacity-70" style={{ animationDuration: '3s' }}></div>
                                <div className="absolute top-[25%] right-[25%] w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-60" style={{ animationDuration: '4s' }}></div>
                                <div className="absolute bottom-[20%] right-[5%] w-3 h-3 bg-yellow-400 rounded-full animate-pulse opacity-75" style={{ animationDuration: '2.5s' }}></div>
                                <div className="absolute bottom-[35%] left-[10%] w-2 h-2 bg-yellow-300 rounded-full animate-ping opacity-50" style={{ animationDuration: '3.5s' }}></div>
                                <div className="absolute top-[40%] right-[5%] w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse opacity-60" style={{ animationDuration: '2s' }}></div>
                                <div className="absolute bottom-[10%] left-[25%] w-2 h-2 bg-yellow-300 rounded-full animate-pulse opacity-70" style={{ animationDuration: '3s' }}></div>
                                
                                {/* Mars planet floating */}
                                <img 
                                    src={mars} 
                                    alt="" 
                                    className="absolute bottom-[5%] right-[0%] w-[80px] lg:w-[120px] opacity-50 animate-float"
                                    style={{ animationDuration: '10s' }}
                                />
                                
                                {/* Extra glow orbs */}
                                <div className="absolute top-[10%] left-[20%] w-[150px] h-[150px] bg-[#B794D4]/20 rounded-full blur-[60px]"></div>
                                <div className="absolute bottom-[15%] right-[10%] w-[100px] h-[100px] bg-[#46166C]/30 rounded-full blur-[50px]"></div>
                                
                                {/* Sparkle effects */}
                                <div className="absolute top-[30%] left-[15%] text-yellow-300/50 text-2xl animate-spin" style={{ animationDuration: '8s' }}>✦</div>
                                <div className="absolute bottom-[25%] right-[20%] text-yellow-400/60 text-xl animate-spin" style={{ animationDuration: '10s', animationDirection: 'reverse' }}>✦</div>
                                <div className="absolute top-[60%] right-[8%] text-yellow-300/40 text-lg animate-pulse" style={{ animationDuration: '2s' }}>✧</div>
                                
                                <div className="relative">
                                    <div className="absolute inset-0 bg-[#46166C]/60 rounded-full blur-[100px] scale-90" />
                                    <div className="absolute inset-0 bg-[#B794D4]/30 rounded-full blur-[80px] scale-75" />
                                    <img
                                        src={astro}
                                        alt="HackHayward Falcon Mascot"
                                        className="relative z-10 w-[650px] sm:w-[750px] lg:w-[850px] xl:w-[950px] object-contain drop-shadow-2xl animate-wiggle animate-infinite animate-duration-[6000ms] animate-ease-in-out rotate-[22deg]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Original 2025 Hero Design (kept for backwards compatibility)
    return (
        <>
            {/* Title */}
            <div className="bg-[#30252d] min-h-[calc(100vh-8rem)] grid grid-cols-10 pt-24 relative overflow-hidden">
                <div className="text-white col-[2/10] row-[1] place-content-center z-10 flex flex-col gap-6">
                    <h1 className="lg:text-6xl sm:text-4xl text-4xl max-[340px]:text-4xl font-bold z-3 max-lg:text-center font-exo2 animate-fade-up shadow-text">
                        {yearData.title}
                    </h1>
                    <p className="lg:text-4xl text-2xl max-lg:text-center font-grotesk animate-fade-up shadow-text">
                        {yearData.dates}
                    </p>
                    
                    {/* Countdown Timer - only shown before event starts */}
                    {!hasCountdownEnded && (
                        <div className="flex gap-4 max-lg:justify-center animate-fade-up">
                            <div className="bg-black/30 backdrop-blur-sm p-1 pb-4 rounded-lg shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
                                <div className="animate-fade-up">
                                    <CountdownTimer targetDate={yearData.countdownDate} />
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* Conditional rendering based on countdown status */}
                    {hasCountdownEnded ? (
                        <div className="flex gap-4 max-lg:justify-center lg:mt-4 mt-2 font-mono lg:pb-0 max-[375px]:pb-4">
                            <Link
                                className="bg-[#c593e9] hover:bg-[#cfb0e8] text-white lg:h-16 lg:px-14 h-12 px-7
                                transition-all duration-300 max-lg:text-sm rounded-full animate-flip-up text-center flex items-center"
                                to="/live"
                                onClick={() => handleClick('View Live Dashboard')}
                            >
                                <div className="flex items-center gap-2">
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
                        <div className="flex gap-4 max-lg:justify-center lg:mt-4 mt-2 font-mono lg:pb-0 max-[375px]:pb-4">
                            <a
                                className="bg-[#c593e9] hover:bg-[#cfb0e8] text-white lg:h-16 lg:px-14 h-12 px-6 pr-10
                                transition max-lg:text-sm rounded-full animate-flip-up text-center flex items-center"
                                target="_blank"
                                href={props.register}
                                onClick={() => handleClick('Register')}
                            >
                                <span className="absolute inset-0 flex items-center justify-center">Register</span>
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
