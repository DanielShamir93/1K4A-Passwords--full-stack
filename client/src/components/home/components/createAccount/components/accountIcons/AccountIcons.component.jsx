import spritesObject from "../../../../../../utils/sprite/sprite";
import "./accountIcons.styles.scss";

export default function AccountIcons() {
  const { genericIcons, paymentIcons } = spritesObject;

  const renderIconsSet = (icons) => {
    return (
      <details className="account-icons-box">
        <summary className="account-icons-name">{icons.name}</summary>
        <div className="account-gallery">
          {icons.iconsPosition.map((iconPosition) => {
            return (
              <figure
                className="account-icon"
                key={iconPosition}
                style={{
                  backgroundImage: `url(${icons.src})`,
                  backgroundPosition: iconPosition,
                  width: icons.width,
                  height: icons.height,
                }}
                onClick={() => {}}
              ></figure>
            );
          })}
        </div>
      </details>
    );
  };

  return (
    <div className="Account-icons">
      <h4 className="account-icons-title">Account Icon</h4>
      {renderIconsSet(genericIcons)}
      {renderIconsSet(paymentIcons)}
    </div>
  );
}
