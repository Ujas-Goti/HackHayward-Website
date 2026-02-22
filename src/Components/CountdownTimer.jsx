import { useState, useEffect, useRef, useCallback } from 'react';
import { useCountdown } from '../context/CountdownContext';

const CountdownTimer = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [hasStarted, setHasStarted] = useState(false);
    const prevTimeLeft = useRef(timeLeft);
    const { setHasCountdownEnded } = useCountdown();

    useEffect(() => {
        const calculateTimeLeft = () => {
            const target = new Date(targetDate);
            if (isNaN(target.getTime())) {
                console.error("Invalid target date provided");
                clearInterval(timer);
                return;
            }
            const difference = target - new Date();

            if (difference > 0) {
                setHasStarted(false);
                setTimeLeft(prevTime => {
                    prevTimeLeft.current = prevTime;
                    return {
                        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                        minutes: Math.floor((difference / (1000 * 60) / 60) % 60),
                        seconds: Math.floor((difference / 1000) % 60)
                    };
                });
            } else {
                setHasStarted(true);
                setHasCountdownEnded(true);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                clearInterval(timer);
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();

        return () => clearInterval(timer);
    }, [targetDate, setHasCountdownEnded]);

    const padNumber = useCallback(num => {
        return num.toString().padStart(2, '0');
    }, []);

    const renderDigit = (current, previous, position, unit) => {
        const currentDigits = padNumber(current);
        const previousDigits = padNumber(previous);
        const digit = currentDigits[position];
        const prevDigit = previousDigits[position];
        const hasChanged = digit !== prevDigit;

        return (
            <span 
                key={`${unit}-${position}-${hasChanged ? current : digit}`}
                className={`inline-block transform transition-all duration-1000 ${
                    hasChanged ? 'opacity-0 animate-[numberChange_0.5s_ease-out_forwards]' : ''
                }`}
            >
                {digit}
            </span>
        );
    };

    if (hasStarted) {
        return (
            <div className="text-center">
                <h2 className="text-3xl">HackHayward is now live!</h2>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2 items-center">
            <div role="timer" aria-live="polite" aria-label="Countdown timer" className="flex gap-4 justify-center my-2">
                <div className="text-center">
                    <span className="font-exo2 font-bold text-xl lg:text-4xl inline-flex" aria-label={`Days: ${timeLeft.days}`}>
                        {[0, 1].map(pos => renderDigit(timeLeft.days, prevTimeLeft.current.days, pos, 'days'))}
                    </span>
                    <p className="font-grotesk text-sm lg:text-lg" aria-hidden="true">Days</p>
                </div>
                <div className="text-center">
                    <span className="font-exo2 font-bold text-xl lg:text-4xl inline-flex" aria-label={`Hours: ${timeLeft.hours}`}>
                        {[0, 1].map(pos => renderDigit(timeLeft.hours, prevTimeLeft.current.hours, pos, 'hours'))}
                    </span>
                    <p className="font-grotesk text-sm lg:text-lg" aria-hidden="true">Hours</p>
                </div>
                <div className="text-center">
                    <span className="font-exo2 font-bold text-xl lg:text-4xl inline-flex" aria-label={`Minutes: ${timeLeft.minutes}`}>
                        {[0, 1].map(pos => renderDigit(timeLeft.minutes, prevTimeLeft.current.minutes, pos, 'minutes'))}
                    </span>
                    <p className="font-grotesk text-sm lg:text-lg" aria-hidden="true">Minutes</p>
                </div>
                <div className="text-center">
                    <span className="font-exo2 font-bold text-xl lg:text-4xl inline-flex" aria-label={`Seconds: ${timeLeft.seconds}`}>
                        {[0, 1].map(pos => renderDigit(timeLeft.seconds, prevTimeLeft.current.seconds, pos, 'seconds'))}
                    </span>
                    <p className="font-grotesk text-sm lg:text-lg" aria-hidden="true">Seconds</p>
                </div>
            </div>
            <p className="text-white lg:text-3xl sm:text-xl font-exo2 px-6">
                Until HackHayward 2.0!
            </p>
        </div>
    );
};

const isValidDateString = (props, propName, componentName) => {
    const value = props[propName];
    const date = new Date(value);
    if (isNaN(date.getTime())) {
        return new Error(
            `Invalid ${propName} supplied to ${componentName}. Expected ISO 8601 date string.`
        );
    }
};

CountdownTimer.propTypes = {
    targetDate: isValidDateString
};

export default CountdownTimer; 