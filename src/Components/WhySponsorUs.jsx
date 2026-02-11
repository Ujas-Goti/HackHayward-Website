import PropTypes from 'prop-types';
import ReactGA from 'react-ga4';
import { FaRocket, FaUsers, FaCode, FaLightbulb, FaStar } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const BENEFITS = [
    {
        title: 'Promote Your Brand',
        description: 'Showcase your organization to a diverse audience of tech-savvy students and professionals. Build your brand\'s reputation as a leader in innovation and education.',
        icon: FaRocket,
        gradient: 'from-purple-500 to-pink-500',
    },
    {
        title: 'Access Top Talent',
        description: 'Connect with some of the brightest minds in tech and discover potential interns, employees, or collaborators for your next big project.',
        icon: FaUsers,
        gradient: 'from-blue-500 to-cyan-500',
    },
    {
        title: 'Engage with Hackers',
        description: 'Host workshops, sponsor challenge tracks, and provide tools to guide hackers in creating impactful projects with AI and entrepreneurship.',
        icon: FaCode,
        gradient: 'from-green-500 to-teal-500',
    },
    {
        title: 'Support Innovation',
        description: 'Play a crucial role in advancing technology by providing mentorship, resources, and prizes that empower students to think outside the box.',
        icon: FaLightbulb,
        gradient: 'from-yellow-500 to-orange-500',
    },
];

WhySponsorUs.propTypes = {
    contactEmail: PropTypes.string,
};

export default function WhySponsorUs({ contactEmail = 'csueastbaygdsc@gmail.com' }) {
    const handleContactClick = () => {
        ReactGA.event({
            category: 'hackathon',
            action: 'Click',
            label: 'Why Sponsor - Contact Us',
        });
    };

    return (
        <section
            id="why-sponsor"
            className="relative py-12 px-6 overflow-hidden"
        >
            {/* Floating decorative elements */}
            <div className="absolute top-20 left-10 text-[#B794D4]/20 animate-pulse">
                <FaStar className="w-8 h-8" />
            </div>
            <div className="absolute top-40 right-20 text-[#B794D4]/15 animate-bounce" style={{ animationDuration: '3s' }}>
                <HiSparkles className="w-12 h-12" />
            </div>
            <div className="absolute bottom-40 left-20 text-[#46166C]/30 animate-pulse" style={{ animationDelay: '1s' }}>
                <FaStar className="w-6 h-6" />
            </div>
            <div className="absolute bottom-20 right-10 text-[#B794D4]/20 animate-bounce" style={{ animationDuration: '4s' }}>
                <HiSparkles className="w-10 h-10" />
            </div>

            <div className="max-w-5xl mx-auto">
                {/* Header with gradient text */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 bg-[#46166C]/30 backdrop-blur-sm px-4 py-2 rounded-full mb-4 border border-[#B794D4]/30">
                        <HiSparkles className="text-[#B794D4]" />
                        <span className="text-[#B794D4] text-sm font-grotesk font-medium">Partner with Us</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 font-exo2">
                        Why <span className="bg-gradient-to-r from-[#B794D4] via-[#c593e9] to-[#B794D4] bg-clip-text text-transparent">Sponsor</span> Us?
                    </h2>
                    <p className="text-lg text-[#C5D4F0] max-w-2xl mx-auto font-grotesk leading-relaxed">
                        Join us in empowering the next generation of tech leaders. HackHayward brings together 
                        <span className="text-[#B794D4] font-semibold"> 200+ talented hackers </span> 
                        for a high-energy hackathon full of innovation, collaboration, and creativity.
                    </p>
                </div>

                {/* Benefit cards - 2x2 grid with icons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
                    {BENEFITS.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                className="group relative rounded-2xl p-5 text-left bg-[#1A2773]/40 backdrop-blur-sm border border-[#46166C]/30 shadow-lg hover:border-[#B794D4]/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(183,148,212,0.15)] hover:-translate-y-1 overflow-hidden"
                            >
                                {/* Gradient background on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                                
                                {/* Icon */}
                                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="w-5 h-5 text-white" />
                                </div>
                                
                                <h3 className="text-lg font-bold text-white mb-2 font-grotesk group-hover:text-[#B794D4] transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-[#C5D4F0] text-sm leading-relaxed font-grotesk relative z-10">
                                    {item.description}
                                </p>

                                {/* Corner decoration */}
                                <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-tl from-[#B794D4]/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA Section */}
                <div className="relative text-center p-8 rounded-3xl bg-gradient-to-r from-[#46166C]/40 via-[#1A2773]/60 to-[#46166C]/40 border border-[#B794D4]/30 backdrop-blur-sm overflow-hidden">
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#B794D4]/5 via-[#46166C]/10 to-[#B794D4]/5 animate-pulse"></div>
                    
                    <div className="relative z-10">
                        <HiSparkles className="w-8 h-8 text-[#B794D4] mx-auto mb-3 animate-bounce" style={{ animationDuration: '2s' }} />
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-exo2">
                            Ready to <span className="bg-gradient-to-r from-[#B794D4] to-[#c593e9] bg-clip-text text-transparent">Inspire Innovation</span>?
                        </h3>
                        <p className="text-[#C5D4F0] text-base mb-6 max-w-xl mx-auto font-grotesk">
                            Contact us today to learn how you can contribute to HackHayward 2026 and make a lasting impact.
                        </p>
                        <a
                            href={`mailto:${contactEmail}`}
                            onClick={handleContactClick}
                            className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#B794D4] to-[#9b6cc4] hover:from-[#c593e9] hover:to-[#B794D4] text-white font-bold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(183,148,212,0.5)] font-grotesk"
                        >
                            <span>Contact Us</span>
                            <FaRocket className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
