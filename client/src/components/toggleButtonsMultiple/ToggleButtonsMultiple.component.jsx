import { useRef } from "react";
import "./toggle-buttons-multiple.styles.scss";
import "./toggle-buttons-multiple.styles.mobile.scss";

export default function ToggleButtonsMultiple({ isChecked, toggleCheckboxes }) {
  const digitsCheckboxRef = useRef();
  const uppercaseCheckboxRef = useRef();
  const lowercaseCheckboxRef = useRef();
  const symbolsCheckboxRef = useRef();

  const clickCheckbox = (checkbox, e) => {
    checkbox.current.click();
    if (e.target.classList.contains("checked")) {
      e.target.classList.remove("checked");
      e.target.classList.add("unchecked");
    } else {
      e.target.classList.remove("unchecked");
      e.target.classList.add("checked");
    }
  };

  return (
    <div className="Toggle-buttons-multiple">
      <div className="digits">
        <input
          ref={digitsCheckboxRef}
          type="checkbox"
          className="digits-checkbox"
          checked={isChecked.isDigitsChecked}
          onChange={(e) => {
            toggleCheckboxes(e.target, "isDigitsChecked");
          }}
        />
        <button
          type="button"
          className={`digits-button ${isChecked.isDigitsChecked ? "checked" : "unchecked"}`}
          onClick={(e) => {
            clickCheckbox(digitsCheckboxRef, e);
          }}
        >
          Digits
        </button>
      </div>
      <div className="uppercase">
        <input
          ref={uppercaseCheckboxRef}
          type="checkbox"
          className="uppercase-checkbox"
          checked={isChecked.isUppercaseChecked}
          onChange={(e) => {
            toggleCheckboxes(e.target, "isUppercaseChecked");
          }}
        />
        <button
          type="button"
          className={`uppercase-button ${isChecked.isUppercaseChecked ? "checked" : "unchecked"}`}
          onClick={(e) => {
            clickCheckbox(uppercaseCheckboxRef, e);
          }}
        >
          Uppercase
        </button>
      </div>
      <div className="lowercase">
        <input
          ref={lowercaseCheckboxRef}
          type="checkbox"
          className="lowercase-checkbox"
          checked={isChecked.isLowercaseChecked}
          onChange={(e) => {
            toggleCheckboxes(e.target, "isLowercaseChecked");
          }}
        />
        <button
          type="button"
          className={`lowercase-button ${isChecked.isLowercaseChecked ? "checked" : "unchecked"}`}
          onClick={(e) => {
            clickCheckbox(lowercaseCheckboxRef, e);
          }}
        >
          Lowercase
        </button>
      </div>
      <div className="digits">
        <input
          ref={symbolsCheckboxRef}
          type="checkbox"
          className="symbols-checkbox"
          checked={isChecked.isSymbolsChecked}
          onChange={(e) => {
            toggleCheckboxes(e.target, "isSymbolsChecked");
          }}
        />
        <button
          type="button"
          className={`symbols-button ${isChecked.isSymbolsChecked ? "checked" : "unchecked"}`}
          onClick={(e) => {
            clickCheckbox(symbolsCheckboxRef, e);
          }}
        >
          Symbols
        </button>
      </div>
    </div>
  );
}
