import React from "react";
import "./infoDes.scss";
function InfoDescription({ description }) {
  return (
    <div className="info-description section">
      <div className="info-description_header">
        <h1>MÔ TẢ SẢN PHẨM</h1>
      </div>
      <div style={{marginTop:30}}>

      <div className="info-description_content">
        <span>{description}</span>
      </div>
      </div>
    </div>
  );
}

export default InfoDescription;
