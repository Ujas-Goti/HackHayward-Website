// src/pages/Dashboard2026.jsx
import { useEffect, Suspense } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import NavBar from '../Components/NavBar';
import EventSchedule from '../Components/EventSchedule';
import NextEvent from '../Components/NextEvent';
import LanyardPreview from '../Components/LanyardPreview';
import DashCountdown from '../Components/DashCountdown';
import RotatingText from '../Components/RotatingText';
import Footer from '../Components/Footer';
import ReactGA from 'react-ga4';

// Import planet images for background
import uranus from '/src/assets/imgs/Background/Uranus.webp';
import mars from '/src/assets/imgs/Background/Saturn.webp';

// Fallback component for when 3D rendering fails
const LanyardFallback = () => (
  <div>
    <h2 className="text-3xl font-bold font-exo2 mb-4">Your HackHayward Badge</h2>
    <p className="text-white/80 mb-4 font-grotesk">
      Badge preview unavailable. Please try again later.
    </p>
    <div className="h-[400px] bg-gradient-to-b from-[#30252d]/50 to-[#261e24]/50 rounded-lg flex items-center justify-center">
      <div className="text-center p-6">
        <div className="text-2xl mb-2">📛</div>
        <p>3D Badge Preview</p>
        <p className="text-sm opacity-70 mt-2">Unable to load 3D preview</p>
      </div>
    </div>
  </div>
);

export default function Dashboard2026() {
  const register = "https://gdg.community.dev/events/details/google-gdg-on-campus-california-state-university-east-bay-hayward-united-states-presents-build-with-ai-hackhayward/";
  const eventStartDate = "2026-03-21T08:00:00"; // Event start date
  const submissionDeadline = "2026-03-22T10:00:00"; // Submission deadline
  
  // Words for the rotating text
  const rotatingWords = ["Live", "Happening", "Now", "Hacking", "Cooking", "Creating", "Innovating", "Building", "Collabing", "Learning", "Tinkering", "Vibing", "Slaying", "Bussin'", "Chilling"];

  useEffect(() => {
    const measurementId = import.meta.env.VITE_MEASUREMENT_ID;
    if (measurementId) {
      ReactGA.send({
        hitType: 'pageview',
        page: '/live',
        title: 'Live Dashboard 2026',
      });
    }
  }, []);

  // Define text shadow styles
  const textShadowStyle = {
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.7), 0 1px 2px rgba(0, 0, 0, 0.5)'
  };
  const cardClass = "bg-gradient-to-br from-[#0b1238]/70 via-[#101b52]/60 to-[#1b1459]/55 backdrop-blur-xl p-6 rounded-xl border border-[#B794D4]/35 shadow-[0_20px_45px_-20px_rgba(0,0,0,0.85),0_0_24px_rgba(183,148,212,0.18)] hover:shadow-[0_24px_55px_-18px_rgba(0,0,0,0.9),0_0_35px_rgba(183,148,212,0.3)] hover:border-[#B794D4]/55 transition-all duration-300";
  const actionButtonClass = "bg-gradient-to-r from-[#B794D4] to-[#8F6BC6] hover:from-[#c7a9df] hover:to-[#a387d2] rounded-full p-3 transition text-white lg:text-lg text-sm font-grotesk font-medium text-nowrap m-3 opacity-55 cursor-not-allowed shadow-[0_0_18px_rgba(183,148,212,0.32)]";

  return (
    <>
      <header id="home" className="overflow-x-hidden">
        <NavBar />
      </header>
      <div className="bg-gradient-to-b from-[#0a123d] via-[#1A2773] to-[#130b3f]">
        <main className="overflow-x-hidden">
          <section className="pt-36 px-4 md:px-10 bg-gradient-to-b from-[#1A2773]/55 via-[#22175f]/45 to-[#0d1440]/65 text-white relative pb-2 overflow-hidden">
            {/* Futuristic background effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#B794D4]/10 to-transparent animate-pulse"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(183,148,212,0.15),transparent_70%)]"></div>
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(183,148,212,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(183,148,212,0.12)_1px,transparent_1px)] bg-[size:34px_34px] pointer-events-none"></div>
            <div className="absolute top-[-10%] left-[20%] w-[320px] h-[320px] bg-[#7b5ac8]/25 blur-[110px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-5%] right-[15%] w-[360px] h-[360px] bg-[#4ea2ff]/20 blur-[130px] rounded-full pointer-events-none"></div>
            
            {/* Uranus positioned behind the rotating text */}
            <div className="absolute opacity-50 top-[10%] right-[-5%] max-h-[40%] max-w-[40%] z-0">
              <img 
                  src={uranus} 
                  loading="lazy" 
                  alt="Uranus" 
                  className="object-cover" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold font-exo2 text-center mb-12 animate-fade-up relative z-10 max-w-4xl mx-auto text-white drop-shadow-[0_0_20px_rgba(183,148,212,0.6),0_0_40px_rgba(183,148,212,0.4)]" style={textShadowStyle}>
              <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-grotesk bg-[#0f1f63]/70 border border-[#B794D4]/60 text-[#D7E4FF] mb-5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#8BFFB0] animate-pulse" />
                2026 Live Command Center
              </span>
              <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                <span className="inline-block">HackHayward 2026&apos;s</span>
                <RotatingText
                  texts={rotatingWords}
                  mainClassName="px-4 md:px-4 text-[#B794D4] overflow-hidden py-1 inline-flex justify-center rounded-xl relative mt-2 md:mt-0"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden py-1"
                  elementLevelClassName="my-0.5 pt-0.5 pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </div>
            </h1>
            
            <div className="max-w-4xl mx-auto">
              {/* Main content grid */}
              <div className="grid grid-cols-1 gap-6 mb-6 relative z-10">
                {/* Top Section - Badge Preview */}
                <div className={cardClass}>
                  <Suspense fallback={<LanyardFallback />}>
                    <ErrorBoundary FallbackComponent={LanyardFallback}>
                      <LanyardPreview year={2026} />
                    </ErrorBoundary>
                  </Suspense>
                </div>
                
                {/* Bottom Section - Event Info (columns on desktop) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6">
                  {/* Left Column - Event Schedule (wider) */}
                  <div className={`${cardClass} h-full order-2 md:order-1`}>
                    <EventSchedule year={2026} />
                  </div>
                  
                  {/* Right Column - Next Event and Countdown stacked */}
                  <div className="flex flex-col gap-6 md:gap-6 order-1 md:order-2">
                      {/* Time Remaining - Fixed height */}
                      <div className={`${cardClass} h-[180px] overflow-hidden`}>
                        <DashCountdown 
                          targetDate={submissionDeadline} 
                          eventStartDate={eventStartDate} 
                        />
                      </div>
                      
                      {/* Next Event - Increased min-height to prevent shadow cutoff */}
                      <div className={`${cardClass} min-h-[200px] overflow-hidden`}>
                        <NextEvent year={2026} />
                      </div>
                      {/* Hacker Devpost */}
                      <div className={`${cardClass} min-h-[200px] overflow-hidden`}>
                          <div className="h-full flex flex-col justify-center">
                            <h2 className="text-2xl font-bold font-exo2 mb-3 shadow-text text-white drop-shadow-[0_0_10px_rgba(183,148,212,0.5)]">Submit Your Project</h2>
                              <div className="pb-1">
                                <h3 className="text-white/80 drop-shadow-sm mb-2">Ready to showcase your hack? Submit your project on Devpost!</h3>
                                <div className='flex justify-end'> 
                                  <a
                                    href="#"
                                    className={actionButtonClass}
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    To Be Decided
                                  </a>
                                </div>
                              </div>
                          </div>
                        </div>
                        
                      {/* Hacker Guide */}
                      <div className={`${cardClass} min-h-[200px] overflow-hidden`}>
                        <div className="h-full flex flex-col justify-center">
                          <h2 className="text-2xl font-bold font-exo2 mb-3 shadow-text text-white drop-shadow-[0_0_10px_rgba(183,148,212,0.5)]">Hacker Guide</h2>
                            <div className=" pb-1">
                              <h3 className=" text-white/80 drop-shadow-sm mb-2">Need a quick boost? Head over to our ultimate guide!</h3>
                              <div className='flex justify-end'> 
                                <a
                                  href="#"
                                  className={actionButtonClass}
                                  onClick={(e) => e.preventDefault()}
                                >
                                  To Be Decided
                                </a>
                              </div>
                            </div>
                        </div>
                        </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Only Mars remains in its original position */}
            <div className="absolute opacity-[40%] bottom-[20%] left-[-10%] max-h-[30%] max-w-[30%] z-0 pointer-events-none">
              <img src={mars} loading="lazy" alt="Mars" className="object-cover" />
            </div>
          </section>
        </main>
      </div>
      <footer className="bg-[#131c54] border-t-4 border-[#46166C] overflow-hidden">
        <Footer register={register} />
      </footer>
    </>
  );
}

// ErrorBoundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("3D Rendering error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.FallbackComponent ? <this.props.FallbackComponent /> : <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  FallbackComponent: PropTypes.elementType
};

