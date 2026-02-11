import { useState } from "react";
import Card from "./Card.jsx";
import PropTypes from 'prop-types';
import saturn from '/src/assets/imgs/Background/Saturn.webp';

// Data
import { users } from '../assets/data/users.jsx';
import { users2026 } from '../assets/data/users2026.jsx';
import { RiArrowDropDownLine } from "react-icons/ri";

Teams.propTypes = {
    title: PropTypes.string.isRequired,
    year: PropTypes.number,
    showSpeakers: PropTypes.bool,
};

export default function Teams({ title, year, showSpeakers = true }) {
    const [isHovered, setIsHovered] = useState(false);
    const [filter, setFilter] = useState("All");
    const is2026 = year === 2026;

    // Use 2026 filtered users if year is 2026, otherwise use all users
    const usersList = is2026 ? users2026 : users;

    // For 2026: All, Organizers (includes Directors), Mentors
    const filters2026 = ["All", "Organizers", "Mentors"];
    const filters2025 = showSpeakers ? ["All", "Organizers", "Speakers", "Mentors"] : ["All", "Organizers", "Mentors"];

    const filteredUsers = usersList.filter((organizer) => {
        if (filter === "All") return true;
        if (filter === "Organizers") {
            // For 2026, Organizers = everyone (Directors, Organizers, Faculty Advisor, etc.) except Mentors
            if (is2026) {
                const isMentor = organizer.flair?.mnt;
                return !isMentor;
            }
            return organizer.badge;
        }
        if (filter === "Speakers") return organizer.flair?.spk;
        if (filter === "Mentors") return organizer.flair?.mnt;
        return false;
    });

    const currentFilters = is2026 ? filters2026 : filters2025;

    // Get button styles based on year
    const getButtonStyles = (isActive) => {
        if (is2026) {
            return isActive 
                ? "bg-white text-[#46166C] hover:bg-[#C5D4F0] font-bold" 
                : "bg-[#46166C] text-white hover:bg-[#5a1d8a] font-medium";
        }
        return isActive 
            ? "bg-white text-black hover:bg-[#e9e9e9] font-bold" 
            : "bg-[#c593e9] text-white hover:bg-[#cfb0e8] font-medium";
    };

    return (
        <div className="relative flex justify-center py-16">
            <section className={`flex flex-col items-center justify-items-center gap-10 text-white max-w-screen-lg z-10 ${is2026 ? 'bg-[#46166C]/30 backdrop-blur-sm border border-[#B794D4]/20' : 'bg-black/80'} rounded-2xl p-10 mx-4`}>
                <div className="text-white text-center font-exo2 flex flex-col gap-4">
                    <h2 className="text-5xl text-balance font-bold shadow-text-sm text-white">
                        {is2026 ? 'Meet The Team' : title}
                    </h2>
                    {is2026 && (
                        <p className="text-hack-blue-light/80 font-grotesk text-lg max-w-xl mx-auto">
                            The passionate people behind HackHayward
                        </p>
                    )}
                </div>

                {/* Desktop Style */}
                <div className="hidden md:flex max-lg:justify-center font-mono">
                    {currentFilters.map((filterName, index) => {
                        const isFirst = index === 0;
                        const isLast = index === currentFilters.length - 1;
                        const slashClass = isFirst ? "slash-r2" : isLast ? "slash-l2" : "slash-m2";
                        
                        return (
                            <a
                                key={filterName}
                                onClick={() => setFilter(filterName)}
                                className={`w-[150px] text-center ${slashClass} p-4 px-6 transition-all duration-200 lg:text-base text-sm font-grotesk text-nowrap cursor-pointer hover:scale-105
                                    ${getButtonStyles(filter === filterName)}`}
                            >
                                {filterName}
                            </a>
                        );
                    })}
                </div>

                {/* Mobile Style */}
                <div className="md:hidden w-full flex justify-center">
                    <div 
                        className="dropdown dropdown-hover font-grotesk"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}>
                        <div 
                            tabIndex={0} 
                            role="button" 
                            className={`${is2026 ? 'bg-[#46166C] hover:bg-[#5a1d8a]' : 'bg-[#c593e9] hover:bg-[#cfb0e8]'} text-white lg:text-lg text-sm font-medium flex items-center justify-center rounded-full w-40 h-14 relative transition-all duration-200`}>
                            {filter}
                            <RiArrowDropDownLine 
                                className={`size-8 right-[8%] absolute transition-transform duration-200 ${
                                    isHovered ? "rotate-180" : ""
                                }`} 
                            />
                        </div>
                        <ul tabIndex={0} className={`dropdown-content menu ${is2026 ? 'bg-[#1A2773]/95 backdrop-blur-md border border-[#46166C]/50' : 'bg-[#261e24]'} shadow-xl rounded-xl z-[1] w-40 p-2`}>
                            {currentFilters.map((filterName) => (
                                <li key={filterName}>
                                    <a 
                                        onClick={() => setFilter(filterName)}
                                        className={`hover:bg-[#46166C]/30 rounded-lg ${filter === filterName ? 'text-[#B794D4] font-semibold' : ''}`}
                                    >
                                        {filterName}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Display Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredUsers.map((organizer, index) => (
                        <li key={index} className="list-none">
                            <Card 
                                name={organizer.name}
                                desc={organizer.desc}
                                pos={organizer.pos}
                                img={organizer.img}
                                badge={organizer.badge}
                                flair={organizer.flair}
                                imageScale={organizer.imageScale}
                                imagePosition={organizer.imagePosition}
                                year={year}
                                linkedin={organizer.linkedin}
                            />
                        </li>
                    ))}
                </div>
            </section>
            <div className={`opacity-50 absolute top-[0%] right-[-10%] max-h-[40%] max-w-[40%] ${is2026 ? 'animate-float' : ''}`} style={{ animationDuration: '10s' }}>
                <img src={saturn} loading="lazy" alt="Saturn" className="object-cover" />
            </div>
        </div>
    );
}