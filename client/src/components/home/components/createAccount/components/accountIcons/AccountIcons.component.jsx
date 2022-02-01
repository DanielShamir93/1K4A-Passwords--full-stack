import spritesObject from "../../../../../../utils/sprite/sprite";
import "./accountIcons.styles.scss";

export default function AccountIcons() {
  const renderGenericIcons = () => {
    const { genericIcons } = spritesObject;
    return (
      <div className="account-icons-box">
        <h4 className="account-icons-name">{genericIcons.name}</h4>
        <div className="account-gallery">
        {genericIcons.iconsPosition.map((iconPosition) => {
          return (
            <figure
              className="account-icon"
              key={iconPosition}
              style={{
                backgroundImage: `url(${genericIcons.src})`,
                backgroundPosition: iconPosition,
                width: genericIcons.width,
                height: genericIcons.height,
              }}
              onClick={() => {}}
            ></figure>
          );
        })}
      </div>
      </div>
      
      
    );
  };

  return (
    <div className="Account-icons">
      <h3>Account Icon</h3>
      {renderGenericIcons()}
    </div>
  );
}
