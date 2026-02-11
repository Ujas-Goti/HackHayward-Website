import PropTypes from 'prop-types';

Entrepreneurship.propTypes = {
    year: PropTypes.number,
};

export default function Entrepreneurship({ year }) {
    // Only show for 2026
    if (year !== 2026) {
        return null;
    }

    return (
        <>
            <div className="grid place-content-center gap-8 relative">
                <div className="text-white text-center font-exo2 flex flex-col items-center gap-6 z-10 max-w-7xl mx-auto">
                    <h2 className="text-5xl font-bold shadow-text-sm text-white">
                        What's New in HackHayward 2.0
                    </h2>
                    <p className="lg:text-xl sm:text-lg font-grotesk font-light text-pretty max-w-4xl text-[#C5D4F0]/90">
                        This year introduces an innovative model: each hackathon team will be paired with a trained <span className="font-bold text-[#B794D4]">Entrepreneur Ambassador</span>, recruited from the Smith Center, the Up-Club, and the College of Business and Economics.
                    </p>
                </div>

                <section className="grid xl:grid-cols-2 items-stretch justify-items-center gap-8 text-white max-w-7xl mx-auto">
                    <article className="max-w-xl z-20 bg-[#46166C]/30 backdrop-blur-sm border border-[#B794D4]/20 p-6 rounded-xl hover:border-[#B794D4]/50 hover:bg-[#46166C]/40 transition-all duration-300 h-full">
                        <div className="flex items-start gap-4">
                            <div className="text-4xl">🤝</div>
                            <div>
                                <h3 className="text-2xl font-bold font-exo2 mb-3 text-white">
                                    Entrepreneur Ambassadors
                                </h3>
                                <p className="lg:text-base sm:text-sm font-grotesk text-[#C5D4F0]/80">
                                    These ambassadors will guide teams in <span className="font-semibold text-[#B794D4]">opportunity discovery</span>, <span className="font-semibold text-[#B794D4]">value creation</span>, <span className="font-semibold text-[#B794D4]">customer needs</span>, and <span className="font-semibold text-[#B794D4]">pitch development</span> - ensuring that technical innovation is matched with thoughtful entrepreneurial strategy.
                                </p>
                            </div>
                        </div>
                    </article>

                    <article className="max-w-xl z-20 bg-[#46166C]/30 backdrop-blur-sm border border-[#B794D4]/20 p-6 rounded-xl hover:border-[#B794D4]/50 hover:bg-[#46166C]/40 transition-all duration-300 h-full">
                        <div className="flex items-start gap-4">
                            <div className="text-4xl">🌱</div>
                            <div>
                                <h3 className="text-2xl font-bold font-exo2 mb-3 text-white">
                                    Addressing Community Needs
                                </h3>
                                <p className="lg:text-base sm:text-sm font-grotesk text-[#C5D4F0]/80">
                                    Although Cal State East Bay serves an exceptionally diverse student population, many students - especially those from historically underrepresented backgrounds - lack access to mentorship networks, entrepreneurial training, and pathways for translating technical ideas into real-world ventures.
                                </p>
                            </div>
                        </div>
                    </article>
                </section>

                <section className="grid xl:grid-cols-2 items-stretch gap-8 text-white max-w-7xl mx-auto">
                    <article className="max-w-xl z-20 bg-[#46166C]/30 backdrop-blur-sm border border-[#B794D4]/20 p-6 rounded-xl hover:border-[#B794D4]/50 hover:bg-[#46166C]/40 transition-all duration-300 h-full">
                        <div className="flex items-start gap-4">
                            <div className="text-4xl">🚀</div>
                            <div>
                                <h3 className="text-2xl font-bold font-exo2 mb-3 text-white">
                                    Mentorship & Career Opportunities
                                </h3>
                                <p className="lg:text-base sm:text-sm font-grotesk text-[#C5D4F0]/80">
                                    By integrating AI innovation with entrepreneurship, the event strengthens relationships that offer students <span className="font-semibold text-[#B794D4]">mentorship</span>, <span className="font-semibold text-[#B794D4]">career guidance</span>, and <span className="font-semibold text-[#B794D4]">potential employment opportunities</span>, helping them enter the region's tech ecosystem with greater confidence and support.
                                </p>
                            </div>
                        </div>
                    </article>

                    <article className="max-w-xl z-20 bg-[#46166C]/30 backdrop-blur-sm border border-[#B794D4]/20 p-6 rounded-xl hover:border-[#B794D4]/50 hover:bg-[#46166C]/40 transition-all duration-300 h-full">
                        <div className="flex items-start gap-4">
                            <div className="text-4xl">🛠️</div>
                            <div>
                                <h3 className="text-2xl font-bold font-exo2 mb-3 text-white">
                                    Technical & Entrepreneurial Workshops
                                </h3>
                                <p className="lg:text-base sm:text-sm font-grotesk text-[#C5D4F0]/80">
                                    HackHayward includes <span className="font-semibold text-[#B794D4]">pre-event and on-site technical workshops</span>, covering AI tools, frameworks, and prototyping strategies. During the 24-hour hackathon, each team will participate in a dedicated entrepreneurship workshop where they develop a <span className="font-semibold text-[#B794D4]">pitch deck</span> and <span className="font-semibold text-[#B794D4]">project roadmap</span>.
                                </p>
                            </div>
                        </div>
                    </article>
                </section>
            </div>
        </>
    );
}

