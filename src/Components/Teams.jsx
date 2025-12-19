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

    // Use 2026 filtered users if year is 2026, otherwise use all users
    const usersList = year === 2026 ? users2026 : users;

    const filteredUsers = usersList.filter((organizer) => {
        if (filter === "All") return true;
        if (filter === "Organizers") {
            // For 2026, exclude "Faculty Advisor" from organizers
            if (year === 2026 && organizer.badge === "Faculty Advisor") return false;
            return organizer.badge;
        }
        if (filter === "Speakers") return organizer.flair?.spk;
        //if (filter === "Judges") return organizer.flair?.jud;
        if (filter === "Mentors") return organizer.flair?.mnt;
        return false;
    });

    return (
        <div className="relative flex justify-center py-16">
            <section className="flex flex-col items-center justify-items-center gap-10 text-white max-w-screen-lg z-10 bg-black/80 rounded-lg p-10 mx-4">
                <div className="text-white text-center font-exo2 flex flex-col gap-4">
                    <h2 className="text-5xl text-balance font-bold shadow-text-sm">
                        {title}
                    </h2>
                </div>

                {/* Desktop Style */}
                <div className="hidden md:flex max-lg:justify-center font-mono">
                    <a
                        onClick={() => setFilter("All")}
                        className={`left-[7.5%] w-[175px] text-center slash-r2 p-4 px-8 transition lg:text-lg text-sm font-grotesk text-nowrap cursor-pointer
                            ${filter === "All" ? "bg-white text-black hover:bg-[#e9e9e9] font-bold" : "bg-[#c593e9] text-white hover:bg-[#cfb0e8] font-medium"}`}
                    >
                        All
                    </a>
                    <a
                        onClick={() => setFilter("Organizers")}
                        className={`left-[2.5%] w-[175px] text-center slash-m2 p-4 px-8 transition lg:text-lg text-sm font-grotesk text-nowrap cursor-pointer
                            ${filter === "Organizers" ? "bg-white text-black hover:bg-[#e9e9e9] font-bold" : "bg-[#c593e9] text-white hover:bg-[#cfb0e8] font-medium"}`}
                    >
                        Organizers
                    </a>
                    {showSpeakers && (
                        <a
                            onClick={() => setFilter("Speakers")}
                            className={`right-[2.5%] w-[175px] text-center slash-m2 p-4 px-8 transition  lg:text-lg text-sm font-grotesk text-nowrap cursor-pointer
                                ${filter === "Speakers" ? "bg-white text-black hover:bg-[#e9e9e9] font-bold" : "bg-[#c593e9] text-white hover:bg-[#cfb0e8] font-medium"}`}
                        >
                            Speakers
                        </a>
                    )}
                    <a
                        onClick={() => setFilter("Mentors")}
                        className={`${showSpeakers ? 'right-[7.5%]' : 'right-[2.5%]'} w-[175px] text-center slash-l2 p-4 px-8 transition lg:text-lg text-sm font-grotesk text-nowrap cursor-pointer
                            ${filter === "Mentors" ? "bg-white text-black hover:bg-[#e9e9e9] font-bold" : "bg-[#c593e9] text-white hover:bg-[#cfb0e8] font-medium"}`}
                    >
                        Mentors
                    </a>
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
                            className="bg-[#c593e9] hover:bg-[#cfb0e8] text-white lg:text-lg text-sm font-medium flex items-center justify-center rounded-full w-40 h-14 relative">
                            {filter}
                            <RiArrowDropDownLine 
                                className={`size-8 right-[8%] absolute transition-transform duration-200 ${
                                    isHovered ? "rotate-180" : ""
                                }`} 
                            />
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-[#261e24] shadow-drop-sm shadow rounded-box z-[1] w-40 p-2">
                            <li><a onClick={() => setFilter("All")}>All</a></li>
                            <li><a onClick={() => setFilter("Organizers")}>Organizers</a></li>
                            {showSpeakers && <li><a onClick={() => setFilter("Speakers")}>Speakers</a></li>}
                            <li><a onClick={() => setFilter("Mentors")}>Mentors</a></li>
                        </ul>
                    </div>
                </div>

                {/* Display Card */}
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
                            />
                        </li>
                    ))}
                </div>
            </section>
            <div className="opacity-50 absolute top-[0%] right-[-10%] max-h-[40%] max-w-[40%] ">
                <img src={saturn} loading="lazy" alt="Saturn" className="object-cover" />
            </div>
        </div>
    );
}