import spritesObject from "../../../../../../utils/sprites/sprite";
import "./accountIcons.styles.scss";
import "./accountIcons.styles.mobile.scss";

export default function AccountIcons({ setAccountIconStyle }) {
  const { genericIcons, sitesIcons, creditCardsIcons } = spritesObject;

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
      <h4 className="account-icons-title">Account Icons</h4>
      {renderIconsSet(genericIcons)}
      {renderIconsSet(sitesIcons)}
      {renderIconsSet(creditCardsIcons)}
    </div>
  );
}
