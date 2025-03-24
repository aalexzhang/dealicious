import OnBoardingPart4 from "./OnBoardingPart4";
import PropTypes from "prop-types";
import "../styles/OnBoardingPart.css";

const OnBoardingPart2 = ({ changePart }) => {
  return (
    <>
      <div className="topic">
        <OnBoardingPart4
          title0={"Tell Us More About You"}
          title1={"Before we get started, we just need a few details from you."}
        />
      </div>
      <div className="info">
        <label htmlFor="dietary-restrictions" className="part7">Do you have any dietary restrictions or preferences?</label>
        <input
          id="dietary-restrictions"
          type="text"
          aria-label="Enter your dietary restrictions or preferences"
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
          onClick={() => changePart(1)}
          onTouchStart={() => changePart(1)}
          aria-label="Go back to previous step"
        >
          Back
        </button>
        <button
          className="nextstep"
          onClick={() => changePart(3)}
          onTouchStart={() => changePart(3)}
          aria-label="Go to next step"
        >
          Next
        </button>
      </div>
    </>
  );
};

OnBoardingPart2.propTypes = {
  changePart: PropTypes.func.isRequired,
};

export default OnBoardingPart2;