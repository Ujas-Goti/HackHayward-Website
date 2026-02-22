import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

// Create the context
const CountdownContext = createContext(null);

// Create a provider component
export const CountdownProvider = ({ children }) => {
  const [hasCountdownEnded, setHasCountdownEnded] = useState(false);

  // Value to be shared across components
  const value = {
    hasCountdownEnded,
    setHasCountdownEnded
  };

  return (
    <CountdownContext.Provider value={value}>
      {children}
    </CountdownContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCountdown = () => {
  const context = useContext(CountdownContext);
  if (context === null) {
    throw new Error('useCountdown must be used within a CountdownProvider');
  }
  return context;
};

CountdownProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default CountdownContext; 