import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const BirthDatePage = () => {
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    navigate("/countdown");
  }, [navigate]);

  return (
    <>
      <h1 onClick={handleNavigate} className="clickable-heading" aria-label="Go to countdown page">
        When did your countdown begin?
      </h1>
    </>
  );
};

export default BirthDatePage;
