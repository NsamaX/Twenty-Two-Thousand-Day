import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const CountdownPage = () => {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const navigate = useNavigate();
  const countdownRef = useRef(null);
  const audioRef = useRef(new Audio("/sounds/old-film-countdown.mp3"));

  useEffect(() => {
    const agreed = Cookies.get("agreed");
    if (!agreed) {
      navigate("/");
    }
  }, [navigate]);

  const handleInputChange = useCallback((setter, maxLen, maxValue) => (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > maxLen) return;
    if (maxValue && Number(value) > maxValue) return;
    setter(value);
  }, []);

  useEffect(() => {
    if (year.length !== 4 || month === "" || day === "") {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
        countdownRef.current = null;
        console.log("⏹ Countdown stopped due to empty input.");
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        console.log("🔇 Sound stopped.");
      }
      return;
    }

    console.log("✅ Saving birthdate to Cookies:", { year, month, day });
    Cookies.set("birthYear", year, { expires: 365 });
    Cookies.set("birthMonth", month, { expires: 365 });
    Cookies.set("birthDay", day, { expires: 365 });

    let count = 4;
    countdownRef.current = setInterval(() => {
      if (count > 0) {
        audioRef.current.play().catch((err) => console.error("🔊 Audio error:", err)); // 🎵 เล่นเสียง
        count--;
      } else {
        clearInterval(countdownRef.current);
        countdownRef.current = null;
        console.log("✅ Redirecting to /deathclock");
        navigate("/deathclock");
      }
    }, 1000);

    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
        countdownRef.current = null;
        console.log("⏹ Countdown stopped (cleanup)");
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        console.log("🔇 Sound stopped (cleanup).");
      }
    };
  }, [year, month, day, navigate]);

  return (
    <div className="countdown-container">
      <div className="countdown">
        <div className="time-box">
          <input
            type="text"
            value={year}
            onChange={handleInputChange(setYear, 4)}
            maxLength="4"
            placeholder="?️"
            className="countdown-input"
          />
          <h3>Year</h3>
        </div>

        <p className="colons1">:</p>

        <div className="time-box">
          <input
            type="text"
            value={month}
            onChange={handleInputChange(setMonth, 2, 12)}
            maxLength="2"
            placeholder="?️"
            className="countdown-input"
          />
          <h3>Month</h3>
        </div>

        <p className="colons1">:</p>

        <div className="time-box">
          <input
            type="text"
            value={day}
            onChange={handleInputChange(setDay, 2, 31)}
            maxLength="2"
            placeholder="?️"
            className="countdown-input"
          />
          <h3>Day</h3>
        </div>
      </div>
    </div>
  );
};

export default CountdownPage;
