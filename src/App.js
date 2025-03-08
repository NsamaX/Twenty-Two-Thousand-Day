import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import WarningPage from "./pages/warning";
import BirthDatePage from "./pages/birth_date";
import CountdownPage from "./pages/count_down";
import DeathClockPage from "./pages/death_clock";

export const AudioContext = React.createContext(null);

const AnimatedRoutes = () => {
  const location = useLocation();
  const nodeRef = useRef(null);

  return (
    <SwitchTransition>
      <CSSTransition
        key={location.pathname}
        timeout={800}
        classNames="page"
        unmountOnExit
        nodeRef={nodeRef}
      >
        <div ref={nodeRef}>
          <Routes location={location}>
            <Route path="/" element={<WarningPage />} />
            <Route path="/birthdate" element={<BirthDatePage />} />
            <Route path="/countdown" element={<CountdownPage />} />
            <Route path="/deathclock" element={<DeathClockPage />} />
          </Routes>
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
};

const App = () => {
  const audioRef = useRef(new Audio("/sounds/intense-wildfire-burning.mp3"));

  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true;
    audio.volume = 0.5;
  }, []);

  return (
    <AudioContext.Provider value={audioRef}>
      <Router>
        <AnimatedRoutes />
      </Router>
    </AudioContext.Provider>
  );
};

export default App;
