import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const DeathClockPage = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);

  const year = Number(Cookies.get("birthYear"));
  const month = Number(Cookies.get("birthMonth"));
  const day = Number(Cookies.get("birthDay"));

  const birthDate = useMemo(() => dayjs(`${year}-${month}-${day}`), [year, month, day]);
  const deathDate = useMemo(() => birthDate.add(22000, "day"), [birthDate]);

  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!year || !month || !day) {
      navigate("/");
      return;
    }

    const updateCountdown = () => {
      const now = dayjs();
      const diff = deathDate.diff(now);

      if (diff <= 0) {
        setTimeLeft({
          years: 0,
          months: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      const remaining = dayjs.duration(diff).$d;

      setTimeLeft({
        years: remaining.years,
        months: remaining.months,
        days: remaining.days,
        hours: remaining.hours,
        minutes: remaining.minutes,
        seconds: remaining.seconds,
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [deathDate, navigate]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
      const interval = setInterval(() => {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }, 17000);

      return () => clearInterval(interval);
    }
  }, []);

  const handleLeave = useCallback(() => {
    Cookies.remove("birthYear");
    Cookies.remove("birthMonth");
    Cookies.remove("birthDay");
    Cookies.remove("agreed");
    navigate("/");
  }, [navigate]);

  return (
    <div className="countdown-container">
      <audio ref={audioRef} src="/sounds/clock-pendulum-ticks.mp3" preload="auto" />

      <button className="leave-button" onClick={handleLeave}>Leave</button>

      <div className="countdown">
        {Object.entries(timeLeft)
          .filter(([unit]) => unit !== "milliseconds")
          .map(([unit, value], index, array) => (
            <React.Fragment key={unit}>
              <div className="time-box">
                <h2>{value}</h2>
                <h3>{unit.charAt(0).toUpperCase() + unit.slice(1)}</h3>
              </div>
              {index < array.length - 1 && <p className="colons2">:</p>}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default DeathClockPage;
