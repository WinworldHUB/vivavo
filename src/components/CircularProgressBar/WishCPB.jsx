import React from "react";
import "./cpb.css";

export default function WishCPB({ value = 60 }) {
  return (
    <div className="circle-wrap">
      <div className="circle">
        <div className="mask full">
          <div className="fill"></div>
        </div>
        <div className="mask half">
          <div className="fill"></div>
        </div>
        <div className="inside-circle"> {value}% </div>
      </div>
    </div>
  );
}
