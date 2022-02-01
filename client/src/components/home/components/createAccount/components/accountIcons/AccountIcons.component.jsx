import spritesObject from "../../../../../../utils/sprite/sprite";
import "./accountIcons.styles.scss";

export default function AccountIcons({ setAccountIconStyle }) {
  const { genericIcons, paymentIcons } = spritesObject;

  const renderIconsSet = (iconsSet) => {
    return (
      <details className="account-icons-box">
        <summary className="account-icons-name">{iconsSet.name}</summary>
        <div className="account-gallery">
          {iconsSet.iconsPosition.map((iconPosition) => {
            const iconStyle = {
              backgroundImage: `url(${iconsSet.src})`,
              backgroundPosition: iconPosition,
              width: iconsSet.width,
              height: iconsSet.height,
            }
            return (
              <figure
                className="account-icon"
                key={iconPosition}
                style={iconStyle}
                onClick={() => {setAccountIconStyle(iconStyle)}}
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
