import { Link } from "react-router-dom";
import OnBoardingPart4 from "./OnBoardingPart4";

const OnBoardingPart5 = () => {
  return (
    <>
      <div className="topic">
        <OnBoardingPart4
          title0={"You’re all set!"}
          title1={"We've tailored your weekly meal plan based on the information you provided."}
        />
      </div>
      <div className="button-container">
        <Link 
          to="/meal-planner" 
          className="nextstep" 
          aria-label="Check out your first meal plan"
          onTouchStart={() => {}}
        >
          Check out your first meal plan
        </Link>
      </div>
    </>
  );
};

export default OnBoardingPart5;