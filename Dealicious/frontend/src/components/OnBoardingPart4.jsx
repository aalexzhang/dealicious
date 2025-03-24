import PropTypes from "prop-types";

const OnBoardingPart4 = ({ title0, title1 }) => {
  return (
    <div className="part4" role="region" aria-labelledby="onboarding-title">
      <div className="part5" id="onboarding-title">{title0}</div>
      <p className="part6">{title1}</p>
    </div>
  );
};

OnBoardingPart4.propTypes = {
  title0: PropTypes.string.isRequired,
  title1: PropTypes.string.isRequired,
};

export default OnBoardingPart4;