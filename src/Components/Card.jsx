import PropTypes from 'prop-types';
import { FaLinkedin } from 'react-icons/fa';

Card.propTypes = {
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    pos: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    badge: PropTypes.string.isRequired,
    flair: PropTypes.shape({
        spk: PropTypes.bool,
        jud: PropTypes.bool,
        mnt: PropTypes.bool,
    }).isRequired,
    imageScale: PropTypes.number,
    imagePosition: PropTypes.string,
    year: PropTypes.number,
    linkedin: PropTypes.string,
};

// eslint-disable-next-line no-unused-vars
export default function Card({ name, desc, pos, img, badge, flair, imageScale = 1, imagePosition = 'center', year, linkedin }) {
    const is2026 = year === 2026;
    const isHackHaywardOrganizer =
        is2026 &&
        (desc === 'HackHayward - CSU East Bay' || pos === 'Faculty Avisor and Professor');
    
    // Unified badge styling for 2026: subtle, same for all roles
    const getBadgeColor = () => {
        if (!is2026) return "badge-outline";
        return "bg-[#1A2773]/10 text-[#1A2773] border-[#1A2773]/30";
    };

    return(
        <div className={`card overflow-hidden shadow-lg w-60 md:w-72 h-full transition-all duration-300 hover:scale-105 hover:shadow-xl ${
            is2026 
                ? 'bg-gradient-to-b from-white to-[#C5D4F0]/40 rounded-2xl border border-[#B794D4]/30 hover:border-[#46166C]/50' 
                : 'bg-white rounded-lg'
        }`}>
            <figure className={`w-full h-64 ${is2026 ? 'bg-[#1A2773]/10' : 'bg-gray-100'} relative overflow-hidden`}>
                <img
                    src={img}
                    alt={name} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    style={{ 
                        transform: `scale(${imageScale})`,
                        objectPosition: imagePosition
                    }}
                />
                {is2026 && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#46166C]/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                )}
            </figure>
            <div className={`p-5 font-grotesk flex flex-col ${is2026 ? 'text-[#1A2773]' : 'text-black'}`}>
                <h2 className="text-xl sm:text-2xl font-bold mb-1 text-white shadow-text-sm tracking-tight">
                    {name}
                </h2>
                
                <div className={`text-sm ${is2026 ? 'text-[#1A2773]/70' : 'text-gray-800'}`}>
                    <p className="font-medium">{desc}</p>
                    <p
                        className={`mt-1 text-xs ${
                            isHackHaywardOrganizer
                                ? 'inline-block px-3 py-1 rounded-full bg-[#46166C] text-white font-semibold tracking-wide'
                                : 'opacity-70'
                        }`}
                    >
                        {pos}
                    </p>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                    {badge && 
                        <div className={`badge px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor()}`}>
                            {badge}
                        </div>
                    }
                    {linkedin && (
                        <a 
                            href={linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-white hover:text-[#0A66C2] transition-colors"
                        >
                            <FaLinkedin size={22} />
                        </a>
                    )}
                    {!linkedin && is2026 && (
                        <span className="text-white/40">
                            <FaLinkedin size={22} />
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}