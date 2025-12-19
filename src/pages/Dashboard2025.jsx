// src/pages/Dashboard2025.jsx
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

export default function Dashboard2025() {
  // const { hasCountdownEnded } = useCountdown();
  const register = "https://gdg.community.dev/events/details/google-gdg-on-campus-california-state-university-east-bay-hayward-united-states-presents-build-with-ai-hackhayward/";
  const eventStartDate = "2025-03-01T08:00:00"; // Event start date
  const submissionDeadline = "2025-03-02T10:00:00"; // Submission deadline
  
  // Words for the rotating text
  const rotatingWords = ["Live", "Happening", "Now", "Hacking", "Cooking", "Creating", "Innovating", "Building", "Collabing", "Learning", "Tinkering", "Vibing", "Slaying", "Bussin'", "Chilling"];
  
  // const handleClick = (platform) => {
  //   ReactGA.event({
  //       category: 'hackathon',
  //       action: 'Click',
  //       label: platform,
  //   });
  //   console.log(`Google Analytics Event: ${platform} clicked`);
  // };

  useEffect(() => {
    const measurementId = import.meta.env.VITE_MEASUREMENT_ID;
    if (measurementId) {
      ReactGA.send({
        hitType: 'pageview',
        page: '/live',
        title: 'Live Dashboard',
      });
    }
  }, []);

  // Define text shadow styles
  const textShadowStyle = {
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.7), 0 1px 2px rgba(0, 0, 0, 0.5)'
  };

  return (
    <>
    
      <header id="home" className="overflow-x-hidden">
        <NavBar />
      </header>
      <div className="bg-black/50">
      
        <main className="mainBackground bg-contain bg-repeat-y overflow-x-hidden">
          
          <section className="pt-36 px-4 md:px-10 bg-black/50 text-white relative pb-2">
            {/* Uranus positioned behind the rotating text */}
            <div className="absolute opacity-50 top-[10%] right-[-5%] max-h-[40%] max-w-[40%]">
              <img 
                  src={uranus} 
                  loading="lazy" 
                  alt="Uranus" 
                  className="object-cover" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold font-exo2 text-center mb-12 animate-fade-up relative z-10 max-w-4xl mx-auto" style={textShadowStyle}>
              <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                <span className="inline-block">HackHayward&apos;s</span>
                <RotatingText
                  texts={rotatingWords}
                  mainClassName="px-4 md:px-4 text-[#c593e9] overflow-hidden py-1 inline-flex justify-center rounded-xl relative mt-2 md:mt-0"
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
                <div className="bg-black/85 backdrop-blur-md p-6 rounded-lg border border-gray-800 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_35px_-5px_rgba(197,147,233,0.3)] transition-shadow duration-300">
                  <Suspense fallback={<LanyardFallback />}>
                    <ErrorBoundary FallbackComponent={LanyardFallback}>
                      <LanyardPreview year={2025} />
                    </ErrorBoundary>
                  </Suspense>
                </div>
                
                {/* Bottom Section - Event Info (columns on desktop) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6">
                  {/* Left Column - Event Schedule (wider) */}
                  <div className="bg-black/85 backdrop-blur-md p-6 rounded-lg border border-gray-800 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_35px_-5px_rgba(197,147,233,0.3)] transition-shadow duration-300 h-full order-2 md:order-1">
                    <EventSchedule year={2025} />
                  </div>
                  
                  {/* Right Column - Next Event and Countdown stacked */}
                  <div className="flex flex-col gap-6 md:gap-6 order-1 md:order-2">
                      {/* Time Remaining - Fixed height */}
                      <div className="bg-black/85 backdrop-blur-md p-6 rounded-lg border border-gray-800 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_35px_-5px_rgba(197,147,233,0.3)] transition-shadow duration-300 h-[180px] overflow-hidden">
                        <DashCountdown 
                          targetDate={submissionDeadline} 
                          eventStartDate={eventStartDate} 
                        />
                      </div>
                      
                      {/* Next Event - Increased min-height to prevent shadow cutoff */}
                      <div className="bg-black/85 backdrop-blur-md p-6 rounded-lg border border-gray-800 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_35px_-5px_rgba(197,147,233,0.3)] transition-shadow duration-300 min-h-[200px] overflow-hidden">
                        <NextEvent year={2025} />
                      </div>
                      {/* Hacker Devpost */}{/* Devpost Submission - Link to submit projects */}
                      <div className="bg-black/85 backdrop-blur-md p-6 rounded-lg border border-gray-800 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_35px_-5px_rgba(197,147,233,0.3)] transition-shadow duration-300 min-h-[200px] overflow-hidden">
                          <div className="h-full flex flex-col justify-center">
                            <h2 className="text-2xl font-bold font-exo2 mb-3 shadow-text">Submit Your Project</h2>
                              <div className="pb-1">
                                <h3 className="text-white/80 drop-shadow-sm mb-2">Ready to showcase your hack? Submit your project on Devpost!</h3>
                                <div className='flex justify-end'> 
                                  <a
                                    href="https://hackhayward-2025.devpost.com"
                                    className="bg-[#c593e9] hover:bg-[#cfb0e8] rounded-full p-3 transition text-white lg:text-lg text-sm font-grotesk font-medium text-nowrap m-3"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    Submit Here
                                  </a>
                                </div>
                              </div>
                          </div>
                        </div>
                        
                      {/* Hacker Guide - Link to HackHayward's ultimate guide to succeed */}
                      <div className="bg-black/85 backdrop-blur-md p-6 rounded-lg border border-gray-800 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_35px_-5px_rgba(197,147,233,0.3)] transition-shadow duration-300 min-h-[200px] overflow-hidden">
                        <div className="h-full flex flex-col justify-center">
                          <h2 className="text-2xl font-bold font-exo2 mb-3 shadow-text">Hacker Guide</h2>
                            <div className=" pb-1">
                              <h3 className=" text-white/80 drop-shadow-sm mb-2">Need a quick boost? Head over to our ultimate guide!</h3>
                              <div className='flex justify-end'> 
                                <a
                                  href="https://docs.google.com/document/d/1Qtth7iAm6ib8JzynNEPSM_HVshUlR-SKbytYHWyNg5w/edit?tab=t.0#heading=h.iwygb2m62l2x"
                                  className="bg-[#c593e9] hover:bg-[#cfb0e8] rounded-full p-3 transition text-white lg:text-lg text-sm font-grotesk font-medium text-nowrap m-3"
                                  target="_blank"
                                >
                                  Click Here!
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
      <footer className="bg-[rgb(48,37,45)] border-t-8 border-[#c593e9] overflow-hidden">
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