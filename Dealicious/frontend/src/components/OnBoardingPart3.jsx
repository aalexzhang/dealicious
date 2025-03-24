import OnBoardingPart4 from "./OnBoardingPart4";
import PropTypes from "prop-types";
import "../styles/OnBoardingPart.css";

const OnBoardingPart3 = ({ changePart }) => {
  return (
    <>
      <div className="topic">
        <OnBoardingPart4
          title0={"Tell Us More About You"}
          title1={"Before we get started, we just need a few details from you."}
        />
      </div>
      <div className="info">
        <label htmlFor="nutrition-goals" className="part7">What are your primary nutrition goals?</label>
        <input
          id="nutrition-goals"
          type="text"
          aria-label="Enter your primary nutrition goals"
          className="input0"
        />
      </div>
      <div
        style={{
          display: "flex",
          flexFlow: "row nowrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "24px",
        }}
      >
        <button
          className="nextstep"
          onClick={() => changePart(2)}
          onTouchStart={() => changePart(2)}
          aria-label="Go back to previous step"
        >
          Back
        </button>
        <button
          className="nextstep"
          onClick={() => changePart(4)}
          onTouchStart={() => changePart(4)}
          aria-label="Go to next step"
        >
          Next
        </button>
      </div>
    </>
  );
};

OnBoardingPart3.propTypes = {
  changePart: PropTypes.func.isRequired,
};

export default OnBoardingPart3;