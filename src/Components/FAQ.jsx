import ReactGA from 'react-ga4';
import PropTypes from 'prop-types';

FaqAccordion.propTypes = {
    register: PropTypes.string.isRequired,
    yearData: PropTypes.object.isRequired,
    year: PropTypes.number,
};


function FaqAccordion(props) {
    const is2026 = props.year === 2026;
    const handleClick = (platform) => {
        ReactGA.event({
            category: 'hackathon',
            action: 'Click',
            label: platform,
        });
        console.log(`Google Analytics Event: ${platform} clicked`);
    };

    const faqs = [
        {
            question: 'What is a Hackathon? ',
            answer: 'A Hackathon is an event where participants come together and create a solution for a track presented in the event within a timeframe!',
        },
        {
            question: 'Who’s allowed to sign up?',
            answer: 'Anyone who is in College/University or Highschooler above the age of 18 is invited to sign-up!',
        },
        {
            question: 'How do I sign up?',
            answer: (
                <>
                    Fill in{' '}
                    <a
                        href={props.register}
                        target="_blank"
                        className="text-[#c593e9] font-bold underline"
                        onClick={() => handleClick('Register')}
                    >
                        our registration form!
                    </a>
                </>
            ),
        },
        {
            question: 'How long will HackHayward last?',
            answer: props.yearData.faqDates,
        },
        {
            question: 'What does it cost to join?',
            answer: 'Nothing! HackHayward is a free event. Everyone is invited!',
        },
        {
            question: 'Are teams required?',
            answer: 'They are encouraged not mandatory. Team up, find friends, make the best of this event! Teams are up to 4 people.',
        },
        {
            question: 'What can be submitted?',
            answer: 'Any projects, technical or not, created within the hacking event schedule!',
        },
        {
            question: 'What do I need to bring to the event?',
            answer: 'Picture ID, clothing (if you plan on staying over), water bottle, personal devices (laptop or PC), and chargers!',
        },
        {
            question: 'What if I have no experience?',
            answer: 'This event is still for you! No technical experience or not majoring in Computer Science? You are still invited! Create creative solutions to the problems in the Hackathon! Calling all Engineering, Business, Computer Science, and every creative mind in between—ignite your potential at our event! Not in a team yet? No worries—the kickoff networking session is your chance to spark connections and form your dream squad.',
        },
        {
            question: 'What is HackHayward?',
            answer: props.yearData.faqDescription,
        },

        {
            question: 'Where will the Hackathon take place?',
            answer: 'We are taking place in Hayward, CA at the CSU East Bay campus. ',
        },
        // Entrepreneurship-related FAQs for 2026
        ...(is2026 ? [
            {
                question: 'What is the Entrepreneurship component at HackHayward 2.0?',
                answer: 'HackHayward 2.0 introduces an innovative model where each hackathon team is paired with a trained Entrepreneur Ambassador. These ambassadors, recruited from the Smith Center, the Up-Club, and the College of Business and Economics, guide teams in opportunity discovery, value creation, customer needs, and pitch development.',
            },
            {
                question: 'What is an Entrepreneur Ambassador?',
                answer: 'Entrepreneur Ambassadors are trained mentors who work directly with hackathon teams to help them develop entrepreneurial skills alongside their technical projects. They provide guidance on creating pitch decks, identifying market opportunities, understanding customer needs, and building a roadmap for taking your project beyond the hackathon.',
            },
            {
                question: 'Do I need business experience to participate?',
                answer: 'Not at all! The Entrepreneur Ambassadors are here to help teams of all backgrounds. Whether you\'re a technical wizard or new to entrepreneurship, the ambassadors will guide you through the process of developing your idea into a viable venture. This is a learning opportunity for everyone!',
            },
            {
                question: 'What will teams learn in the entrepreneurship workshop?',
                answer: 'During the dedicated entrepreneurship workshop, teams will learn how to develop a pitch deck and project roadmap. You\'ll explore opportunity discovery, value creation, customer needs analysis, and how to present your solution effectively. The goal is to match technical innovation with thoughtful entrepreneurial strategy.',
            },
            {
                question: 'Will there be technical workshops as well?',
                answer: 'Yes! HackHayward includes both pre-event and on-site technical workshops covering AI tools, frameworks, and prototyping strategies. You\'ll receive both technical mentorship and entrepreneurial coaching throughout the event.',
            },
        ] : []),
    ];

    return (
        <section className="w-full flex flex-col justify-center items-center gap-4 font-grotesk mt-6">
            {faqs.map((faq, index) => (
                <article
                    key={index}
                    className="collapse collapse-plus max-w-screen-md bg-white text-black z-10"
                >
                    <input type="checkbox" aria-label="Open Accordian" />
                    <h2 className="collapse-title md:text-xl font-bold text-balance">
                        {faq.question}
                    </h2>
                    <div className="collapse-content text-pretty">
                        <p>{faq.answer}</p>
                    </div>
                </article>
            ))}
        </section>
    );
}

FAQ.propTypes = {
    register: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    yearData: PropTypes.object.isRequired,
};

export default function FAQ(props) {
    return (
        <>
            <div className="relative">
                <div className="text-white text-center font-exo2 flex flex-col items-center gap-9 z-10 shadow-text-sm">
                    <h2 className="hidden md:block text-5xl text-balance max-lg:mx-28 font-bold">
                        Regulations and FAQs
                    </h2>
                    <p className="md:hidden text-5xl font-bold">
                        FAQ
                    </p>
                    <p className="lg:text-xl sm:text-lg font-grotesk font-light text-pretty z-40">
                        If we missed anything, please contact us at{' '}
                        <a

                            href="mailto:hacker@hackhayward.com"

  
                            className="font-bold text-[#c593e9] underline"
                        >
                            hacker@hackhayward.com
                        </a>
                    </p>
                </div>
                <FaqAccordion register={props.register} yearData={props.yearData} year={props.year} />
                
            </div>
        </>
    );
}