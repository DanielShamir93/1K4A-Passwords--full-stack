import "./about.styles.scss";

export default function About() {
  return (
    <div className="About">
      <div className="about-app">
        <p>1K4A-Password</p>
        <p>Version: 1.0.0</p>
      </div>
      <div className="follow-me">
        <p className="follow-me-title">
          <span>&#128064;</span> Follow Me
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
