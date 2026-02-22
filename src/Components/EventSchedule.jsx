// src/Components/EventSchedule.jsx
import { useState, useEffect } from 'react';
import { scheduleData } from '../assets/data/scheduleData';
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaMapMarkerAlt } from "react-icons/fa";
import PropTypes from 'prop-types';

EventSchedule.propTypes = {
  year: PropTypes.number,
};

export default function EventSchedule({ year = 2025 }) {
  const [selectedDay, setSelectedDay] = useState("March 1");
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  // Filter events for the selected day
  const dayEvents = scheduleData.filter(event => event.day === selectedDay);

  // Find current event based on time
  useEffect(() => {
    const findCurrentEvent = () => {
      // Get current date and time
      const now = new Date();
      
      // For testing purposes - comment this out in production
      // Uncomment and modify this to test different times during development
      // const testTime = new Date("March 1, 2025 12:30 PM");
      // now.setHours(testTime.getHours(), testTime.getMinutes());
      
      console.log(`Current time: ${now.toLocaleString()}`);
      
      // Check each event to see if current time falls within its duration
      let foundEvent = null;
      
      for (const event of dayEvents) {
        // Create start date for the event
        const eventStart = new Date(`${event.day}, 2025 ${event.time}`);
        
        // Create end date based on duration (or default 1 hour)
        const eventEnd = new Date(eventStart);
        eventEnd.setMinutes(eventStart.getMinutes() + (event.duration || 60));
        
        console.log(`Event: ${event.title}, Start: ${eventStart.toLocaleString()}, End: ${eventEnd.toLocaleString()}`);
        
        // Check if current time is within event duration
        if (now >= eventStart && now < eventEnd) {
          foundEvent = event;
          console.log(`Found current event: ${event.title}`);
          break;
        }
      }
      
      // If no current event found, find the next upcoming event
      if (!foundEvent) {
        const upcomingEvents = dayEvents.filter(event => {
          const eventStart = new Date(`${event.day}, 2025 ${event.time}`);
          return eventStart > now;
        });
        
        // Sort by closest start time
        upcomingEvents.sort((a, b) => {
          const startA = new Date(`${a.day}, 2025 ${a.time}`);
          const startB = new Date(`${b.day}, 2025 ${b.time}`);
          return startA - startB;
        });
        
        // If there are upcoming events today, highlight the next one
        if (upcomingEvents.length > 0) {
          foundEvent = upcomingEvents[0];
          console.log(`No current event, highlighting next event: ${foundEvent.title}`);
        } else if (selectedDay === "March 1") {
          // If we're on day 1 with no upcoming events, suggest day 2
          setSelectedDay("March 2");
          return; // This will trigger the effect again with day 2 selected
        }
      }
      
      setCurrentEvent(foundEvent);
    };
    
    findCurrentEvent();
    const intervalId = setInterval(findCurrentEvent, 60000); // Check every minute
    
    return () => clearInterval(intervalId);
  }, [selectedDay, dayEvents]);

  // For 2026, show "To Be Decided" message
  if (year === 2026) {
    return (
      <div className="font-grotesk">
        <h2 className="text-2xl sm:text-3xl font-bold font-exo2 mb-6" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.7), 0 1px 2px rgba(0, 0, 0, 0.5)' }}>Event Schedule</h2>
        <div className="bg-black/20 p-8 rounded-md text-center">
          <p className="text-xl text-white/80 drop-shadow-sm">Schedule details to be announced soon!</p>
          <p className="text-sm text-white/60 mt-2 drop-shadow-sm">Stay tuned for updates.</p>
        </div>
      </div>
    );
  }

  // For 2025, show "Event ended" message
  if (year === 2025) {
    return (
      <div className="font-grotesk">
        <h2 className="text-2xl sm:text-3xl font-bold font-exo2 mb-6" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.7), 0 1px 2px rgba(0, 0, 0, 0.5)' }}>Event Schedule</h2>
        <div className="bg-black/20 p-8 rounded-md text-center">
          <p className="text-xl text-white/80 drop-shadow-sm">Event ended</p>
        </div>
      </div>
    );
  }

  // Get display text for selected day
  const getDayDisplayText = (day) => {
    return day === "March 1" ? "Day 1" : "Day 2";
  };

  // Helper function to get map URL for locations
  const getLocationMapUrl = (location) => {
    // Map of locations to their map URLs
    const locationMaps = {
      "Core 1st floor Entrance area": "https://bit.ly/CoreBuildingMap",
      "Core 178/179 Entrepreneurship Hub": "https://bit.ly/CoreBuildingMap",
      "Core Multiple work rooms 1st and 3rd floor": "https://bit.ly/CoreBuildingMap",
      "Core 176": "https://bit.ly/CoreBuildingMap",
      "Dinning Commons": "https://bit.ly/DinningCommons",
      "Valley Business Technical (VBT) Building": "https://bit.ly/VBTmap",
      "VBT Building Room 124": "https://bit.ly/VBTmap",
      "VBT Building 1st floor": "https://bit.ly/VBTmap"
    };

    // Try to find a specific match
    if (locationMaps[location]) {
      return locationMaps[location];
    }

    // If not found but contains "Core", return the Core building map
    if (location.includes("Core")) {
      return "https://bit.ly/CoreBuildingMap";
    }

    // If not found but contains "VBT", return the VBT building map
    if (location.includes("VBT")) {
      return "https://bit.ly/VBTmap";
    }

    // Default URL for unknown locations (could be campus map)
    return "https://bit.ly/CampusMap";
  };

  // Extract URL from description if it exists
  const extractUrlFromDescription = (description) => {
    if (!description) return null;
    
    const urlMatch = description.match(/https?:\/\/[^\s)]+/);
    return urlMatch ? urlMatch[0] : null;
  };

  // Define text shadow styles
  const textShadowStyle = {
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.7), 0 1px 2px rgba(0, 0, 0, 0.5)'
  };

  return (
    <div className="font-grotesk">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-3 lg:gap-0">
        <h2 className="text-2xl sm:text-3xl font-bold font-exo2" style={textShadowStyle}>Event Schedule</h2>
        
        {/* Tab buttons for desktop only - hidden on tablet and mobile */}
        <div className="hidden lg:flex font-grotesk overflow-hidden rounded-full">
          <a
            onClick={() => setSelectedDay("March 1")}
            className={`w-[110px] text-center p-2.5 transition text-sm cursor-pointer slash-r2
              ${selectedDay === "March 1" 
                ? "bg-white text-black hover:bg-[#e9e9e9] font-bold" 
                : "bg-[#c593e9] text-white hover:bg-[#cfb0e8] font-medium"}`}
          >
            Day 1
          </a>
          <a
            onClick={() => setSelectedDay("March 2")}
            className={`w-[110px] text-center p-2.5 transition text-sm cursor-pointer slash-l2 -ml-4
              ${selectedDay === "March 2" 
                ? "bg-white text-black hover:bg-[#e9e9e9] font-bold" 
                : "bg-[#c593e9] text-white hover:bg-[#cfb0e8] font-medium"}`}
          >
            Day 2
          </a>
        </div>
        
        {/* Dropdown menu for mobile and tablet (including iPads) */}
        <div className="lg:hidden flex justify-center">
          <div 
            className="dropdown dropdown-hover font-grotesk"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <div 
              tabIndex={0} 
              role="button" 
              className="bg-[#c593e9] hover:bg-[#cfb0e8] text-white text-sm font-medium flex items-center justify-center rounded-full w-32 h-10 relative">
              {getDayDisplayText(selectedDay)}
              <RiArrowDropDownLine 
                className={`size-6 right-[8%] absolute transition-transform duration-200 ${
                  isHovered ? "rotate-180" : ""
                }`} 
              />
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-[#261e24] shadow-drop-sm shadow rounded-box z-[1] w-32 p-2">
              <li><a onClick={() => setSelectedDay("March 1")}>Day 1</a></li>
              <li><a onClick={() => setSelectedDay("March 2")}>Day 2</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {dayEvents.map((event) => (
          <div 
            key={event.id}
            className={`p-4 rounded-md transition-all shadow-md hover:shadow-lg ${
              currentEvent?.id === event.id 
                ? "bg-[#c593e9]/40 border-l-4 border-[#c593e9]" 
                : "bg-black/20 hover:bg-black/30"
            }`}
          >
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold drop-shadow-sm">{event.time}</p>
              <div className="flex items-center">
                <p className="text-sm bg-black/30 px-2 py-1 rounded drop-shadow-sm flex items-center">
                  {event.location}
                  {event.location !== "Submit Online" && event.location !== "Submission Closed" && (
                    <a 
                      href={getLocationMapUrl(event.location)} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="ml-1.5 text-[#c593e9] hover:text-white transition-colors"
                      title={`View map for ${event.location}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaMapMarkerAlt className="inline-block" />
                    </a>
                  )}
                </p>
              </div>
            </div>
            <h3 className="text-xl font-bold mt-1" style={textShadowStyle}>{event.title}</h3>
            {event.description && (
              <p className="mt-2 text-white/80 drop-shadow-sm">
                {event.description.replace(/\(https?:\/\/[^\s)]+\)/, '')}
                {extractUrlFromDescription(event.description) && (
                  <a 
                    href={extractUrlFromDescription(event.description)}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="ml-1 text-[#c593e9] hover:text-white underline transition-colors"
                  >
                    View Details
                  </a>
                )}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}