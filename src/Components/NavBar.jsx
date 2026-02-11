import MLH from './MLH';
import logo from '/src/assets/imgs/others/Monotone Logo.webp';
import hamburger from '/src/assets/imgs/others/hamburger_Icon.svg';
import { useCountdown } from '../context/CountdownContext';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import PropTypes from 'prop-types';
import ShinyText from './ShinyText';


function NavButtons() {
    const { hasCountdownEnded } = useCountdown();
    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === '/';
    const is2026Page = location.pathname === '/' || location.pathname === '/live-2026' || location.pathname === '/sponsor-us';
    const is2025Page = location.pathname === '/past-years' || location.pathname === '/live';
    const isSponsorUsPage = location.pathname === '/sponsor-us';
    
    // Base links without Live
    const baseLinks = [{ text: 'About' }, { text: 'FAQ' }, { text: 'Teams' }, { text: 'Sponsors' }];
    const baseLinks2026 = [{ text: 'About' }, { text: 'Entrepreneurship' }, { text: 'FAQ' }, { text: 'Teams' }, { text: 'Sponsors' }, { text: 'Sponsor Us', path: '/sponsor-us' }];
    
    // Determine which links to show based on current page
    let links = [];
    if (is2026Page) {
        // On 2026 page: show main sections and Past Year, include Entrepreneurship link
        links = [...baseLinks2026, { text: 'Past Year', path: '/past-years' }];
    } else if (is2025Page) {
        // On 2025 page: show main sections and link back to 2026
        links = [...baseLinks, { text: '2026', path: '/' }];
    } else {
        // Default fallback (e.g., other routes)
        links = [...baseLinks, { text: 'Past Year', path: '/past-years' }];
    }

    // Handle section link click - instant scroll for speed
    const handleSectionClick = (e, sectionId) => {
        e.preventDefault();
        
        if (isSponsorUsPage) {
            // Navigate to home page first, then scroll to section
            navigate('/');
            // Wait for navigation to complete, then scroll
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'instant', block: 'start' });
                }
            }, 100);
        } else {
            // Already on the page, just scroll instantly
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'instant', block: 'start' });
            }
        }
    };

    return (
        <>
            {links.map((link, index) => (
                <li key={index} className="px-2 lg:hover:scale-105 transition-all duration-200">
                    {link.path ? (
                        <Link
                            to={link.path}
                            className={`text-white/90 hover:text-white text-lg font-grotesk font-medium flex items-center ${is2026Page ? 'hover:text-hack-lavender' : ''}`}
                            title={link.text === 'Live' ? '' : ''}
                        >
                            {link.text === 'Live' ? (
                                <span className="relative flex items-center group">
                                    <div className="flex items-center gap-1.5">
                                        {/* Live indicator dot with pulsing animation */}
                                        <div className="relative flex h-2 w-2">
                                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${is2026Page ? 'bg-hack-lavender' : 'bg-[#c593e9]'} opacity-75`}></span>
                                            <span className={`relative inline-flex rounded-full h-2 w-2 ${is2026Page ? 'bg-hack-lavender' : 'bg-[#c593e9]'}`}></span>
                                        </div>
                                        
                                        {/* Shiny Live text */}
                                        <ShinyText 
                                            text="Live" 
                                            disabled={false} 
                                            speed={3} 
                                            className={`text-lg font-bold ${is2026Page ? 'text-hack-lavender' : 'text-[#c593e9]'}`}
                                        />
                                    </div>
                                    
                                    {/* Tooltip on hover */}
                                    <span className={`absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity duration-300 bottom-[-30px] left-1/2 transform -translate-x-1/2 ${is2026Page ? 'bg-hack-navy-dark border-hack-lavender/30' : 'bg-[#261e24] border-[#c593e9]/30'} text-white text-xs py-1 px-2 rounded whitespace-nowrap border shadow-lg z-50`}>
                                        Event Dashboard
                                    </span>
                                </span>
                            ) : link.text}
                        </Link>
                    ) : (
                        <a
                            href={`#${link.text.toLowerCase().replaceAll(' ', '-')}`}
                            onClick={(e) => handleSectionClick(e, link.text.toLowerCase().replaceAll(' ', '-'))}
                            className={`text-white/90 hover:text-white text-lg font-grotesk font-medium flex items-center transition-colors ${is2026Page ? 'hover:text-hack-lavender' : ''}`}
                        >
                            {link.text}
                        </a>
                    )}
                </li>
            ))}
        </>
    );
}

function BackButton({ isMobile = false }) {
    const location = useLocation();
    const is2026Page = location.pathname === '/live-2026';
    // Determine which home page to go back to based on current dashboard
    const homePath = is2026Page ? '/' : '/past-years';
    
    return (
        <li className={`px-2 transition ${isMobile ? 'w-full' : ''}`}>
            <Link
                to={homePath}
                className={`text-white font-grotesk font-medium flex items-center gap-2 
                ${isMobile ? 'text-base py-2 px-3' : `text-lg ${is2026Page ? 'bg-[#46166C] hover:bg-[#5a1d8a]' : 'bg-[#c593e9] hover:bg-[#cfb0e8]'} transition-all duration-200 py-2 px-5 rounded-full hover:scale-105`}`}
            >
                <FaArrowLeft /> {isMobile ? 'Back' : 'Back to Home'}
            </Link>
        </li>
    );
}

BackButton.propTypes = {
    isMobile: PropTypes.bool
};

export default function NavBar() {
    const location = useLocation();
    const isLivePage = location.pathname === '/live' || location.pathname === '/live-2026';
    const is2026Page = location.pathname === '/' || location.pathname === '/live-2026' || location.pathname === '/sponsor-us';

    return (
        <>
            <nav className={`navbar absolute z-[9999] lg:p-10 ${is2026Page ? 'bg-gradient-to-b from-[#1A2773]/90 via-[#46166C]/30 to-transparent' : ''}`}>
                <div className="max-lg:flex-1">
                    <Link
                        to="/"
                        className="max-lg:h-20 max-sm:h-16 hover:scale-105 transition-transform duration-200"
                    >
                        <img
                            src={logo}
                            alt="HackHayward logo"
                            className="h-full drop-shadow-lg"
                        />
                    </Link>
                </div>
                {/* Desktop Nav-Links */}
                <div className="hidden lg:flex">
                    <ul className="flex gap-8 menu-horizontal pl-10 items-center">
                        {/* Show back button only on live dashboards, otherwise regular nav */}
                        {isLivePage ? <BackButton /> : <NavButtons />}
                    </ul>
                </div>
                {/* Mobile Nav-Links */}
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost lg:hidden hover:rotate-90 transition-transform duration-300"
                        >
                            <div className="indicator">
                                <img
                                    src={hamburger}
                                    alt="Menu"
                                    className="h-8 w-8"
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className={`menu menu-sm menu-fix dropdown-content ${is2026Page ? 'bg-[#1A2773]/95 backdrop-blur-md border border-[#46166C]/50' : 'bg-[#261e24]'} rounded-xl z-[100] mt-3 w-52 p-3 shadow-xl`}
                        >
                            {isLivePage ? <BackButton isMobile={true} /> : <NavButtons />}
                        </ul>
                    </div>
                </div>
                <MLH />
            </nav>
        </>
    );
}
