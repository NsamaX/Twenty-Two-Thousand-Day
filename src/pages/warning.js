import React, { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AudioContext } from "../App";

const WarningPage = () => {
  const navigate = useNavigate();
  const audioRef = useContext(AudioContext);

  const handleAgree = useCallback(() => {
    Cookies.set("agreed", "true", { expires: 365 });

    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    }

    navigate("/birthdate");
  }, [navigate, audioRef]);

  const warningText = [
    "Those who are weak at heart should turn back now. This is not merely a website, but a revelation of truth.",
    "By entering, you acknowledge the fleeting nature of existence. If you proceed, your remaining days will be inscribed upon the calendar, etched in time, unchangeable and absolute.",
    "There is no turning back. Do you accept your fate?",
  ];

  return (
    <>
      <h1>Warning</h1>
      {warningText.map((text, index) => (
        <p key={index}>{text}</p>
      ))}
      <button onClick={handleAgree} aria-label="Agree to terms">[ Agree ]</button>
    </>
  );
};

export default WarningPage;
