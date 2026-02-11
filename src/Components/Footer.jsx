import PropTypes from 'prop-types';
import logo from '/src/assets/imgs/others/Monotone Logo.webp';
import ReactGA from 'react-ga4';
import { useCountdown } from '../context/CountdownContext';
import { useLocation, Link } from 'react-router-dom';



import {
    BiLogoDiscord,
    BiLogoInstagram,
    BiLogoLinkedinSquare,
} from 'react-icons/bi';


Footer.propTypes = {
    register: PropTypes.string.isRequired,
};

function SocialButtons() {
    const links = [
        {
            icon: BiLogoDiscord,
            name: 'Discord',
            href: 'https://discord.com/invite/eMHWYfMKDd',
        },
        {
            icon: BiLogoInstagram,
            name: 'Instagram',
            href: 'https://www.instagram.com/hackhayward',
        },
        {
            icon: BiLogoLinkedinSquare,
            name: 'LinkedIn',
            href: 'https://www.linkedin.com/company/hackhayward',
        },
    ];

    return (
        <>
            {links.map((link, index) => (
                <li key={index} className="px-2 lg:hover:scale-110 transition">
                    <a
                        href={`${link.href}`}
                        target="_blank" 
                        aria-label={link.name}
                        className="text-white text-xl font-grotesk font-medium"
                    >
                        <link.icon className="h-12 w-auto" />
                    </a>
                </li>
            ))}
        </>
    );
}

function NavButtons() {
    const links = [{ text: 'About' }, { text: 'FAQ' }, { text: 'Teams' }, { text: 'Sponsors' }];

    return (
        <>
            {links.map((link, index) => (
                <li key={index} className="lg:hover:scale-110 transition">
                    <Link
                        to={`/#${link.text.toLowerCase().replaceAll(' ', '-')}`}
                        className="text-white lg:text-lg text-sm font-grotesk font-bold text-nowrap whitespace-nowrap"
                    >
                        {link.text}
                    </Link>
                </li>
            ))}
        </>
    );
}

export default function Footer(props) {
    const { hasCountdownEnded } = useCountdown();
    const location = useLocation();
    const isLiveDashboard = location.pathname === '/live' || location.pathname === '/live-2026';
    const is2026 = location.pathname === '/' || location.pathname === '/live-2026';
    
    const handleClick = (platform) => {
        ReactGA.event({
            category: 'hackathon',
            action: 'Click',
            label: platform,
        });
        console.log(`Google Analytics Event: ${platform} clicked`);
    };

    return (
        <footer className={`text-white ${is2026 ? 'bg-hack-navy-dark' : ''}`}>
            {/* Top Section - Logo and Contact */}
            <section className="flex flex-row items-center justify-between p-8 max-lg:flex-col max-lg:gap-6">
                {/* Logo */}
                <div className="flex items-center">
                    <a
                        href="#home"
                        className="h-20 max-lg:h-16 max-sm:h-14 hover:scale-105 transition flex items-center"
                    >
                        <img
                            src={logo}
                            alt="HackHayward logo"
                            className="h-full"
                        />
                        <p className="text-white text-xl font-exo2 font-medium pl-6">
                            HackHayward
                        </p>
                    </a>
                </div>
                {/* Socials */}
                <nav className="flex flex-col lg:items-end max-lg:items-center">
                    {/* Email */}
                    <div className="pb-2">
                        <p className="lg:text-lg font-grotesk font-thin text-pretty text-white lg:text-end text-center">
                            Reach out to us at{' '}
                            <a
                                href="mailto:csueastbaygdsc@gmail.com"
                                className={`font-bold underline ${is2026 ? 'text-hack-lavender hover:text-hack-purple-light' : 'text-[#c593e9]'}`}
                            >
                                csueastbaygdsc@gmail.com
                            </a>
                        </p>
                    </div>
                    {/* Icons */}
                    <ul className="flex flex-row gap-2 px-1">
                        <SocialButtons />
                    </ul>
                </nav>
            </section>
            
            {/* Divider Line */}
            <hr className={`mx-8 ${is2026 ? 'border-hack-lavender/30' : 'border-white'}`} />
            
            {/* Middle Section - MLH Code and Navigation */}
            <section className="flex flex-row items-center justify-between p-8 max-sm:flex-col max-sm:gap-4">
                {/* MLH Code of Conduct */}
                <div>
                    <a
                        href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                        className={`lg:text-lg text-sm font-grotesk font-light underline ${is2026 ? 'text-hack-blue-light hover:text-white' : 'text-white'}`}
                        target="_blank"
                    >
                        MLH Code of Conduct
                    </a>
                </div>
                {/* Nav Buttons and Register */}
                <nav className="flex items-center gap-4">
                    <ul className="flex flex-row gap-4 items-center">
                        <NavButtons />
                    </ul>
                    {!hasCountdownEnded && !isLiveDashboard && (
                        <a
                            href={props.register}
                            className={`rounded-full px-6 py-3 transition-all duration-200 lg:text-lg text-sm font-grotesk font-medium text-nowrap whitespace-nowrap hover:scale-105 ${
                                is2026 
                                    ? 'bg-hack-lavender hover:bg-hack-purple-light text-white' 
                                    : 'bg-[#c593e9] hover:bg-[#cfb0e8] text-white'
                            }`}
                            target="_blank"
                            onClick={() => handleClick('Register')}
                        >
                            Register
                        </a>
                    )}
                </nav>
            </section>
            
            {/* Divider Line */}
            <hr className={`mx-8 ${is2026 ? 'border-hack-lavender/30' : 'border-white'}`} />
            
            {/* Bottom Section - Credit */}
            <section className="flex justify-center py-4">
                <p className={`font-medium font-grotesk flex flex-row gap-2 ${is2026 ? 'text-hack-blue-light' : 'text-white'}`}>
                    Made with ❤️ by HackHayward
                </p>
            </section>
        </footer>
    );
}