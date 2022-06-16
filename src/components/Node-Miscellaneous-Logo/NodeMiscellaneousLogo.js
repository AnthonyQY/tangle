import "./NodeMiscellaneousLogo.css"
import LogoImage from "./Logo.png"

function NodeMiscellaneousLogo() {
  return (
    <div className="node--miscellaneous--logo">
      <img className="node--miscellaneous--logo--image" src={LogoImage}></img>
      <div className="node--miscellaneous--logo--category">
        <label className="node--miscellaneous--logo--category--label">MISCELLANEOUS</label>
      </div>
    </div>
  );
}

export default NodeMiscellaneousLogo;
