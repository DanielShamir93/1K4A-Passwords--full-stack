import { TEXT_CONSTANTS } from "../../constants/about.constants";
import "./about.styles.scss";

export default function About() {
  const { TEXT_TITLE, TEXT_VERSION, TEXT_FOLLOW_ME } = TEXT_CONSTANTS;
  return (
    <div className="About">
      <div className="about-app">
        <p>{TEXT_TITLE}</p>
        <p>{TEXT_VERSION}</p>
      </div>
      <div className="follow-me">
        <p className="follow-me-title">
          <span>&#128064;</span> {TEXT_FOLLOW_ME}
        </p>
        <div className="follow-me-icons">
          <a
            href="https://www.linkedin.com/in/daniel-shamir-3a22ba168/"
            target="_black"
          >
            <figure className="linkedin-icon"></figure>
          </a>
          <a href="https://github.com/DanielShamir93" target="_black">
            <figure className="github-icon"></figure>
          </a>
        </div>
      </div>
    </div>
  );
}
