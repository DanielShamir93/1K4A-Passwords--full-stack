import Signup from "./components/signup/Signup.component";
import "./landing-page.styles.scss";
import "./landing-page.styles.mobile.scss";
import { TEXT_CONSTANTS } from "../../constants/landingPage.constants";

export default function LandingPage() {
  const { TEXT_TITLE } = TEXT_CONSTANTS

  return (
    <div className="Landing-page">
      <div className="landing-page-left">
        <Signup />
      </div>
      <div className="landing-page-right">
        <div className="text">
          <p className="text-title">{TEXT_TITLE}</p>
          <p className="text-content">
            Creating and recovering passwords without keeping the passwords in
            any database.
          </p>
        </div>
        <figure className="image-wrapper"></figure>
      </div>
    </div>
  );
}
