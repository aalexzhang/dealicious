import React, { useState, useEffect } from "react";
import png0 from "../assets/png0.jpg";
import "../styles/OnBoardingPage.css";
import OnBoardingPart0 from "../components/OnBoardingPart0";
import OnBoardingPart1 from "../components/OnBoardingPart1";
import OnBoardingPart2 from "../components/OnBoardingPart2";
import OnBoardingPart3 from "../components/OnBoardingPart3";
import OnBoardingPart5 from "../components/OnBoardingPart5";

const OnBoardingPage = () => {
  const [currentPartIndex, setCurrentPartIndex] = useState(0);

  useEffect(() => {
    document.title = "Dealicious - Onboarding";
  }, []);

  const handlePartChange = (index) => {
    setCurrentPartIndex(index);
  };

  const parts = [
    <OnBoardingPart0 key={0} changePart={handlePartChange} />,
    <OnBoardingPart1 key={1} changePart={handlePartChange} />,
    <OnBoardingPart2 key={2} changePart={handlePartChange} />,
    <OnBoardingPart3 key={3} changePart={handlePartChange} />,
    <OnBoardingPart5 key={4} />,
  ];

  return (
    <div 
      className="page0" 
      style={{ backgroundImage: `url(${png0})` }} 
      role="img"
      aria-label="Dark gray background image"
    >
      <div className="part0">
        <div className="part1" role="tablist" aria-label="Onboarding Steps Progress Bar">
          {currentPartIndex !== 4 &&
            parts.slice(0, parts.length - 1).map((_, index) => (
              <div
                className={currentPartIndex === index ? "part2" : "part3"}
                key={index}
                role="tab"
                aria-selected={currentPartIndex === index}
                aria-controls={`part-${index}`}
                id={`tab-${index}`}
                tabIndex={currentPartIndex === index ? 0 : -1}
                onClick={() => handlePartChange(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handlePartChange(index);
                  }
                }}
                onTouchStart={() => handlePartChange(index)}
                aria-label={`Go to onboarding step ${index + 1}`}
              ></div>
            ))}
        </div>
        <div
          id={`part-${currentPartIndex}`}
          role="tabpanel"
          aria-labelledby={`tab-${currentPartIndex}`}
          aria-describedby={`desc-${currentPartIndex}`}
        >
          {parts[currentPartIndex]}
        </div>
        <p id={`desc-${currentPartIndex}`} className="sr-only">
          {`Onboarding step ${currentPartIndex + 1} of ${parts.length}`}
        </p>
      </div>
    </div>
  );
};

export default OnBoardingPage;
