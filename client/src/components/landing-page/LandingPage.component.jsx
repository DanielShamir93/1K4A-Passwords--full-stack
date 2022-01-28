import Signup from "./components/signup/Signup.component";
import { TEXT_CONSTANTS } from "../../constants/landingPage.constants";
import "./landing-page.styles.scss";
import "./landing-page.styles.mobile.scss";

export default function LandingPage() {
  const { TEXT_TITLE, TEXT_CONTENT } = TEXT_CONSTANTS;

  return (
    <div className="Landing-page">
      <div className="landing-page-left">
        <Signup />
      </div>
      <div className="landing-page-right">
        <div className="text">
          <p className="text-title">{TEXT_TITLE}</p>
          <p className="text-content">{TEXT_CONTENT}</p>
        </div>
        <figure className="image-wrapper"></figure>
      </div>
    </div>
  );
}
