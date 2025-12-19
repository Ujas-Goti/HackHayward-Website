// Common Components
import NavBar from '../../Components/NavBar';
import Hero from '../../Components/Hero';
import FAQ from '../../Components/FAQ';
import AboutUs from '../../Components/AboutUs';
import Footer from '../../Components/Footer';
import PilotFalcon from '../../Components/PilotFalcon';
import Teams from '../../Components/Teams';
import Sponsor from '../../Components/Sponsor';
import { yearData } from '../../data/yearData';
import { useEffect } from 'react';
import { useCountdown } from '../../context/CountdownContext';

export default function Home2025() {
    const selectedYear = 2025;
    const currentYearData = yearData[selectedYear];
    const register = currentYearData.register;
    const { setHasCountdownEnded } = useCountdown();

    // Reset countdown state when navigating to 2025 page
    useEffect(() => {
        const targetDate = new Date(currentYearData.countdownDate);
        const now = new Date();
        setHasCountdownEnded(now >= targetDate);
    }, [currentYearData.countdownDate, setHasCountdownEnded]);

    return (
        <>
            <header id="home" className="overflow-x-hidden">
                <NavBar />
            </header>
            <main className="mainBackground bg-contain bg-repeat-y overflow-x-hidden">
                <section className="border-b-8 border-[#c593e9]">
                    <Hero register={register} year={selectedYear} yearData={currentYearData} />
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
                    className="pb-16 p-10 bg-black/50 overflow-hidden"
                    id="teams"
                >
                    <Teams title="Meet the Teams" year={selectedYear} showSpeakers={true} />
                </section>
                {/* sponsor */}
                <section
                    className="pb-16 p-10 bg-black/50 overflow-hidden"
                    id="sponsors"
                >
                    <Sponsor />
                </section>
                {/* Scene */}
                <section className="overflow-hidden">
                    <PilotFalcon />
                </section>
            </main>
            {/* footer */}
            <footer className="bg-[rgb(48,37,45)] border-t-8 border-[#c593e9] overflow-hidden">
                <Footer register={register} />
            </footer>
        </>
    );
}

