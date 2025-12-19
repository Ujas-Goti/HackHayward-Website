import mars from '/src/assets/imgs/Background/Mars.webp';
import scene2 from '/src/assets/imgs/Scene2/s2Full.webp';
import scene3 from '/src/assets/imgs/Scene3/s3Full.webp';
import jupiter from '/src/assets/imgs/Background/Jupiter.webp';
import PropTypes from 'prop-types';

AboutUs.propTypes = {
    year: PropTypes.number.isRequired,
    yearData: PropTypes.object.isRequired,
};

export default function AboutUs({ yearData }) {
    return (
        <>
            <div className="grid place-content-center gap-3 relative shadow-text-sm">
                <section className="grid xl:grid-cols-2 items-center justify-items-center gap-4 text-white max-w-7xl">
                    <article className="animate-fade-right max-w-xl z-20">
                        <h2 className="text-5xl font-bold font-exo2">
                            About Us
                        </h2>
                        <p className="lg:text-xl sm:text-lg max-w-xl	font-grotesk mt-4">
                            {yearData.aboutText}
                        </p>
                    </article>
                    <div className="z-20">
                        <img
                            src={scene2}
                            loading="lazy"
                            alt="The cartoon space falcon being escorted by green owl-like aliens through the hallway after being kidnapped"
                            className="rounded-md shadow-lg shadow-cyan-500/50"
                        />
                    </div>
                    <div className="opacity-50 absolute top-[10%] right-[-5%] h-[10%] w-[10%]">
                        <img src={mars} loading="lazy" alt="Mars" className="object-cover" />
                    </div>
                </section>
                <section className="grid xl:grid-cols-2 items-center gap-4 text-white mt-4 justify-items-center max-w-7xl">
                    <div className="z-20">
                        <img
                            src={scene3}
                            loading="lazy"
                            alt="The cartoon space falcon sitting on the spaceship, watching the yellow robot navigate the spacecraft"
                            className="rounded-md shadow-lg shadow-cyan-500/50"
                        />
                    </div>
                    <article className="animate-fade-left row-start-1 row-end-2 xl:col-start-2 xl:col-end-3 max-w-xl z-20">
                        <h2 className="text-5xl font-bold font-exo2">
                            Our Mission
                        </h2>
                        <p className="lg:text-xl sm:text-lg font-grotesk mt-4">
                            Our mission is to empower underrepresented students
                            passionate about technology by providing hands-on
                            learning experiences, networking opportunities, and
                            innovative project development through hackathons.
                            We aim to pave the way for their success in the
                            evolving technological landscape by offering
                            comprehensive skill development and professional
                            connections.
                        </p>
                    </article>
                    <div className="opacity-50 absolute bottom-[0%] left-[-15%] max-h-[30%] max-w-[30%] z-10">
                        <img
                            src={jupiter}
                            loading="lazy"
                            alt="Jupiter"
                            className="object-cover"
                        />
                    </div>
                </section>
            </div>
        </>
    );
}
