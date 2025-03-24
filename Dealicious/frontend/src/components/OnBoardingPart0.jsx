import PropTypes from "prop-types";
import "../styles/OnBoardingPart.css"
import OnBoardingPart4 from "./OnBoardingPart4";

const OnBoardingPart0 = ({ changePart }) => {
  return (
    <>
      <div className="topic">
        <OnBoardingPart4
          title0={"Tell Us More About You"}
          title1={"Before we get started, we just need a few details from you."}
        />
      </div>
      <div className="info">
        <label htmlFor="zip-code" className="part7">What is your zip code?</label>
        <input
          id="zip-code"
          type="text"
          aria-label="Enter your zip code"
          className="input0"
        />
      </div>
      <div className="button-container">
        <button
          className="nextstep"
          onClick={() => changePart(1)}
          onTouchStart={() => changePart(1)}
          aria-label="Next step"
        >
          Next
        </button>
      </div>
    </>
  );
};

OnBoardingPart0.propTypes = {
  changePart: PropTypes.func.isRequired,
};

export default OnBoardingPart0;