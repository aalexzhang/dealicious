import OnBoardingPart4 from "./OnBoardingPart4";
import PropTypes from "prop-types";
import "../styles/OnBoardingPart.css";

const OnBoardingPart1 = ({ changePart }) => {
  return (
    <>
      <div className="topic">
        <OnBoardingPart4
          title0={"Tell Us More About You"}
          title1={"Before we get started, we just need a few details from you."}
        />
      </div>
      <div className="info">
        <label htmlFor="weekly-budget" className="part7">What is your weekly food budget?</label>
        <input
          id="weekly-budget"
          type="text"
          aria-label="Enter your weekly food budget"
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
          onClick={() => changePart(0)}
          onTouchStart={() => changePart(0)}
          aria-label="Go back to previous step"
        >
          Back
        </button>
        <button
          className="nextstep"
          onClick={() => changePart(2)}
          onTouchStart={() => changePart(2)}
          aria-label="Go to next step"
        >
          Next
        </button>
      </div>
    </>
  );
};

OnBoardingPart1.propTypes = {
  changePart: PropTypes.func.isRequired,
};

export default OnBoardingPart1;