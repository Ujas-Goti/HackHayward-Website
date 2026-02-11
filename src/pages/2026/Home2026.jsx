import '../../App.css';

// Common Components
import NavBar from '../../Components/NavBar';
import Hero from '../../Components/Hero';
import FAQ from '../../Components/FAQ';
import AboutUs from '../../Components/AboutUs';
import Footer from '../../Components/Footer';
import PilotFalcon from '../../Components/PilotFalcon';
import Teams from '../../Components/Teams';
import Entrepreneurship from '../../Components/Entrepreneurship';
import Sponsor from '../../Components/Sponsor';
import ReactGA from 'react-ga4';
import { useEffect } from 'react';
import { yearData } from '../../data/yearData';
import { useCountdown } from '../../context/CountdownContext';

export default function Home2026() {
    const selectedYear = 2026;
    const currentYearData = yearData[selectedYear];
    const register = currentYearData.register;
    const { setHasCountdownEnded } = useCountdown();

    // Reset countdown state when navigating to 2026 page
    useEffect(() => {
        const targetDate = new Date(currentYearData.countdownDate);
        const now = new Date();
        setHasCountdownEnded(now >= targetDate);
    }, [currentYearData.countdownDate, setHasCountdownEnded]);

    //Scroll to top on load
    useEffect(()=>{
        setTimeout(()=>{
            window.scrollTo(0, 0);
        }, 100);
    }, []);

    useEffect(() => {
        const measurementId = import.meta.env.VITE_MEASUREMENT_ID;
        if (measurementId) {
            ReactGA.initialize(measurementId);
            ReactGA.send({
                hitType: 'pageview',
                page: '/',
                title: 'Home Page 2026',
            });
        } else {
            console.error('Google Analytics Measurement ID not found.');
        }
    }, []);

    return (
        <>
            <header id="home" className="overflow-x-hidden">
                <NavBar />
            </header>
            <main className="bg-gradient-to-b from-[#1A2773] via-[#46166C]/30 to-[#1A2773] overflow-x-hidden relative">
                {/* Background decorations with accent purple */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-[#46166C]/20 rounded-full blur-[150px]"></div>
                    <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-[#46166C]/15 rounded-full blur-[120px]"></div>
                    <div className="absolute top-[60%] left-[30%] w-[300px] h-[300px] bg-[#B794D4]/10 rounded-full blur-[100px]"></div>
                </div>
                
                <div className="relative z-10">
                    <section className="border-b-4 border-[#46166C]/50" data-scroll-section>
                        <Hero register={register} year={selectedYear} yearData={currentYearData} />
                    </section>
                    {/* Entrepreneurship */}
                    <section
                        className="pt-16 p-10 bg-[#1A2773]/50 overflow-hidden border-b-4 border-[#46166C]/50"
                        id="entrepreneurship"
                        data-scroll-section
                    >
                        <Entrepreneurship year={selectedYear} />
                    </section>
                    {/* about us */}
                    <section
                        className="pt-16 p-10 bg-gradient-to-r from-[#1A2773]/30 via-[#46166C]/20 to-[#1A2773]/30 max-w-screen-2xl:overflow-hidden"
                        id="about"
                        data-scroll-section
                    >
                        <AboutUs year={selectedYear} yearData={currentYearData} />
                    </section>
                    {/* FAQ */}
                    <section className="p-10 bg-[#1A2773]/50 overflow-hidden" id="faq" data-scroll-section>
                        <FAQ register={register} year={selectedYear} yearData={currentYearData} />
                    </section>
                    {/* Teams (orgs, speakers, judges, etc.) */}
                    <section
                        className="border-t-4 border-[#46166C]/50 overflow-hidden relative bg-gradient-to-b from-[#1A2773]/30 to-[#46166C]/20"
                        id="teams"
                        data-scroll-section
                    >
                        <Teams title="Meet the Teams" year={selectedYear} showSpeakers={false} />
                    </section>
                    {/* sponsor */}
                    <section
                        className="pb-16 p-10 bg-[#1A2773]/50 overflow-hidden"
                        id="sponsors"
                        data-scroll-section
                    >
                        <Sponsor year={selectedYear} />
                    </section>
                    {/* Scene */}
                    <section className="overflow-hidden" data-scroll-section>
                        <PilotFalcon />
                    </section>
                </div>
            </main>
            {/* footer */}
            <footer className="bg-[#131c54] border-t-4 border-[#46166C] overflow-hidden">
                <Footer register={register} />
            </footer>
        </>
    );
}

