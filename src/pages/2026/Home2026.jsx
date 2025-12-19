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
            <main className="mainBackground bg-contain bg-repeat-y overflow-x-hidden relative">
                <div className="relative z-10">
                    <section className="border-b-8 border-[#c593e9]">
                        <Hero register={register} year={selectedYear} yearData={currentYearData} />
                    </section>
                    {/* Entrepreneurship */}
                    <section
                        className="pt-16 p-10 bg-black/50 overflow-hidden border-b-8 border-[#c593e9]"
                        id="entrepreneurship"
                    >
                        <Entrepreneurship year={selectedYear} />
                    </section>
                    {/* about us */}
                    <section
                        className="pt-16 p-10 bg-black/50 max-w-screen-2xl:overflow-hidden"
                        id="about"
                    >
                        <AboutUs year={selectedYear} yearData={currentYearData} />
                    </section>
                    {/* FAQ */}
                    <section className="p-10 bg-black/50 overflow-hidden" id="faq">
                        <FAQ register={register} year={selectedYear} yearData={currentYearData} />
                    </section>
                    {/* Teams (orgs, speakers, judges, etc.) */}
                    <section
                        className="border-t-8 border-[#c593e9] overflow-hidden relative bg-black/50"
                        id="teams"
                    >
                        <Teams title="Meet the Teams" year={selectedYear} showSpeakers={false} />
                    </section>
                    {/* Scene */}
                    <section className="overflow-hidden">
                        <PilotFalcon />
                    </section>
                </div>
            </main>
            {/* footer */}
            <footer className="bg-[rgb(48,37,45)] border-t-8 border-[#c593e9] overflow-hidden">
                <Footer register={register} />
            </footer>
        </>
    );
}

