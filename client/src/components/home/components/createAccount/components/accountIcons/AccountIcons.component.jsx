import "./accountIcons.styles.scss";

export default function AccountIcons() {

  const iconsStyles = [];

    console.log(iconsStyles)

  const renderIcons = () => {
    
    return (
      iconsStyles.map((iconStyle) => {
        return <div style={iconStyle}></div>
      })
    )
  }

  return (
    <div className="Account-icons">
        <div className="account-icons-box">
          {renderIcons()}
        </div>
    </div>
  );
}
