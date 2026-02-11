import '../../App.css';

// Common Components
import NavBar from '../../Components/NavBar';
import Footer from '../../Components/Footer';
import WhySponsorUs from '../../Components/WhySponsorUs';
import ReactGA from 'react-ga4';
import { useEffect } from 'react';
import { yearData } from '../../data/yearData';

export default function SponsorUs2026() {
    const selectedYear = 2026;
    const currentYearData = yearData[selectedYear];
    const register = currentYearData.register;

    //Scroll to top on load
    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 100);
    }, []);

    useEffect(() => {
        const measurementId = import.meta.env.VITE_MEASUREMENT_ID;
        if (measurementId) {
            ReactGA.initialize(measurementId);
            ReactGA.send({
                hitType: 'pageview',
                page: '/sponsor-us',
                title: 'Sponsor Us Page 2026',
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
            <main className="bg-gradient-to-b from-[#1A2773] via-[#46166C]/30 to-[#1A2773] overflow-x-hidden relative min-h-screen">
                {/* Background decorations with accent purple */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-[#46166C]/20 rounded-full blur-[150px]"></div>
                    <div className="absolute bottom-[20%] left-[-10%] w-[400px] h-[400px] bg-[#46166C]/15 rounded-full blur-[120px]"></div>
                    <div className="absolute top-[60%] left-[30%] w-[300px] h-[300px] bg-[#B794D4]/10 rounded-full blur-[100px]"></div>
                </div>
                
                <div className="relative z-10 pt-24">
                    {/* Why Sponsor Us section */}
                    <WhySponsorUs contactEmail="csueastbaygdsc@gmail.com" />
                </div>
            </main>
            {/* footer */}
            <footer className="bg-[#131c54] border-t-4 border-[#46166C] overflow-hidden">
                <Footer register={register} />
            </footer>
        </>
    );
}
