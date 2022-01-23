import { GrDocumentMissing } from "react-icons/gr";
import "./iconedButton.styles.scss";
import "./iconedButton.styles.mobile.scss";

export default function IconedButton({ term, reactIconComponent, onClick }) {
  //open more component for more control 
  return (
    <button className="iconed-button" onClick={onClick}>
      {reactIconComponent !== "" ? (
        reactIconComponent
      ) : (
        <GrDocumentMissing className="react-icon" />
      )}
      <span className="button-term"> {term}</span>
    </button>
  );
}
