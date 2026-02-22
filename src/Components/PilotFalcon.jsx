import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import escapeBG from '/src/assets/imgs/Scene5/The_eascape_background_s5.webp';
import spaceShip from '/src/assets/imgs/Scene5/SpaceShip.webp';
import UFO from '/src/assets/imgs/Scene5/UFO.webp';

export default function PilotFalcon() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
    const springConfig = { stiffness: 60, damping: 20, mass: 1.5 };

    const rawShipX = useTransform(scrollYProgress, [0, 0.85], [-250, 0]);
    const shipX = useSpring(rawShipX, springConfig);
    const shipOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    const rawUfoX = useTransform(scrollYProgress, [0.1, 0.9], [200, 0]);
    const ufoX = useSpring(rawUfoX, springConfig);
    const ufoOpacity = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

    return (
        <div ref={sectionRef} className="max-h-[50vh] relative">
            <img
                className=" w-full"
                loading="lazy"
                alt="A blue and black geometric pattern illuminated by white light in a space escape way scene"
                src={escapeBG}
            />
            <motion.img
                src={spaceShip}
                loading="lazy"
                alt="A cartoon space falcon piloting the airship rapidly to escape"
                className="absolute z-10 bottom-[0.1%] left-[4%] lg:h-[120%] lg:w-[120%]  h-[90%] w-[90%] object-contain animate-wiggle animate-infinite animate-duration-[10000ms] animate-delay-1000 animate-ease-in-out"
                style={{ x: shipX, opacity: shipOpacity }}
            />
            <motion.img
                src={UFO}
                loading="lazy"
                alt="Two purple cartoon UFOs chasing"
                className="absolute z-10 top-[0%] left-[28%] max-h-[25%] max-w-[25%] object-contain"
                style={{ x: ufoX, opacity: ufoOpacity }}
            />
        </div>
    );
}
