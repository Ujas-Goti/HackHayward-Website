import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

const DashCountdown = ({ targetDate, eventStartDate = "2025-03-01T08:00:00" }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [hasEventStarted, setHasEventStarted] = useState(false);
    const [hasEnded, setHasEnded] = useState(false);
    const prevTimeLeft = useRef(timeLeft);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const eventStart = new Date(eventStartDate);
            const submissionEnd = new Date(targetDate);
            
            // Check if event has started
            const eventStarted = now >= eventStart;
            setHasEventStarted(eventStarted);
            
            // Decide which target to count down to
            const target = eventStarted ? submissionEnd : eventStart;
            
            if (isNaN(target.getTime())) {
                console.error("Invalid date provided");
                return;
            }
            
            const difference = target - now;

            if (difference > 0) {
                setHasEnded(false);
                setTimeLeft(prevTime => {
                    prevTimeLeft.current = prevTime;
                    return {
                        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                        minutes: Math.floor((difference / 1000 / 60) % 60),
                        seconds: Math.floor((difference / 1000) % 60)
                    };
                });
            } else {
                // If we're counting down to event start and it's passed, switch to submission countdown
                if (!eventStarted) {
                    setHasEventStarted(true);
                } else {
                    // If submission deadline has passed
                    setHasEnded(true);
                    setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                }
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();

        return () => clearInterval(timer);
    }, [targetDate, eventStartDate]);

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
                style={{ textShadow: '0 0 10px rgba(255, 255, 255, 0.4)' }}
            >
                {digit}
            </span>
        );
    };

    // Define text shadow styles
    const textShadowStyle = {
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.7), 0 1px 2px rgba(0, 0, 0, 0.5)'
    };

    // Get appropriate title based on event phase
    const getTitle = () => {
        if (hasEnded) {
            return "Submission Deadline Passed";
        } else if (hasEventStarted) {
            return "Time Remaining for Submissions";
        } else {
            return "Time Until HackHayward 2.0";
        }
    };

    // Get appropriate message based on event phase
    const getMessage = () => {
        if (hasEventStarted) {
            return "Submit your projects before the deadline!";
        } else {
            return "Get ready for an amazing hackathon experience!";
        }
    };

    return (
        <div className="h-full flex flex-col justify-center">
            <h3 className="text-xl sm:text-2xl font-bold font-exo2 mb-2" style={textShadowStyle}>
                {getTitle()}
            </h3>
            
            {hasEnded ? (
                <div className="py-1">
                    <p className="text-red-400 font-bold drop-shadow-md">Submissions are now closed</p>
                    <p className="text-sm mt-1 opacity-80 drop-shadow-sm">Judging will begin shortly</p>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <div role="timer" aria-live="polite" aria-label="Countdown timer" className="flex justify-center gap-3 my-1">
                        <div className="text-center px-1">
                            <span className="font-exo font-bold text-2xl inline-flex drop-shadow-md" aria-label={`Days: ${timeLeft.days}`}>
                                {[0, 1].map(pos => renderDigit(timeLeft.days, prevTimeLeft.current.days, pos, 'days'))}
                            </span>
                            <p className="font-grotesk text-xs drop-shadow-sm" aria-hidden="true">Days</p>
                        </div>
                        <div className="text-center px-1">
                            <span className="font-exo font-bold text-2xl inline-flex drop-shadow-md" aria-label={`Hours: ${timeLeft.hours}`}>
                                {[0, 1].map(pos => renderDigit(timeLeft.hours, prevTimeLeft.current.hours, pos, 'hours'))}
                            </span>
                            <p className="font-grotesk text-xs drop-shadow-sm" aria-hidden="true">Hours</p>
                        </div>
                        <div className="text-center px-1">
                            <span className="font-exo font-bold text-2xl inline-flex drop-shadow-md" aria-label={`Minutes: ${timeLeft.minutes}`}>
                                {[0, 1].map(pos => renderDigit(timeLeft.minutes, prevTimeLeft.current.minutes, pos, 'minutes'))}
                            </span>
                            <p className="font-grotesk text-xs drop-shadow-sm" aria-hidden="true">Mins</p>
                        </div>
                        <div className="text-center px-1">
                            <span className="font-exo font-bold text-2xl inline-flex drop-shadow-md" aria-label={`Seconds: ${timeLeft.seconds}`}>
                                {[0, 1].map(pos => renderDigit(timeLeft.seconds, prevTimeLeft.current.seconds, pos, 'seconds'))}
                            </span>
                            <p className="font-grotesk text-xs drop-shadow-sm" aria-hidden="true">Secs</p>
                        </div>
                    </div>
                    <p className="text-sm text-center font-medium mt-1 text-amber-300" style={{ textShadow: '0 0 8px rgba(217, 119, 6, 0.5)' }}>
                        {getMessage()}
                    </p>
                </div>
            )}
        </div>
    );
};

// PropTypes validation
DashCountdown.propTypes = {
    targetDate: PropTypes.string.isRequired,
    eventStartDate: PropTypes.string
};

export default DashCountdown; 